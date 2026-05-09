"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#070212] border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="mb-3">
              <Image
                src="/images/logo-zohar.png"
                alt="הייטקידס - קייטנת טכנולוגיה"
                width={150}
                height={55}
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              קייטנת הטכנולוגיה המובילה לילדים. לומדים AI, קוד, רובוטיקה וכתיבה יצירתית בסביבה כיפית ובטוחה.
            </p>
            <div className="flex gap-3 mt-4">
              {[
                { icon: "📘", label: "Facebook", href: "#" },
                { icon: "📸", label: "Instagram", href: "#" },
                { icon: "🎵", label: "TikTok", href: "#" },
                { icon: "📺", label: "YouTube", href: "#" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#00d4ff]/20 flex items-center justify-center text-lg transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-4">ניווט מהיר</h4>
            <ul className="space-y-2">
              {[
                { label: "סדנאות", href: "#workshops" },
                { label: "גלריה", href: "#gallery" },
                { label: "להורים", href: "#parents" },
                { label: "שאלות ותשובות", href: "#faq" },
                { label: "הרשמה", href: "#register" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-[#00d4ff] text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">יצירת קשר</h4>
            <div className="space-y-3 text-sm text-white/50">
              <p>📞 052-542-7474</p>
              <p>✉️ eladhiteclearning@gmail.com</p>
              <p>📍 מגדל העמק, ישראל</p>
              <p>🕐 ראשון-חמישי 8:30-16:00</p>
            </div>
            <div className="mt-4">
              <a
                href="https://wa.me/972525427474?text=שלום%20אלעד%2C%20פניתי%20דרך%20אתר%20HiTechKids"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#25d366]/20 border border-[#25d366]/40 text-[#25d366] rounded-full text-sm font-bold hover:bg-[#25d366]/30 transition-colors"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © {currentYear} הייטקידס. כל הזכויות שמורות.
          </p>
          <div className="flex gap-6 text-sm text-white/30">
            <span className="cursor-default">תנאי שימוש</span>
            <span className="cursor-default">מדיניות פרטיות</span>
            <a href="#faq" className="hover:text-white/60 transition-colors">נגישות</a>
          </div>
        </div>

        {/* Made with love */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8 text-white/20 text-xs"
        >
          עוצב ופותח עם ❤️ לילדים הסקרנים של ישראל
        </motion.div>
      </div>
    </footer>
  );
}
