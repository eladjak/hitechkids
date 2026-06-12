# hitechkids - Progress

## 2026-06-13 — deep-iteration: interactive Workshop Finder + a11y page + dead-link fixes
**Site was already live + polished** (hitechkids.eladjak.com → 200, Vercel DNS healthy). Deep-iteration
focused on web-paradigm-shift interactivity + closing real gaps:
- [x] **NEW: Workshop Finder** (`src/components/WorkshopFinder.tsx`) — interactive "find the right
  workshop for your kid" tool. Parent sets age (8-15 slider) + interest (4 chips) → scored
  recommendation → CTA pre-fills the registration form (decoupled via `window` CustomEvent
  `hitechkids:prefill-registration`; Registration listens + shows a confirmation banner). On-brand,
  RTL, a11y (aria-pressed/role=group/role=status, reduced-motion inherited). Wired into page after
  Workshops + nav link "מצא סדנה" (#finder) + llms.txt entry.
- [x] **Verified E2E** (agent-browser, local prod build): age 10 + "תכנות ומשחקים" → recommends
  "תכנות Python ו-Scratch", prefill sets registration select=that workshop + age=10. Screenshot OK.
- [x] **Dead-link fixes (definition-of-done):** Footer "שאלות ותשובות" `#faq` → `#faq-chat` (static
  FAQ was removed 26.5, anchor was dead); Footer "נגישות" `#faq` → real `/accessibility` page.
- [x] **NEW: /accessibility** — real Israeli accessibility statement (ת"י 5568 / WCAG 2.1 AA,
  contact + a11y coordinator). Added to sitemap + llms.txt.
- [x] Committed pending favicon/og/apple-touch/logo assets (referenced by layout.tsx `icons` metadata).
- [x] Gates: tsc 0, build 0 (14 routes). Local prod smoke green.
- NEEDS ELAD: real prices/schedule/testimonials are still illustrative placeholders (200+ בוגרים,
  4.9/5, prices ₪890-2990, schedule 8:30-16:00) — confirm or replace before peak marketing.
  Also: hiteclearning.co.il DNS is dead (separate domain, NOT this repo — this site is on
  hitechkids.eladjak.com which is healthy).

---

## 2026-05-28 — entry from deep-work session
**Logo concept approved by Elad.** `hitechkids-concept-1.png` (gpt-image-2): robot mascot with graduation cap + kid-friendly palette (electric blue / neon green / sunny pink / yellow). Full asset set built at `~/Documents/Logos/hitechkids/final/{raster,vector,favicon,og}/` — 9 PNG sizes × color/grayscale/B+W + favicon set + apple-touch + OG 1200×630. Source-of-truth in concepts/.

---


## Status: Production - LIVE
## Last Updated: 2026-05-26
## URL: https://hitechkids.eladjak.com

## 2026-05-27 — chat bug fixed + Supabase separation DONE (verified live)
- [x] **AI chat bug fixed.** "Chat doesn't work" = answers truncated mid-sentence. Root cause:
  Gemini 2.5 Flash "thinking" consumed the whole `maxOutputTokens:350` (thoughtsTokenCount=332 →
  finishReason MAX_TOKENS). Fix: `thinkingConfig.thinkingBudget:0` + maxOutputTokens→600, and
  **upgraded model gemini-2.5-flash → gemini-3.5-flash** (latest GA, better+cheaper). Verified live
  (clean UTF-8): complete accurate Hebrew answer.
- [x] **Supabase SEPARATION done.** New standalone project `klwcariyineeqpdfotqh`. Applied
  `scripts/separate-project/01-...schema.sql` via direct Postgres (registrations + RLS + anon
  INSERT-only). Repointed Vercel env (URL+anon `sb_publishable_…`) + redeployed. E2E live:
  POST /api/register → success:true → row confirmed in NEW project → test row deleted (0 rows).
  Old shared project (Sipurai `furviizyohryyqubosut`) no longer used by HiTechKids. Old leads NOT
  migrated (no old-project creds; small marketing volume — migrate later if needed). After 24-48h
  stable, drop `registrations` from the old project (lets Sipurai re-lock anon).

## 2026-05-26 — 3 fixes shipped + verified live (commits 61e2938, 85b0c72)
- [x] **(א) Responsive bug fixed (root cause).** Hero `<section>` is flex; its content div
  is a flex item with default `min-width:auto`. The marquee's `width:max-content` propagated
  up as min-content → forced the content div to 1280px even at 320px viewport → all hero text
  right-clipped under `overflow-hidden` (no page-scroll tell). Fix: `w-full min-w-0` on the
  flex item (Hero.tsx). Verified live 320/375/768/1280px: contentW=viewport, 0 overflow.
- [x] **(ב) Garbled-Hebrew image replaced.** `kids-graduation-israeli-openai.jpg` banner read
  gibberish "מכינת חניית". Regenerated via Gemini (nano-banana, NO-text prompt to avoid
  garbling). Used in Hero + Gallery. Backup in `.backups/`. Live 200, 939KB.
- [x] **(ג) Static FAQ removed → AI chat only.** Deleted FAQ.tsx + render; kept FAQChat.
  Navbar "שאלות" repointed `#faq` → `#faq-chat`. FAQPage JSON-LD retained for SEO.
  Live: old FAQ heading=0 hits, chat heading=1.
- [ ] **Supabase separation — BLOCKED on creds.** New project `klwcariyineeqpdfotqh` exists
  (URL+anon known) but NO db-password/service-role locally → can't apply DDL. Did NOT repoint
  Vercel env (would break live form before table exists). One-click finish-kit prepared:
  `scripts/separate-project/03-FINISH-KIT.md`. Needs Elad: paste schema in SQL editor, OR give
  Claude the new-project DB password / service-role key.

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
