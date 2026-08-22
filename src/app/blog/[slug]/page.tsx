import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getPost, allSlugs, type Block } from "@/lib/blog"

export function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return { title: "מאמר לא נמצא — הייטקידס" }
  return {
    title: `${post.title} | הבלוג של הייטקידס`,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://hitechkids.eladjak.com/blog/${post.slug}`,
      type: "article",
      locale: "he_IL",
      publishedTime: post.date,
      images: [{ url: "/images/illustrations/blog-header.jpg", width: 1200, height: 630, alt: post.title }],
    },
  }
}

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "h2":
      return <h2 key={i} className="text-2xl md:text-3xl font-black text-white mt-10 mb-4 text-balance">{block.text}</h2>
    case "h3":
      return <h3 key={i} className="text-xl font-bold text-[#00d4ff] mt-8 mb-3">{block.text}</h3>
    case "ul":
      return (
        <ul key={i} className="my-5 space-y-3">
          {block.items.map((item, j) => (
            <li key={j} className="flex gap-3 text-white/80 leading-relaxed text-pretty">
              <span className="text-[#39ff14] shrink-0" aria-hidden>✦</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    case "quote":
      return (
        <blockquote key={i} className="my-8 border-r-4 border-[#ff1493] bg-[#ff1493]/10 rounded-l-xl px-6 py-4 text-lg text-white font-medium text-pretty">
          {block.text}
        </blockquote>
      )
    default:
      return <p key={i} className="my-4 text-white/80 leading-loose text-lg text-pretty">{block.text}</p>
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "he-IL",
    mainEntityOfPage: `https://hitechkids.eladjak.com/blog/${post.slug}`,
    author: { "@type": "Organization", name: "הייטקידס" },
    publisher: {
      "@type": "Organization",
      name: "הייטקידס",
      url: "https://hitechkids.eladjak.com",
    },
    image: "https://hitechkids.eladjak.com/images/illustrations/blog-header.jpg",
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <main id="main-content" className="min-h-dvh bg-[#0d0620]">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <nav className="mb-8 text-sm">
            <Link href="/blog" className="text-[#00d4ff] font-bold hover:underline">→ כל המאמרים</Link>
          </nav>

          <div className="flex items-center gap-3 mb-4 text-sm">
            <span className="text-2xl" aria-hidden>{post.emoji}</span>
            <span className="bg-[#00d4ff]/15 text-[#00d4ff] font-bold px-3 py-1 rounded-full">{post.category}</span>
            <span className="text-white/40">{post.readMinutes} דקות קריאה</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight text-balance">{post.title}</h1>
          <time className="text-white/40 text-sm block mb-10" dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("he-IL", { year: "numeric", month: "long", day: "numeric" })}
          </time>

          <div>{post.body.map(renderBlock)}</div>

          <div className="mt-14 pt-10 border-t border-white/10 text-center bg-gradient-to-r from-[#00d4ff]/10 via-[#ff1493]/10 to-[#ffe600]/10 rounded-2xl p-8">
            <h2 className="text-2xl font-black text-white mb-3">רוצים שהילד יחווה את זה בעצמו? 🚀</h2>
            <p className="text-white/70 mb-6 text-pretty">הסדנאות של קייטנת הייטקידס מחכות לקיץ 2026.</p>
            <Link
              href="/#register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#ff1493] to-[#ffe600] text-[#0a0418] font-black rounded-full hover:opacity-90 transition-opacity"
            >
              להרשמה לקייטנה
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}
