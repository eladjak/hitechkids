import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "הצהרת נגישות | הייטקידס",
  description:
    "הצהרת הנגישות של אתר קייטנת הייטקידס: האתר נבנה בהתאם לתקן הישראלי (ת\"י 5568) ולרמה AA של WCAG 2.1, כולל ניווט במקלדת, ניגודיות צבעים והתאמה לקוראי מסך.",
  alternates: { canonical: "/accessibility" },
  robots: { index: true, follow: true },
}

export default function Accessibility() {
  return (
    <main id="main-content" className="min-h-dvh bg-[#0d0620]">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <nav className="mb-8 text-sm">
          <Link href="/" className="text-[#00d4ff] font-bold hover:underline">→ חזרה לאתר</Link>
        </nav>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-3">הצהרת נגישות</h1>
        <p className="text-white/50 text-sm mb-10">עודכן לאחרונה: יוני 2026</p>

        <div className="space-y-6 text-white/80 leading-loose text-lg text-pretty">
          <p>
            קייטנת הייטקידס רואה חשיבות רבה בכך שכל הורה וכל ילד יוכלו לגלוש באתר בנוחות, ללא קשר ליכולות
            או לטכנולוגיה שבה הם משתמשים. השקענו מאמץ כדי שהאתר יהיה נגיש ככל האפשר.
          </p>

          <h2 className="text-2xl font-black text-white mt-8">רמת הנגישות באתר</h2>
          <p>
            האתר נבנה בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע&quot;ג–2013,
            ובהתאם לתקן הישראלי 5568 שמבוסס על הנחיות WCAG 2.1 ברמה AA.
          </p>

          <h2 className="text-2xl font-black text-white mt-8">מה עשינו כדי שהאתר יהיה נגיש</h2>
          <ul className="space-y-2">
            <li className="flex gap-3"><span className="text-[#39ff14]" aria-hidden>✦</span><span>ניווט מלא באמצעות מקלדת, כולל קישור &quot;דלג לתוכן הראשי&quot;.</span></li>
            <li className="flex gap-3"><span className="text-[#39ff14]" aria-hidden>✦</span><span>סימון מובלט של הפוקוס (מסגרת ברורה) על כל כפתור, קישור ושדה.</span></li>
            <li className="flex gap-3"><span className="text-[#39ff14]" aria-hidden>✦</span><span>טקסט חלופי (alt) לתמונות, ותוויות (aria) לכפתורי אייקון ולתפריטים.</span></li>
            <li className="flex gap-3"><span className="text-[#39ff14]" aria-hidden>✦</span><span>מבנה כותרות תקין, סימון שדות חובה, והודעות שגיאה ברורות בטופס ההרשמה.</span></li>
            <li className="flex gap-3"><span className="text-[#39ff14]" aria-hidden>✦</span><span>כיבוד העדפת המשתמש להפחתת אנימציות (prefers-reduced-motion).</span></li>
            <li className="flex gap-3"><span className="text-[#39ff14]" aria-hidden>✦</span><span>תמיכה מלאה בכיווניות מימין-לשמאל (RTL) וקריאוּת בעברית.</span></li>
          </ul>

          <h2 className="text-2xl font-black text-white mt-8">דפדפנים נתמכים</h2>
          <p>
            האתר נבדק ונתמך בגרסאות העדכניות של Chrome, Edge, Firefox ו-Safari, במחשב ובמובייל.
          </p>

          <h2 className="text-2xl font-black text-white mt-8">נתקלתם בבעיית נגישות?</h2>
          <p>
            אנחנו ממשיכים לשפר את הנגישות כל הזמן. אם נתקלתם ברכיב שאינו נגיש, או שיש לכם הצעה לשיפור, נשמח
            לשמוע — נטפל בכך במהירות. אפשר לפנות אלינו לאימייל{" "}
            <a href="mailto:hello@hitechkids.eladjak.com" className="text-[#00d4ff] hover:underline" dir="ltr">hello@hitechkids.eladjak.com</a>{" "}
            או בוואטסאפ{" "}
            <a href="https://wa.me/972525427474" className="text-[#00d4ff] hover:underline" target="_blank" rel="noopener noreferrer" dir="ltr">052-542-7474</a>.
          </p>

          <h2 className="text-2xl font-black text-white mt-8">פרטי רכז הנגישות</h2>
          <p>
            אלעד יעקובוביץ׳ · אימייל:{" "}
            <a href="mailto:hello@hitechkids.eladjak.com" className="text-[#00d4ff] hover:underline" dir="ltr">hello@hitechkids.eladjak.com</a>{" "}
            · טלפון:{" "}
            <a href="tel:+972525427474" className="text-[#00d4ff] hover:underline" dir="ltr">052-542-7474</a>.
          </p>
        </div>
      </article>
    </main>
  )
}
