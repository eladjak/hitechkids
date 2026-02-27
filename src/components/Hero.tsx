"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const floatingEmojis = ["🤖", "💻", "🚀", "⚡", "🎮", "🧠", "✨", "🌟", "💡", "🎯"];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0d0620]">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a3c] via-[#0d0620] to-[#001a2e]" />
      
      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "linear-gradient(rgba(0,212,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.5) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Floating emojis */}
      {floatingEmojis.map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl md:text-4xl select-none pointer-events-none"
          style={{
            right: `${10 + (i * 9) % 85}%`,
            top: `${10 + (i * 13) % 80}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          {emoji}
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="text-right">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 1, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-[#00d4ff]/20 border border-[#00d4ff]/40 rounded-full px-4 py-2 mb-6"
            >
              <span className="text-[#00d4ff] font-bold text-sm">קיץ 2025 ✨</span>
              <span className="text-white/60 text-sm">|</span>
              <span className="text-[#39ff14] text-sm font-medium">מקומות מוגבלים!</span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 1, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6"
            >
              <span className="text-white">הקייטנה</span>
              <br />
              <span className="gradient-text-blue">הכי כיפית</span>
              <br />
              <span className="text-[#ffe600]">של הקיץ!</span>
              <span className="text-4xl mr-3">🎉</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 1, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed font-medium"
            >
              לומדים <span className="text-[#00d4ff] font-bold">AI</span>, 
              <span className="text-[#39ff14] font-bold"> קוד</span>, 
              <span className="text-[#ff1493] font-bold"> רובוטיקה</span> 
              {" "}ו<span className="text-[#ffe600] font-bold">כתיבה יצירתית</span> 
              {" "}עם ChatGPT!
              <br />
              <span className="text-white/60 text-lg">לגילאים 8-15 | קבוצות קטנות | מדריכים מקצועיים</span>
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 1, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-6 mb-8"
            >
              {[
                { num: "200+", label: "בוגרים מרוצים", emoji: "😊" },
                { num: "4", label: "סדנאות מגניבות", emoji: "🔥" },
                { num: "10", label: "ילדים בקבוצה", emoji: "👥" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-black text-[#00d4ff]">{stat.num}</div>
                  <div className="text-white/60 text-sm">{stat.emoji} {stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 1, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#register"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#ff1493] to-[#ffe600] text-white font-black text-lg rounded-full hover:opacity-90 transition-all duration-200 hover:scale-105 shadow-lg shadow-[#ff1493]/30"
              >
                🚀 הירשם עכשיו!
              </a>
              <a
                href="#workshops"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#00d4ff] text-[#00d4ff] font-bold text-lg rounded-full hover:bg-[#00d4ff]/10 transition-all duration-200"
              >
                📚 הסדנאות שלנו
              </a>
            </motion.div>
          </div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 1, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-[#00d4ff]/30 pulse-glow">
              <Image
                src="/images/hitechkids-hero-wide.jpg"
                alt="מרכז טכנולוגיה לילדים - קייטנת הייטקידס"
                width={700}
                height={450}
                className="w-full object-cover"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0620]/60 to-transparent" />
              
              {/* Floating badge on image */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-6 right-6 bg-[#0d0620]/90 border border-[#00d4ff]/40 rounded-xl px-4 py-3 backdrop-blur-sm"
              >
                <div className="text-[#00d4ff] font-bold text-sm">⭐ 4.9/5 מהורים</div>
                <div className="text-white/60 text-xs">200+ חוות דעת</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scrolling banner */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 overflow-hidden rounded-xl bg-gradient-to-r from-[#00d4ff]/20 via-[#ff1493]/20 to-[#ffe600]/20 border border-white/10 py-4"
        >
          <div className="marquee-inner whitespace-nowrap">
            {["🤖 בינה מלאכותית", "💻 תכנות Python", "🎮 פיתוח משחקים", "📖 כתיבה יצירתית", "🦾 רובוטיקה", "🧠 ChatGPT", "⚡ קוד", "🌟 יצירה", "🚀 חדשנות", "💡 המצאות"].concat(
              ["🤖 בינה מלאכותית", "💻 תכנות Python", "🎮 פיתוח משחקים", "📖 כתיבה יצירתית", "🦾 רובוטיקה", "🧠 ChatGPT", "⚡ קוד", "🌟 יצירה", "🚀 חדשנות", "💡 המצאות"]
            ).map((item, i) => (
              <span key={i} className="inline-block mx-6 text-white/70 font-medium text-sm">
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
