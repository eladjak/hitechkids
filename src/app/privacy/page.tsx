import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "מדיניות פרטיות | הייטקידס",
  description:
    "מדיניות הפרטיות של קייטנת הייטקידס: אילו פרטים אנחנו אוספים בטופס ההרשמה, למה, איך הם נשמרים, ואיך לפנות אלינו למחיקה או עדכון של מידע.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
}

export default function Privacy() {
  return (
    <main id="main-content" className="min-h-dvh bg-[#0d0620]">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <nav className="mb-8 text-sm">
          <Link href="/" className="text-[#00d4ff] font-bold hover:underline">→ חזרה לאתר</Link>
        </nav>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-3">מדיניות פרטיות</h1>
        <p className="text-white/50 text-sm mb-10">עודכן לאחרונה: מאי 2026</p>

        <div className="space-y-6 text-white/80 leading-loose text-lg text-pretty">
          <p>
            קייטנת הייטקידס מכבדת את הפרטיות שלכם ושל הילדים שלכם. הדף הזה מסביר בפשטות אילו פרטים אנחנו אוספים, למה,
            ומה הזכויות שלכם.
          </p>

          <h2 className="text-2xl font-black text-white mt-8">אילו פרטים אנחנו אוספים</h2>
          <p>
            כשממלאים את טופס ההרשמה באתר, אנחנו אוספים: שם הילד/ה וגילו, שם ההורה, מספר טלפון, כתובת אימייל, הסדנה
            המבוקשת והערות שתבחרו להוסיף. זה המידע היחיד שאנחנו אוספים — אין מעקב פרסומי ואין מכירת מידע לצד שלישי.
          </p>

          <h2 className="text-2xl font-black text-white mt-8">למה אנחנו צריכים אותם</h2>
          <ul className="space-y-2">
            <li className="flex gap-3"><span className="text-[#39ff14]" aria-hidden>✦</span><span>כדי ליצור איתכם קשר ולתאם את ההרשמה.</span></li>
            <li className="flex gap-3"><span className="text-[#39ff14]" aria-hidden>✦</span><span>כדי להתאים את הסדנה לגיל הילד/ה ולשבץ לקבוצה המתאימה.</span></li>
            <li className="flex gap-3"><span className="text-[#39ff14]" aria-hidden>✦</span><span>כדי לדעת על אלרגיות או צרכים מיוחדים שתספרו לנו.</span></li>
          </ul>

          <h2 className="text-2xl font-black text-white mt-8">איך המידע נשמר</h2>
          <p>
            פרטי ההרשמה נשמרים בבסיס נתונים מאובטח. הגישה לקריאת הפרטים סגורה לציבור — טופס ההרשמה יכול רק לכתוב
            רשומה חדשה, ולא לקרוא רשומות קיימות. אנחנו לא מפרסמים, משכירים או מוכרים את הפרטים לאף גורם.
          </p>

          <h2 className="text-2xl font-black text-white mt-8">פרטיות ילדים</h2>
          <p>
            את טופס ההרשמה ממלא הורה או אפוטרופוס. אנחנו לא אוספים מידע מילדים באופן ישיר, ועוזר ה-AI באתר אינו מבקש
            ואינו שומר פרטים אישיים. אם ילד/ה כותבים פרטים אישיים בצ׳אט, המערכת לא חוזרת עליהם ולא שומרת אותם.
          </p>

          <h2 className="text-2xl font-black text-white mt-8">הזכויות שלכם</h2>
          <p>
            אתם רשאים בכל עת לבקש לראות, לעדכן או למחוק את הפרטים שמסרתם. פשוט כתבו לנו לאימייל{" "}
            <a href="mailto:hello@hitechkids.eladjak.com" className="text-[#00d4ff] hover:underline" dir="ltr">hello@hitechkids.eladjak.com</a>{" "}
            או בוואטסאפ{" "}
            <a href="https://wa.me/972525427474" className="text-[#00d4ff] hover:underline" target="_blank" rel="noopener noreferrer" dir="ltr">052-542-7474</a>{" "}
            ונטפל בבקשה במהירות.
          </p>

          <h2 className="text-2xl font-black text-white mt-8">יצירת קשר</h2>
          <p>
            לכל שאלה בנושא פרטיות:{" "}
            <a href="mailto:hello@hitechkids.eladjak.com" className="text-[#00d4ff] hover:underline" dir="ltr">hello@hitechkids.eladjak.com</a>.
          </p>
        </div>
      </article>
    </main>
  )
}
