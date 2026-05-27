import { NextResponse } from "next/server"

// Child-facing FAQ chat endpoint.
// Council verdict (2026-05-25): server-side ONLY — never expose the Gemini key to the
// browser. This route is the control point for rate limiting, input caps, a kid-safe
// system prompt, and PII-aware (metadata-only) handling. Treat every user as possibly a child.

export const runtime = "nodejs"

const SYSTEM_PROMPT = `אתה העוזר החכם והידידותי של אתר "הייטקידס" — קייטנת טכנולוגיה ו-AI לילדים בני 8-15.

מה אנחנו מציעים: סדנת בינה מלאכותית (יצירת תמונות, ChatGPT ו-Claude, בוטים חכמים), סדנת כתיבה יצירתית עם ChatGPT, סדנת תכנות (Python ו-Scratch), וסדנת רובוטיקה (LEGO Mindstorms, Arduino). קבוצות קטנות עד 10 ילדים, מדריכים מקצועיים, ארוחת צהריים בריאה כלולה. במגדל העמק, קיץ 2026.
שעות: ימים א-ה 8:30-16:00. גילאים 8-15 (קבוצות לפי גיל). מחירים: שבוע ₪890, שבועיים ₪1,690, חודש מלא ₪2,990.

חוקים חשובים:
- ענה בעברית, בחום, בקצרה (2-4 משפטים), בשפה שמתאימה גם לילד.
- אתה עונה רק על שאלות שקשורות לקייטנה (סדנאות, גילאים, שעות, מחירים, בטיחות, הרשמה). אם נשאלת על משהו אחר — הסבר בעדינות שאתה כאן רק בשביל הקייטנה.
- לעולם אל תבקש פרטים אישיים (שם מלא, טלפון, כתובת) בצ'אט. אם מישהו כותב פרטים — אל תחזור עליהם. למחירים מדויקים והרשמה — הפנה למילוי הטופס באתר או לוואטסאפ.
- אל תמציא מידע. אם אינך בטוח — אמור שכדאי לפנות אלינו בוואטסאפ 052-542-7474.`

// In-memory per-IP rate limit (per serverless instance — best-effort, not a hard guarantee).
const RATE_LIMIT = 12 // requests
const RATE_WINDOW_MS = 60_000 // per minute
const MAX_INPUT_CHARS = 500
const MAX_MESSAGES = 12
const hits = new Map<string, number[]>()

function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for")
  if (xff) return xff.split(",")[0].trim()
  return req.headers.get("x-real-ip") || "unknown"
}

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const arr = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS)
  if (arr.length >= RATE_LIMIT) {
    hits.set(ip, arr)
    return true
  }
  arr.push(now)
  hits.set(ip, arr)
  return false
}

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) return NextResponse.json({ content: "הצ'אט עדיין בהרצה — שלחו לנו הודעה בוואטסאפ 052-542-7474 ונשמח לעזור!" })

  if (rateLimited(clientIp(req))) {
    return NextResponse.json({ content: "רגע, יותר מדי שאלות בבת אחת 😅 נסו שוב בעוד דקה, או כתבו לנו בוואטסאפ." }, { status: 429 })
  }

  try {
    const body = await req.json()
    const messages = body?.messages
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "messages array required" }, { status: 400 })
    }

    // Cap turns + per-message length; coerce roles defensively.
    const recent = messages
      .slice(-MAX_MESSAGES)
      .filter((m) => m && typeof m.content === "string")
      .map((m: { role: string; content: string }) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content.slice(0, MAX_INPUT_CHARS),
      }))
    if (recent.length === 0) return NextResponse.json({ error: "no valid messages" }, { status: 400 })

    const conversationText = recent
      .map((m) => `${m.role === "user" ? "משתמש" : "אסיסטנט"}: ${m.content}`)
      .join("\n")
    const fullPrompt = `${SYSTEM_PROMPT}\n\nשיחה עד כה:\n${conversationText}\n\nאסיסטנט:`

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 12_000)
    let r: Response
    try {
      r = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }],
          // thinkingBudget:0 disables Gemini 2.5 Flash "thinking" — otherwise thinking tokens
          // consume the whole maxOutputTokens budget (finishReason=MAX_TOKENS) and the visible
          // answer is truncated mid-sentence (the "chat doesn't work" bug, 2026-05-27).
          generationConfig: { temperature: 0.6, maxOutputTokens: 600, thinkingConfig: { thinkingBudget: 0 } },
          safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_LOW_AND_ABOVE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          ],
        }),
        signal: controller.signal,
      })
    } finally {
      clearTimeout(timeout)
    }

    if (!r.ok) return NextResponse.json({ content: "סליחה, יש בעיה זמנית. נסו שוב או כתבו לנו בוואטסאפ 052-542-7474." })
    const data = await r.json()
    const content = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "סליחה, לא הבנתי. אפשר לנסות לנסח אחרת?"
    return NextResponse.json({ content })
  } catch {
    return NextResponse.json({ content: "סליחה, נסו שוב בעוד רגע." }, { status: 500 })
  }
}
