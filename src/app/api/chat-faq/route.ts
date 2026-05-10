import { NextResponse } from "next/server"

const SYSTEM_PROMPT = `אתה צ'אטבוט באתר הייטקידס - קייטנת טכנולוגיה ו-AI לילדים בני 8-14.

מה אנחנו מציעים: סדנאות AI (כתיבה יצירתית עם ChatGPT, יצירה ויזואלית), קוד (Python בסיסי, Scratch), רובוטיקה, הדפסת תלת-מימד, פרויקטי גיבוש קבוצתיים. צוות חינוכי בעל ניסיון.

תשובות בעברית, חמות וקצרות (2-4 משפטים). למחירים והרשמה — שלח להורים מילוי טופס.`

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) return NextResponse.json({ content: "הצ'אט עדיין בהרצה — שלח/י פרטים בטופס." })
  try {
    const body = await req.json()
    const messages = body?.messages || []
    if (!Array.isArray(messages) || messages.length === 0) return NextResponse.json({ error: "messages array required" }, { status: 400 })
    const recent = messages.slice(-10)
    const conversationText = recent.map((m: { role: string; content: string }) => `${m.role === "user" ? "משתמש" : "אסיסטנט"}: ${m.content}`).join("\n")
    const fullPrompt = `${SYSTEM_PROMPT}\n\nשיחה עד כה:\n${conversationText}\n\nאסיסטנט:`
    const r = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({ contents: [{ parts: [{ text: fullPrompt }] }], generationConfig: { temperature: 0.6, maxOutputTokens: 350 } }),
    })
    if (!r.ok) return NextResponse.json({ content: "סליחה, יש בעיה זמנית. נסה שוב או שלח דרך טופס." })
    const data = await r.json()
    const content = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "סליחה, לא הבנתי. נסה לנסח אחרת."
    return NextResponse.json({ content })
  } catch {
    return NextResponse.json({ error: "Internal error", content: "סליחה, נסה שוב בעוד רגע." }, { status: 500 })
  }
}
