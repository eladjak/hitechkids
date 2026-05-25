"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const SUGGESTED = [
  "מה הילד שלי לומד?",
  "מה גילאי הקייטנה?",
  "כמה זמן ביום?",
  "מה מביאים?",
  "האם זה מתאים לבנות?",
  "האם יש פרויקט סיום?",
]

type Message = { role: "user" | "assistant"; content: string }

export default function FAQChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => { if (messages.length > 0) endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }) }, [messages, loading])

  const send = async (text?: string) => {
    const q = (text ?? input).trim()
    if (!q || loading) return
    const next: Message[] = [...messages, { role: "user", content: q }]
    setMessages(next)
    setInput("")
    setLoading(true)
    try {
      const r = await fetch("/api/chat-faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      })
      const data = await r.json()
      setMessages((m) => [...m, { role: "assistant", content: data?.content || "סליחה, נסה שוב." }])
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "בעיה בחיבור. נסה שוב." }])
    } finally { setLoading(false) }
  }

  return (
    <section id="faq-chat" className="py-20 px-6 bg-gradient-to-b from-purple-700 via-pink-600 to-orange-500" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="text-yellow-300 font-black text-sm tracking-widest uppercase mb-3 block">
            🤖 שאלות ותשובות
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-3 text-balance drop-shadow-lg">
            יש לך שאלה? תשאל את ה-AI שלנו!
          </h2>
        </motion.div>

        <div className="rounded-3xl shadow-2xl overflow-hidden bg-white border-4 border-yellow-300">
          {/* Chat header with friendly bot avatar */}
          <div className="flex items-center gap-3 px-5 py-3 bg-purple-700 text-white">
            <span className="relative grid place-items-center size-10 rounded-full bg-white/15 overflow-hidden shrink-0">
              <Image src="/images/illustrations/mascot-robot.jpg" alt="" width={40} height={40} className="size-10 object-cover" aria-hidden />
            </span>
            <div className="leading-tight">
              <div className="font-black text-sm">העוזר של הייטקידס</div>
              <div className="flex items-center gap-1.5 text-xs text-green-300">
                <span className="size-2 rounded-full bg-green-400 animate-pulse" /> מחובר עכשיו
              </div>
            </div>
          </div>
          <div className="px-5 py-4 overflow-y-auto space-y-3" style={{ minHeight: "300px", maxHeight: "400px" }}>
            {messages.length === 0 && !loading && (
              <div className="text-center py-4 text-gray-500">
                <Image
                  src="/images/illustrations/empty-state-chat.jpg"
                  alt="רובוט ידידותי מזמין אתכם לשאול שאלה"
                  width={140}
                  height={140}
                  className="mx-auto mb-3 size-32 object-contain rounded-2xl"
                />
                <p className="text-sm font-medium">היי! יש לכם שאלה על הקייטנה? 🚀</p>
                <p className="text-xs text-gray-400 mt-1">בחרו שאלה למטה או כתבו את שלכם</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    m.role === "user" ? "bg-purple-600 text-white" : "bg-yellow-100 text-gray-900"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-yellow-100 px-4 py-2.5 rounded-2xl">
                  <div className="flex gap-1">
                    <span className="size-2 bg-purple-600 rounded-full animate-bounce" />
                    <span className="size-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <span className="size-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {messages.length === 0 && (
            <div className="px-5 py-3 border-t-2 border-purple-100 flex flex-wrap gap-2">
              {SUGGESTED.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  disabled={loading}
                  className="text-xs sm:text-sm px-3 py-1.5 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors disabled:opacity-50 font-bold"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); send() }} className="px-5 py-3 border-t-2 border-purple-100 flex gap-2 items-center bg-yellow-50">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="כתוב שאלה..."
              disabled={loading}
              className="flex-1 bg-transparent outline-none text-sm text-gray-900 placeholder:text-gray-400"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="שלח"
              className="size-9 rounded-full bg-purple-600 text-white grid place-items-center disabled:opacity-40 hover:bg-purple-700 transition-colors font-bold"
            >
              ➤
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
