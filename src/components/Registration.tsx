"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type FormState = {
  childName: string;
  childAge: string;
  parentName: string;
  phone: string;
  email: string;
  workshop: string;
  notes: string;
};

const workshopOptions = [
  "בינה מלאכותית (AI)",
  "כתיבה יצירתית עם ChatGPT",
  "תכנות Python ו-Scratch",
  "רובוטיקה",
  "אני רוצה לשמוע על כל הסדנאות",
];

export default function Registration() {
  const [form, setForm] = useState<FormState>({
    childName: "",
    childAge: "",
    parentName: "",
    phone: "",
    email: "",
    workshop: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "שגיאה בשליחת הטופס");
        setLoading(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setError("שגיאה בחיבור לשרת. נסו שוב מאוחר יותר.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      id="register"
      className="py-20 bg-gradient-to-b from-[#0d0620] to-[#1a0a3c]"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-[#ffe600]/20 text-[#ffe600] font-bold px-4 py-2 rounded-full text-sm mb-4">
            📋 הרשמה לקייטנה
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            הצטרפו להייטקידס! 🚀
          </h2>
          <p className="text-xl text-white/60 max-w-xl mx-auto">
            מלאו את הטופס ונחזור אליכם תוך 24 שעות עם כל הפרטים
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#1a0a3c] to-[#0d0620] border border-[#00d4ff]/20 rounded-3xl p-8 shadow-2xl"
          style={{ boxShadow: "0 0 60px #00d4ff15" }}
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="text-7xl mb-6">🎉</div>
              <h3 className="text-3xl font-black text-white mb-4">
                נרשמתם בהצלחה!
              </h3>
              <p className="text-white/60 text-lg mb-6">
                נחזור אליכם תוך 24 שעות עם כל הפרטים
              </p>
              <div className="text-[#00d4ff] text-2xl">🤖 💻 🦾 🚀</div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#00d4ff] font-bold text-sm mb-2">
                    שם הילד/ה *
                  </label>
                  <input
                    type="text"
                    name="childName"
                    required
                    value={form.childName}
                    onChange={handleChange}
                    placeholder="שם מלא"
                    className="w-full bg-white/5 border border-[#00d4ff]/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#00d4ff]/60 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[#00d4ff] font-bold text-sm mb-2">
                    גיל *
                  </label>
                  <input
                    type="number"
                    name="childAge"
                    required
                    min="8"
                    max="15"
                    value={form.childAge}
                    onChange={handleChange}
                    placeholder="8-15"
                    className="w-full bg-white/5 border border-[#00d4ff]/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#00d4ff]/60 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#00d4ff] font-bold text-sm mb-2">
                    שם ההורה *
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    required
                    value={form.parentName}
                    onChange={handleChange}
                    placeholder="שם מלא"
                    className="w-full bg-white/5 border border-[#00d4ff]/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#00d4ff]/60 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[#00d4ff] font-bold text-sm mb-2">
                    טלפון *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="050-0000000"
                    className="w-full bg-white/5 border border-[#00d4ff]/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#00d4ff]/60 transition-colors"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#00d4ff] font-bold text-sm mb-2">
                  אימייל
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full bg-white/5 border border-[#00d4ff]/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#00d4ff]/60 transition-colors"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-[#00d4ff] font-bold text-sm mb-2">
                  איזה סדנה מעניינת אתכם? *
                </label>
                <select
                  name="workshop"
                  required
                  value={form.workshop}
                  onChange={handleChange}
                  className="w-full bg-[#0d0620] border border-[#00d4ff]/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d4ff]/60 transition-colors"
                >
                  <option value="" className="text-white/40">
                    בחרו סדנה...
                  </option>
                  {workshopOptions.map((opt) => (
                    <option key={opt} value={opt} className="text-white">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#00d4ff] font-bold text-sm mb-2">
                  הערות / שאלות
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="יש לכם שאלות? כתבו כאן..."
                  className="w-full bg-white/5 border border-[#00d4ff]/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#00d4ff]/60 transition-colors resize-none"
                />
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/40 rounded-xl px-4 py-3 text-red-300 text-sm text-center">
                  {error}
                </div>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-l from-[#00d4ff] to-[#0080ff] text-white font-black text-xl py-4 rounded-2xl hover:opacity-90 transition-opacity disabled:opacity-60 shadow-lg"
                style={{ boxShadow: "0 4px 30px #00d4ff40" }}
              >
                {loading ? "שולח..." : "הירשמו עכשיו! 🚀"}
              </motion.button>

              <p className="text-center text-white/40 text-sm">
                📞 מעדיפים לדבר? התקשרו: 052-542-7474
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
