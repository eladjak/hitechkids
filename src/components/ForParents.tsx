"use client";

import { motion } from "framer-motion";

const pricingPlans = [
  {
    name: "שבוע אחד",
    price: "890",
    originalPrice: "1,090",
    color: "#00d4ff",
    features: [
      "5 ימי לימוד מלאים",
      "בחירת סדנה אחת",
      "קבוצה עד 10 ילדים",
      "ארוחת צהריים כלולה",
      "פרויקט לקחת הביתה",
    ],
    cta: "הירשם לשבוע",
    popular: false,
  },
  {
    name: "חודש מלא",
    price: "2,990",
    originalPrice: "3,560",
    color: "#ff1493",
    features: [
      "4 שבועות קייטנה",
      "4 סדנאות שונות",
      "קבוצה עד 10 ילדים",
      "ארוחת צהריים כלולה",
      "4 פרויקטים לקחת הביתה",
      "מסיבת סיום + תעודה",
      "⭐ הנחה של 570 ש\"ח!",
    ],
    cta: "הצעה הכי כדאית!",
    popular: true,
  },
  {
    name: "שבועיים",
    price: "1,690",
    originalPrice: "1,980",
    color: "#39ff14",
    features: [
      "10 ימי לימוד",
      "2 סדנאות לבחירה",
      "קבוצה עד 10 ילדים",
      "ארוחת צהריים כלולה",
      "2 פרויקטים לקחת הביתה",
    ],
    cta: "הירשם לשבועיים",
    popular: false,
  },
];

const safetyFeatures = [
  { icon: "🔒", title: "פיקוח מלא", desc: "צוות מדריכים מוסמך עם ניסיון בחינוך ילדים, יחס אישי של 1:5" },
  { icon: "🚑", title: "בטיחות רפואית", desc: "מזכ\"לית רפואית באתר כל יום, ערכת עזרה ראשונה, כיסוי ביטוחי מלא" },
  { icon: "📱", title: "עדכונים שוטפים", desc: "תמונות ועדכונים יומיים לוואטסאפ, אפשרות ביקור הורים בכל עת" },
  { icon: "🏠", title: "מתקנים מאובטחים", desc: "מבנה מאובטח עם כניסה מבוקרת, מצלמות אבטחה ואזור משחקים מגודר" },
];

const schedule = [
  { time: "08:30", activity: "קבלת ילדים" },
  { time: "09:00", activity: "התחלת סדנה" },
  { time: "10:30", activity: "הפסקה + חטיף" },
  { time: "11:00", activity: "המשך סדנה" },
  { time: "13:00", activity: "ארוחת צהריים" },
  { time: "13:45", activity: "פעילות חברתית וספורט" },
  { time: "15:00", activity: "פרויקט יצירתי" },
  { time: "16:00", activity: "סיום + איסוף" },
];

export default function ForParents() {
  return (
    <section id="parents" className="py-20 bg-[#0d0620]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-[#ffe600]/20 text-[#ffe600] font-bold px-4 py-2 rounded-full text-sm mb-4">
            👨‍👩‍👧 פינת ההורים
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            כל מה שרציתם לדעת 💛
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            הבטיחות של הילדים שלכם היא הדבר הכי חשוב לנו
          </p>
        </motion.div>

        {/* Safety section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {safetyFeatures.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#1a0a3c]/60 border border-[#ffe600]/20 rounded-2xl p-6 text-center"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-black text-white text-center mb-8">
            🕐 סדר יום טיפוסי
          </h3>
          <div className="max-w-2xl mx-auto bg-[#1a0a3c]/40 border border-[#00d4ff]/20 rounded-2xl overflow-hidden">
            {schedule.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center gap-6 px-6 py-4 ${
                  i !== schedule.length - 1 ? "border-b border-white/10" : ""
                } hover:bg-white/5 transition-colors`}
              >
                <span className="text-[#00d4ff] font-mono font-bold text-lg w-16 shrink-0">
                  {item.time}
                </span>
                <span className="text-white/80 font-medium">{item.activity}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-black text-white text-center mb-4">
            💰 מחירים ומסלולים
          </h3>
          <p className="text-center text-white/60 mb-10">הרשמה מוקדמת - 10% הנחה! בתוקף עד 1.6.2026</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                className={`relative rounded-2xl p-8 border transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-b from-[#ff1493]/20 to-[#0d0620] border-[#ff1493]/60 shadow-lg shadow-[#ff1493]/20"
                    : "bg-[#1a0a3c]/40 border-white/20"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 right-1/2 translate-x-1/2 bg-gradient-to-r from-[#ff1493] to-[#ffe600] text-white text-sm font-black px-6 py-1.5 rounded-full">
                    🏆 הכי פופולרי!
                  </div>
                )}
                
                <h4 className="text-xl font-black text-white mb-2 text-center">{plan.name}</h4>
                
                <div className="text-center mb-6">
                  <div className="text-white/40 text-sm line-through mb-1">₪{plan.originalPrice}</div>
                  <div className="text-5xl font-black" style={{ color: plan.color }}>
                    ₪{plan.price}
                  </div>
                  <div className="text-white/40 text-sm mt-1">לחודש קיץ</div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-3 text-sm text-white/80">
                      <span style={{ color: plan.color }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#register"
                  className="block text-center py-3 px-6 rounded-full font-bold transition-all duration-200 hover:opacity-90"
                  style={{
                    background: plan.popular
                      ? `linear-gradient(135deg, ${plan.color}, #ffe600)`
                      : `${plan.color}20`,
                    color: plan.popular ? "white" : plan.color,
                    border: `2px solid ${plan.color}`,
                  }}
                >
                  {plan.cta}
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
