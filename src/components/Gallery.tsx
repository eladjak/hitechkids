"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

// Wave-12 (2026-05-10): Replaced generic AI imagery with Israeli-kids photorealistic
// generations (both Gemini and OpenAI gpt-image-1 saved side-by-side per dual-image rule).
const galleryItems = [
  { src: "/images/gallery/kids-coding-israeli.jpg", alt: "ילדים ישראלים לומדים תכנות בכיתה", caption: "לומדים קוד יחד 💻" },
  { src: "/images/gallery/kids-robotics-israeli.jpg", alt: "ילדים ישראלים בונים רובוט", caption: "בונים רובוטים בכיתה 🦾" },
  { src: "/images/gallery/kids-3dprint-israeli.jpg", alt: "ילדים ישראלים סביב מדפסת תלת-מימד", caption: "מדפיסים תלת-מימד! 🖨️" },
  { src: "/images/gallery/kids-coding-israeli-openai.jpg", alt: "ילדים ישראלים בכיתת תכנות", caption: "כיתת תכנות מודרנית 🚀" },
  { src: "/images/gallery/kids-robotics-israeli-openai.jpg", alt: "ילדים ישראלים בקבוצת רובוטיקה", caption: "מנדבים יצירתיות 🎨" },
  { src: "/images/hitechkids-robotics.jpg", alt: "סדנת רובוטיקה בקייטנה", caption: "בונים רובוטים אמיתיים! 🦾" },
];

const testimonials = [
  {
    name: "אמא של שחר (12)",
    text: "שחר חזר הביתה כל יום מלא התלהבות! לא הפסיק לדבר על מה שלמד. הקייטנה הכי טובה שהיינו בה!",
    stars: 5,
    emoji: "⭐",
  },
  {
    name: "אבא של נועה (10)",
    text: "נועה הגיעה בלי שום ידע בקוד, ויצאה עם פרויקט Python שלמה! המדריכים פשוט מדהימים.",
    stars: 5,
    emoji: "🚀",
  },
  {
    name: "אמא של דניאל (14)",
    text: "כבר שנה שלישית שדניאל בא לקייטנה. הוא כבר מתכנת ב-Python ובנה רובוט! ממליצה בחום.",
    stars: 5,
    emoji: "💙",
  },
];

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selected !== null) {
        setSelected(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selected]);

  return (
    <section id="gallery" className="py-20 bg-[#0a0118]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-[#ff1493]/20 text-[#ff1493] font-bold px-4 py-2 rounded-full text-sm mb-4">
            📸 מה קורה בקייטנה?
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            רגעים מהשנה שעברה ✨
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            200+ ילדים כבר גילו את הכיף בלמידת טכנולוגיה!
          </p>
        </motion.div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelected(index)}
              className="relative rounded-xl overflow-hidden cursor-pointer group aspect-square"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white font-bold text-sm">{item.caption}</p>
              </div>
              {/* Corner accent */}
              <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-[#00d4ff]/30 border border-[#00d4ff]/60 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                🔍
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            role="dialog"
            aria-modal="true"
            aria-label="תמונה מוגדלת"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={galleryItems[selected].src}
                alt={galleryItems[selected].alt}
                width={800}
                height={600}
                className="w-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 p-6">
                <p className="text-white font-bold text-lg">{galleryItems[selected].caption}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-2xl font-black text-white text-center mb-8">
            מה ההורים אומרים? 💬
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-gradient-to-br from-[#1a0a3c] to-[#0d0620] border border-[#00d4ff]/20 rounded-2xl p-6"
              >
                <div className="text-2xl mb-3">{t.emoji}</div>
                <p className="text-white/80 text-sm leading-relaxed mb-4 font-medium">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[#00d4ff] text-sm font-bold">{t.name}</span>
                  <span className="text-[#ffe600] text-sm">{"⭐".repeat(t.stars)}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
