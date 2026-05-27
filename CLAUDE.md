# הייטקידס (HiTechKids) - קייטנת טכנולוגיה

## סקירה
אתר קייטנת הייטקידס - סדנאות טכנולוגיה ו-AI לילדים.
חלק ממערך EduTech אבל פרויקט נפרד (EduTech #7 הוקם על אפיון אחר).

## Tech Stack
- Next.js 16 + TypeScript + Tailwind CSS 4
- Supabase (הרשמה) — **STANDALONE project `klwcariyineeqpdfotqh`** (separated 27.5.2026 from the
  shared Sipurai project `furviizyohryyqubosut`, which had broken HiTechKids registration via a
  shared-anon REVOKE). anon = INSERT-only, RLS on. DB-admin pass in `.env.db-admin.local` (gitignored).
- AI FAQ chat: `gemini-3.5-flash` via `/api/chat-faq` (thinkingBudget:0 — else thinking truncates answers).

## סגנון
- ילדותי, צבעוני, כיפי
- צבעים: כחול חשמלי, ירוק ניאון, ורוד, צהוב
- אייקונים: רובוטים, קוד, AI, גיימינג
- Heebo font, RTL מלא

## מבנה
1. Hero - כותרת + אנימציה
2. סדנאות (AI, כתיבה יצירתית עם ChatGPT, קוד, רובוטיקה)
3. גלריית תמונות מקייטנות קודמות
4. להורים (בטיחות, שעות, מחירים)
5. טופס הרשמה
6. FAQ

## תמונות
- OneDrive: /עסקים/EduTech/Desktop-EduTech/ (21 images)
  - לוגו הייטקידס (2)
  - תמונות קייטנה AI (5)
  - סדנאות כתיבה יצירתית (6)
  - סדנאות AI בסיסי (6)
  - לוגו EduTech (2)
- חובה: ייצר עם Gemini בנוסף. אסור placeholders.

## פקודות
```bash
bun install && bun run dev
bunx tsc --noEmit && bun run build
```


---

## 🏭 AI Factory / Agent Network (Sprint 5, Apr 2026)

See `~/.claude/AI_FACTORY_ARCHITECTURE.md` for full details.

**Delegator API** (http://37.27.31.1:3900) — single entry point for content/research/messaging:
- `/pipeline/full` — research + landing page + email + social post in 78s
- `/content-studio/generate` — AI content pipeline (Sanity + 10 brands)
- `/sms/send` — Rav Messer Israeli SMS
- `/postiz/post` — multi-platform social publish
- `/drive/search`, `/calendar/check` — Google (OAuth configured)

**10 agents**: Kami (WA :3001), Kaylee (infra :18789), Claude Code, CrewAI (:8001), Dashboard, + Hermes / n8n / Ollama / Uptime Kuma / Coolify

**Public URLs**: kami.eladjak.com · content-social.eladjak.com · pages.fullstack-eladjak.co.il · studio.fullstack-eladjak.co.il

When building features that need content, publishing, messaging, or research — call the delegator instead of reimplementing.

