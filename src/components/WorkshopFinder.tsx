"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";

/**
 * Interactive workshop finder (web-paradigm-shift: parents DO, not just read).
 * Parent picks the child's age + main interest, gets a matched workshop,
 * and a CTA that pre-fills the registration form via a window event the
 * Registration component listens to (decoupled, no shared context needed).
 */

type Interest = "create" | "build" | "code" | "write";

type Workshop = {
  key: string;
  /** registration <select> value this maps to */
  registrationValue: string;
  title: string;
  emoji: string;
  color: string;
  minAge: number;
  maxAge: number;
  interests: Interest[];
  blurb: string;
};

const WORKSHOPS: Workshop[] = [
  {
    key: "ai",
    registrationValue: "בינה מלאכותית (AI)",
    title: "בינה מלאכותית (AI)",
    emoji: "🤖",
    color: "#00d4ff",
    minAge: 9,
    maxAge: 15,
    interests: ["create", "code"],
    blurb: "מושלם לילד/ה שסקרנ/ית לדעת איך AI עובד — יוצרים תמונות, מדברים עם בוטים חכמים ובונים פרויקט AI ראשון.",
  },
  {
    key: "writing",
    registrationValue: "כתיבה יצירתית עם ChatGPT",
    title: "כתיבה יצירתית עם ChatGPT",
    emoji: "📝",
    color: "#ff1493",
    minAge: 8,
    maxAge: 14,
    interests: ["write", "create"],
    blurb: "לילד/ה שאוהב/ת סיפורים ודמיון — כותבים סיפור משלהם בעזרת ChatGPT ומפרסמים ספר דיגיטלי בסוף השבוע.",
  },
  {
    key: "code",
    registrationValue: "תכנות Python ו-Scratch",
    title: "תכנות (Python ו-Scratch)",
    emoji: "💻",
    color: "#39ff14",
    minAge: 8,
    maxAge: 15,
    interests: ["code", "build"],
    blurb: "לילד/ה שרוצה לבנות משחקים ולכתוב קוד אמיתי — מתחילים ב-Scratch וממשיכים ל-Python עם פרויקט אישי.",
  },
  {
    key: "robotics",
    registrationValue: "רובוטיקה",
    title: "רובוטיקה",
    emoji: "🦾",
    color: "#ffe600",
    minAge: 10,
    maxAge: 15,
    interests: ["build", "code"],
    blurb: "לילד/ה עם ידיים שאוהבות לבנות — מרכיבים ומתכנתים רובוטים אמיתיים עם LEGO Mindstorms ו-Arduino.",
  },
];

const INTERESTS: { key: Interest; label: string; emoji: string }[] = [
  { key: "create", label: "יצירה ו-AI", emoji: "🎨" },
  { key: "build", label: "בנייה והרכבה", emoji: "🔧" },
  { key: "code", label: "תכנות ומשחקים", emoji: "🎮" },
  { key: "write", label: "סיפורים וכתיבה", emoji: "📖" },
];

function scoreWorkshop(w: Workshop, age: number, interest: Interest | null): number {
  let score = 0;
  // age fit
  if (age >= w.minAge && age <= w.maxAge) score += 3;
  else {
    const distance = age < w.minAge ? w.minAge - age : age - w.maxAge;
    score += Math.max(0, 2 - distance); // soft penalty
  }
  // interest fit
  if (interest && w.interests.includes(interest)) {
    score += interest === w.interests[0] ? 3 : 2;
  }
  return score;
}

