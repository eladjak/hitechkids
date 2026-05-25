# hitechkids - Progress

## Status: Production - LIVE (share-ready upgrade shipped)
## Last Updated: 2026-05-25
## URL: https://hitechkids.eladjak.com

## Share-Ready Upgrade (2026-05-25)
- [x] AI FAQ chat answering live (GEMINI_API_KEY set in Vercel); server route hardened per council (rate-limit, input/turn caps, kid-safe prompt, Gemini safety settings, 12s timeout, no PII echo). Warmer UX (bot avatar + illustrated empty state). Static FAQ kept as no-JS fallback + FAQPage schema.
- [x] 5 custom Gemini illustrations (flat-vector, on-brand) in public/images/illustrations/: mascot, chat empty-state, circuit divider (x2 in page), parents-safe, blog header.
- [x] Blog: /blog + /blog/[slug] (SSG), 2 Hebrew elad-voice posts, Blog+BlogPosting JSON-LD, nav+footer links, sitemap, llms.txt.
- [x] /privacy real page (child-PII) replacing dead footer spans.
- [x] hello@hitechkids.eladjak.com: CF MX(route1/2/3)+SPF added on `hitechkids` host via DNS API (propagated, verified @8.8.8.8); wired into footer/privacy/llms.txt. ROUTING RULE = Elad dashboard step (token lacks Email:edit). Subdomain must be added in CF Email Routing Settings + rule hello@ -> eladhiteclearning@gmail.com.
- [x] SEO/AIO: Course schema x4, blog schema, single H1, alt-text (1 decorative alt="" left, correct), canonical, meta 131 chars, semantic tags. mole-ai quota exhausted (2/mo) -> manual checklist ~95+.
- [x] a11y: gallery div->button+aria, modal close aria-label, navbar aria-expanded/controls, prefers-reduced-motion, min-h-screen->min-h-dvh.
- [x] tsc 0, build 0 (13 routes), lint 0 errors. Commits 5dc1668 + 5b9fb08 pushed + deployed to prod. All verified live.
- Council verdicts + full proof: ~/Documents/reports/hitechkids-upgrade-2026-05-25.html
- Spec: .omc/plans/UPGRADE-SPEC-2026-05-25.md

## What's Done
- [x] Next.js 16 + React 19 + Tailwind 4 + Framer Motion
- [x] 8 components: Navbar, Hero, Workshops, Gallery, ForParents, Registration, FAQ, Footer
- [x] RTL + Heebo font + dark neon theme
- [x] Real photos + Gemini gallery images
- [x] Framer Motion animations (25 fixed)
- [x] Real contact details (052-542-7474, eladhiteclearning@gmail.com)
- [x] SEO: OG, Twitter, JSON-LD, sitemap, robots
- [x] Security headers (next.config.ts + vercel.json)
- [x] GitHub repo: eladjak/hitechkids
- [x] Vercel deployment + hitechkids.eladjak.com subdomain
- [x] Cloudflare DNS CNAME + SSL cert
- [x] **Supabase integration** - registrations table with RLS, tested end-to-end
- [x] **Accessibility** - skip-to-content, focus-visible styles, gallery modal a11y (Escape key, aria)
- [x] **WhatsApp floating button** - fixed bottom-left with spring animation
- [x] **Registration API** → saves to Supabase (verified on production)

## Architecture
- Standalone Next.js → hitechkids.eladjak.com (subdomain of eladjak hub)
- Supabase project: furviizyohryyqubosut (shared with ey.ai-kids-playground)
- Registration: form → /api/register → Supabase registrations table
- Vercel env vars: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
