"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    q: "מה הגיל המתאים לקייטנה?",
    a: "הקייטנה מתאימה לגילאים 8-15. יש לנו קבוצות נפרדות לגילאים 8-11 ו-12-15, כדי שכל ילד יהיה עם חברים בגילו.",
    emoji: "👦",
  },
  {
    q: "האם צריך ניסיון קודם בקוד?",
    a: "ממש לא! הסדנאות שלנו מיועדות לכל הרמות, מתחילים מוחלטים ועד ילדים עם ניסיון. המדריכים מתאימים את הקצב לכל קבוצה.",
    emoji: "🎯",
  },
  {
    q: "כמה ילדים יש בכל קבוצה?",
    a: "מקסימום 10 ילדים בקבוצה! אנחנו מאמינים ביחס אישי ולכן מגבילים את הגודל.",
    emoji: "👥",
  },
  {
    q: "מה שעות הפעילות?",
    a: "הקייטנה פועלת ביום א-ה, 8:30-16:00. ניתן להגיע ב-8:00 ולאסוף עד 17:00 בתיאום מראש.",
    emoji: "🕐",
  },
  {
    q: "מה כוללת ארוחת הצהריים?",
    a: "ארוחה בריאה ומזינה הכלולה במחיר. אנחנו מתחשבים בכשרות, אלרגיות וצרכים תזונתיים מיוחדים.",
    emoji: "🥗",
  },
  {
    q: "האם המדריכים מוסמכים?",
    a: "בהחלט! כל המדריכים שלנו הם מומחי טכנולוגיה עם הכשרה פדגוגית בחינוך ילדים.",
    emoji: "👨‍🏫",
  },
  {
    q: "מה הילד לוקח הביתה?",
    a: "בסוף כל שבוע, כל ילד יוצא עם פרויקט שלמד ליצור - משחק שתכנת, ספר דיגיטלי, רובוט שבנה או תמונות AI.",
    emoji: "🏆",
  },
  {
    q: "מה מדיניות ההחזרים?",
    a: "ביטול עד 14 יום לפני - החזר מלא. ביטול 7-14 יום מראש - החזר 75%. פחות מ-7 ימים - אין החזר, אך ניתן להעביר לאחר.",
    emoji: "💰",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-[#0d0620]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 1, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-[#39ff14]/20 text-[#39ff14] font-bold px-4 py-2 rounded-full text-sm mb-4">
            שאלות ותשובות
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            כל התשובות שחיפשתם 💡
          </h2>
          <p className="text-xl text-white/60">
            יש שאלה שלא מצאתם? כתבו לנו!
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#1a0a3c]/40 border border-white/10 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center gap-4 px-6 py-5 text-right hover:bg-white/5 transition-colors"
              >
                <span className="text-2xl">{faq.emoji}</span>
                <span className="flex-1 text-white font-bold text-lg text-right">
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[#00d4ff] text-xl shrink-0"
                >
                  ▾
                </motion.span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 1 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5">
                      <div className="h-px bg-white/10 mb-4" />
                      <p className="text-white/70 leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 1, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-gradient-to-r from-[#00d4ff]/10 via-[#ff1493]/10 to-[#ffe600]/10 border border-white/10 rounded-2xl p-10"
        >
          <div className="text-5xl mb-4">💬</div>
          <h3 className="text-2xl font-black text-white mb-3">נשאר לכם שאלה?</h3>
          <p className="text-white/60 mb-6">אנחנו זמינים בוואטסאפ ובאימייל</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://wa.me/9720501234567"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#25d366] text-white font-bold rounded-full hover:opacity-90 transition-opacity"
            >
              💬 WhatsApp
            </a>
            <a
              href="mailto:info@hitechkids.co.il"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#00d4ff] text-[#00d4ff] font-bold rounded-full hover:bg-[#00d4ff]/10 transition-colors"
            >
              ✉️ אימייל
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