export default function WorkshopFinder() {
  const [age, setAge] = useState(10);
  const [interest, setInterest] = useState<Interest | null>(null);
  const [revealed, setRevealed] = useState(false);

  const result = useMemo(() => {
    const ranked = [...WORKSHOPS]
      .map((w) => ({ w, score: scoreWorkshop(w, age, interest) }))
      .sort((a, b) => b.score - a.score);
    return ranked[0].w;
  }, [age, interest]);

  const handlePrefill = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("hitechkids:prefill-registration", {
          detail: { workshop: result.registrationValue, childAge: String(age) },
        })
      );
    }
    const el = document.getElementById("register");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="finder" className="py-20 bg-gradient-to-b from-[#0d0620] to-[#12082b]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-[#00d4ff]/20 text-[#00d4ff] font-bold px-4 py-2 rounded-full text-sm mb-4">
            🧭 לא בטוחים איזו סדנה?
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            בואו נמצא את הסדנה המושלמת
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            שני צעדים קטנים — גיל הילד/ה ומה הכי מעניין אותו/ה — ואנחנו נמליץ לכם.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="bg-gradient-to-br from-[#1a0a3c] to-[#0d0620] border border-[#00d4ff]/20 rounded-3xl p-6 md:p-10 shadow-2xl"
          style={{ boxShadow: "0 0 60px #00d4ff12" }}
        >
          {/* Step 1: age */}
          <div className="mb-8">
            <label htmlFor="finder-age" className="block text-[#00d4ff] font-bold mb-3">
              1. בן/בת כמה הילד/ה?{" "}
              <span className="text-white font-black text-2xl mr-2">{age}</span>
            </label>
            <input
              id="finder-age"
              type="range"
              min={8}
              max={15}
              step={1}
              value={age}
              onChange={(e) => {
                setAge(Number(e.target.value));
                setRevealed(false);
              }}
              aria-valuetext={`גיל ${age}`}
              className="w-full accent-[#00d4ff] cursor-pointer"
            />
            <div className="flex justify-between text-white/40 text-xs mt-1 px-1" aria-hidden>
              <span>8</span><span>9</span><span>10</span><span>11</span>
              <span>12</span><span>13</span><span>14</span><span>15</span>
            </div>
          </div>

          {/* Step 2: interest */}
          <div className="mb-8">
            <p className="text-[#00d4ff] font-bold mb-3">2. מה הכי מעניין אותו/ה?</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" role="group" aria-label="תחום עניין">
              {INTERESTS.map((it) => {
                const active = interest === it.key;
                return (
                  <button
                    key={it.key}
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setInterest(active ? null : it.key);
                      setRevealed(false);
                    }}
                    className={`rounded-2xl px-4 py-4 text-center font-bold transition-all duration-200 border-2 ${
                      active
                        ? "bg-[#00d4ff]/20 border-[#00d4ff] text-white"
                        : "bg-white/5 border-white/10 text-white/70 hover:border-[#00d4ff]/40 hover:text-white"
                    }`}
                  >
                    <span className="block text-3xl mb-1">{it.emoji}</span>
                    <span className="text-sm">{it.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reveal button */}
          {!revealed && (
            <motion.button
              type="button"
              onClick={() => setRevealed(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-l from-[#00d4ff] to-[#0080ff] text-[#0a0418] font-black text-xl py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-lg"
              style={{ boxShadow: "0 4px 30px #00d4ff40" }}
            >
              ✨ הראו לי את הסדנה המתאימה
            </motion.button>
          )}

          {/* Result */}
          <AnimatePresence>
            {revealed && (
              <motion.div
                key={result.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-2xl p-6 border-2 text-center"
                style={{
                  borderColor: result.color,
                  backgroundColor: `${result.color}12`,
                }}
                role="status"
                aria-live="polite"
              >
                <div className="text-5xl mb-2">{result.emoji}</div>
                <p className="text-white/60 text-sm mb-1">הסדנה המומלצת עבורכם</p>
                <h3 className="text-2xl md:text-3xl font-black mb-3" style={{ color: result.color }}>
                  {result.title}
                </h3>
                <p className="text-white/80 leading-relaxed max-w-xl mx-auto mb-6 text-pretty">
                  {result.blurb}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    type="button"
                    onClick={handlePrefill}
                    className="px-8 py-3 rounded-full font-black text-white transition-opacity hover:opacity-90"
                    style={{ background: `linear-gradient(135deg, ${result.color}, #ff1493)` }}
                  >
                    🚀 להרשמה לסדנה הזו
                  </button>
                  <a
                    href="#workshops"
                    className="px-8 py-3 rounded-full font-bold border-2 transition-colors hover:bg-white/5"
                    style={{ borderColor: result.color, color: result.color }}
                  >
                    לראות את כל הסדנאות
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
