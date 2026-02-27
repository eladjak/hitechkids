"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const workshops = [
  {
    id: 1,
    title: "בינה מלאכותית",
    subtitle: "AI למתחילים",
    emoji: "🤖",
    color: "#00d4ff",
    bgGradient: "from-[#00d4ff]/20 to-[#0080ff]/10",
    borderColor: "border-[#00d4ff]/40",
    image: "/images/hitechkids-coding.jpg",
    description: "גילו את עולם ה-AI! נלמד איך מחשבים חושבים, ניצור תמונות עם AI, נדבר עם בוטים חכמים ונבין איך עובדת הטכנולוגיה שמשנה את העולם.",
    skills: ["ChatGPT ו-Claude", "יצירת תמונות עם AI", "זיהוי תמונות", "בוטים חכמים"],
    ages: "גילאים 9-15",
    duration: "שבוע",
  },
  {
    id: 2,
    title: "כתיבה יצירתית",
    subtitle: "עם ChatGPT",
    emoji: "📝",
    color: "#ff1493",
    bgGradient: "from-[#ff1493]/20 to-[#ff69b4]/10",
    borderColor: "border-[#ff1493]/40",
    image: "/images/gallery/kids-create-ai.png",
    description: "כתבו סיפורים מדהימים! נשתמש ב-ChatGPT כחבר יצירתי שעוזר לנו לפתח עלילות, לבנות דמויות ולכתוב בכל סוגי הז'אנרים.",
    skills: ["פיתוח עלילה עם AI", "דמויות ועולמות", "שירה ופרוזה", "פרסום ספר דיגיטלי"],
    ages: "גילאים 8-14",
    duration: "שבוע",
  },
  {
    id: 3,
    title: "תכנות",
    subtitle: "Python ו-Scratch",
    emoji: "💻",
    color: "#39ff14",
    bgGradient: "from-[#39ff14]/20 to-[#00aa00]/10",
    borderColor: "border-[#39ff14]/40",
    image: "/images/hitechkids-3dprint.jpg",
    description: "הפכו רעיונות לקוד! נלמד תכנות Python, נבנה משחקים ב-Scratch, ניצור אנימציות ונפתח את הפרויקט החלומי שלנו.",
    skills: ["Python בסיסי", "Scratch ואנימציות", "פיתוח משחקים", "פרויקט אישי"],
    ages: "גילאים 8-15",
    duration: "שבוע",
  },
  {
    id: 4,
    title: "רובוטיקה",
    subtitle: "בניה ותכנות",
    emoji: "🦾",
    color: "#ffe600",
    bgGradient: "from-[#ffe600]/20 to-[#ff8800]/10",
    borderColor: "border-[#ffe600]/40",
    image: "/images/hitechkids-robotics.jpg",
    description: "בנו רובוטים אמיתיים! נשתמש בערכות LEGO Mindstorms ו-Arduino כדי לבנות, לתכנת ולהפעיל רובוטים שעושים דברים מדהימים.",
    skills: ["LEGO Mindstorms", "Arduino בסיסי", "חיישנים ומנועים", "תחרות רובוטים"],
    ages: "גילאים 10-15",
    duration: "שבוע",
  },
];

export default function Workshops() {
  return (
    <section id="workshops" className="py-20 bg-[#0d0620]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 1, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-[#39ff14]/20 text-[#39ff14] font-bold px-4 py-2 rounded-full text-sm mb-4">
            💡 מה לומדים?
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            הסדנאות שלנו 🔥
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            4 סדנאות מגניבות, מדריכים מנוסים, קבוצות קטנות - כל ילד מוצא את הדבר שהוא הכי אוהב!
          </p>
        </motion.div>

        {/* Workshops grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {workshops.map((workshop, index) => (
            <motion.div
              key={workshop.id}
              initial={{ opacity: 1, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className={`bg-gradient-to-br ${workshop.bgGradient} border ${workshop.borderColor} rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300`}
              style={{ boxShadow: `0 4px 30px ${workshop.color}20` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={workshop.image}
                  alt={workshop.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0620] to-transparent" />
                {/* Emoji badge */}
                <div
                  className="absolute top-4 right-4 w-14 h-14 rounded-full flex items-center justify-center text-3xl border-2"
                  style={{
                    backgroundColor: `${workshop.color}30`,
                    borderColor: workshop.color,
                  }}
                >
                  {workshop.emoji}
                </div>
                {/* Ages badge */}
                <div className="absolute bottom-4 left-4 bg-[#0d0620]/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white/80 font-medium">
                  {workshop.ages}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-3">
                  <h3 className="text-2xl font-black text-white">{workshop.title}</h3>
                  <p className="font-bold" style={{ color: workshop.color }}>{workshop.subtitle}</p>
                </div>
                
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  {workshop.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {workshop.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{
                        backgroundColor: `${workshop.color}20`,
                        color: workshop.color,
                        border: `1px solid ${workshop.color}40`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <a
                  href="#register"
                  className="inline-flex items-center gap-2 text-sm font-bold transition-colors duration-200"
                  style={{ color: workshop.color }}
                >
                  הירשם לסדנה ←
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
