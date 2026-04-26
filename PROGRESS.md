# hitechkids - Progress

## Status: Production - LIVE
## Last Updated: 2026-04-10
## URL: https://hitechkids.eladjak.com

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
