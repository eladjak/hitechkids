import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Workshops from "@/components/Workshops";
import Gallery from "@/components/Gallery";
import ForParents from "@/components/ForParents";
import Registration from "@/components/Registration";
import FAQ from "@/components/FAQ";
import FAQChat from "@/components/FAQChat";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const faqEntries: { q: string; a: string }[] = [
  { q: "מה הגיל המתאים לקייטנה?", a: "הקייטנה מתאימה לגילאים 8-15. יש קבוצות נפרדות לגילאים 8-11 ו-12-15, כדי שכל ילד יהיה עם חברים בגילו." },
  { q: "האם צריך ניסיון קודם בקוד?", a: "ממש לא! הסדנאות מיועדות לכל הרמות, ממתחילים מוחלטים ועד ילדים עם ניסיון. המדריכים מתאימים את הקצב לכל קבוצה." },
  { q: "כמה ילדים יש בכל קבוצה?", a: "מקסימום 10 ילדים בקבוצה. אנחנו מאמינים ביחס אישי ולכן מגבילים את הגודל." },
  { q: "מה שעות הפעילות?", a: "הקייטנה פועלת בימים א-ה, בין 8:30 ל-16:00. ניתן להגיע ב-8:00 ולאסוף עד 17:00 בתיאום מראש." },
  { q: "מה כוללת ארוחת הצהריים?", a: "ארוחה בריאה ומזינה הכלולה במחיר. אנחנו מתחשבים בכשרות, אלרגיות וצרכים תזונתיים מיוחדים." },
  { q: "האם המדריכים מוסמכים?", a: "בהחלט. כל המדריכים הם מומחי טכנולוגיה עם הכשרה פדגוגית בחינוך ילדים." },
  { q: "מה הילד לוקח הביתה?", a: "בסוף כל שבוע כל ילד יוצא עם פרויקט שיצר - משחק שתכנת, ספר דיגיטלי, רובוט שבנה או תמונות AI." },
  { q: "מה מדיניות ההחזרים?", a: "ביטול עד 14 יום מראש - החזר מלא. ביטול 7-14 יום מראש - החזר 75%. פחות מ-7 ימים - אין החזר, אך ניתן להעביר לאדם אחר." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://hitechkids.eladjak.com/#website",
      name: "הייטקידס",
      url: "https://hitechkids.eladjak.com",
      inLanguage: "he-IL",
      description: "קייטנת טכנולוגיה לילדים - סדנאות AI, קוד, כתיבה יצירתית ורובוטיקה לגילאי 8-15",
    },
    {
      "@type": "EducationalOrganization",
      "@id": "https://hitechkids.eladjak.com/#org",
      name: "הייטקידס - קייטנת טכנולוגיה",
      description: "קייטנת טכנולוגיה לילדים - סדנאות AI, קוד, כתיבה יצירתית ורובוטיקה לגילאי 8-15",
      url: "https://hitechkids.eladjak.com",
      telephone: "+972-52-542-7474",
      email: "eladhiteclearning@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "מגדל העמק",
        addressCountry: "IL",
      },
      sameAs: [],
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "ILS",
        lowPrice: "890",
        highPrice: "2990",
        offerCount: "3",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://hitechkids.eladjak.com/#faq",
      mainEntity: faqEntries.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WhatsAppFloat />
      <main id="main-content">
        <Navbar />
        <Hero />
        <Workshops />
        <Gallery />
        <ForParents />
        <Registration />
        <FAQ />
        <FAQChat />
        <Footer />
      </main>
    </>
  );
}
