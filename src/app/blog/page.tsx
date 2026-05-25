import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { posts } from "@/lib/blog"

export const metadata: Metadata = {
  title: "הבלוג של הייטקידס — AI, טכנולוגיה והורות בעידן החדש",
  description:
    "מאמרים להורים על בינה מלאכותית, תכנות וטכנולוגיה לילדים: איך לבחור קייטנה, ללוות ילד בעולם ה-AI, ולפתח סקרנות וחשיבה ביקורתית.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "הבלוג של הייטקידס",
    description: "מאמרים להורים על AI, תכנות וטכנולוגיה לילדים.",
    url: "https://hitechkids.eladjak.com/blog",
    locale: "he_IL",
    type: "website",
    images: [{ url: "/images/illustrations/blog-header.jpg", width: 1200, height: 630, alt: "הבלוג של הייטקידס" }],
  },
}

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": "https://hitechkids.eladjak.com/blog#blog",
  name: "הבלוג של הייטקידס",
  description: "מאמרים להורים על AI, תכנות וטכנולוגיה לילדים.",
  url: "https://hitechkids.eladjak.com/blog",
  inLanguage: "he-IL",
  blogPost: posts.map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    url: `https://hitechkids.eladjak.com/blog/${p.slug}`,
  })),
}

export default function BlogIndex() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />
      <main id="main-content" className="min-h-dvh bg-[#0d0620]">
        <header className="relative overflow-hidden border-b border-white/10">
          <Image
            src="/images/illustrations/blog-header.jpg"
            alt="רובוט קורא ספר מוקף באייקונים של קוד ויצירה"
            width={1200}
            height={400}
            className="absolute inset-0 size-full object-cover opacity-30"
            priority
          />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <Link href="/" className="text-[#00d4ff] text-sm font-bold hover:underline inline-block mb-6">
              → חזרה לאתר הקייטנה
            </Link>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 text-balance">הבלוג של הייטקידס 📚</h1>
            <p className="text-xl text-white/70 text-pretty max-w-2xl mx-auto">
              מחשבות, טיפים ומדריכים להורים על AI, תכנות וטכנולוגיה לילדים — בלי באז, עם הרבה כנות.
            </p>
          </div>
        </header>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid gap-6">
            {posts.map((p) => (
              <article
                key={p.slug}
                className="bg-[#1a0a3c]/40 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-[#00d4ff]/40 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3 text-sm">
                  <span className="text-2xl" aria-hidden>{p.emoji}</span>
                  <span className="bg-[#00d4ff]/15 text-[#00d4ff] font-bold px-3 py-1 rounded-full">{p.category}</span>
                  <span className="text-white/40">{p.readMinutes} דקות קריאה</span>
                </div>
                <h2 className="text-2xl font-black text-white mb-2 text-balance">
                  <Link href={`/blog/${p.slug}`} className="hover:text-[#00d4ff] transition-colors">
                    {p.title}
                  </Link>
                </h2>
                <p className="text-white/70 leading-relaxed text-pretty mb-4">{p.description}</p>
                <div className="flex items-center justify-between">
                  <time className="text-white/40 text-sm" dateTime={p.date}>
                    {new Date(p.date).toLocaleDateString("he-IL", { year: "numeric", month: "long", day: "numeric" })}
                  </time>
                  <Link href={`/blog/${p.slug}`} className="text-[#39ff14] font-bold text-sm hover:underline">
                    קראו עוד ←
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
