"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#workshops", label: "סדנאות" },
    { href: "#finder", label: "מצא סדנה" },
    { href: "#gallery", label: "גלריה" },
    { href: "#parents", label: "להורים" },
    { href: "#faq-chat", label: "שאלות" },
    { href: "#register", label: "הרשמה" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0d0620]/95 backdrop-blur-md shadow-lg shadow-[#00d4ff]/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <Image
              src="/images/logo-zohar.png"
              alt="הייטקידס - קייטנת טכנולוגיה"
              width={140}
              height={50}
              className="h-10 w-auto object-contain"
              priority
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.slice(0, -1).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-white/80 hover:text-[#00d4ff] font-medium transition-colors duration-200 rounded-lg hover:bg-white/10"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/blog"
              className="px-4 py-2 text-white/80 hover:text-[#00d4ff] font-medium transition-colors duration-200 rounded-lg hover:bg-white/10"
            >
              בלוג
            </Link>
            <a
              href="#register"
              className="mr-4 px-6 py-2 bg-gradient-to-r from-[#ff1493] to-[#ffe600] text-[#0a0418] font-bold rounded-full hover:opacity-90 transition-opacity duration-200 pulse-glow"
            >
              הירשם עכשיו! 🚀
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="תפריט"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <div className="w-6 h-0.5 bg-current mb-1.5 transition-all" />
            <div className="w-6 h-0.5 bg-current mb-1.5 transition-all" />
            <div className="w-6 h-0.5 bg-current transition-all" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0d0620]/98 backdrop-blur-md border-t border-[#00d4ff]/20"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {navLinks.slice(0, -1).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 rounded-lg font-medium text-center transition-colors text-white/80 hover:text-[#00d4ff] hover:bg-white/10"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/blog"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-lg font-medium text-center transition-colors text-white/80 hover:text-[#00d4ff] hover:bg-white/10"
              >
                בלוג
              </Link>
              <a
                href="#register"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-lg font-bold text-center bg-gradient-to-r from-[#ff1493] to-[#ffe600] text-[#0a0418]"
              >
                הרשמה
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
