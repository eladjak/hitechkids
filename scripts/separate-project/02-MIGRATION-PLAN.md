# HiTechKids → Standalone Supabase Project — Migration Plan

**Date:** 2026-05-25
**Council verdict:** SEPARATE (3/3 unanimous — GPT-5.5 + Grok-4.20 + Gemini-3-Pro, no dissent)
**Why:** HiTechKids + Sipurai share one Supabase project (`furviizyohryyqubosut`). Both hold
children's PII. A Sipurai security migration (`REVOKE ALL FROM anon`) silently broke
HiTechKids registration via the shared `anon` role. Co-tenancy of two unrelated child-PII
apps = unacceptable blast radius (COPPA/GDPR-K). Separate them.

## What needs Elad (cannot be automated)
Creating a Supabase project requires the dashboard or a Management API personal access
token (`sbp_...`). **No such token exists** in the VPS keyvault or locally, and the Supabase
MCP session is expired. So **Elad must create the new project**. Everything else below is
prepared and one-click.

## Data scope to migrate
Only HiTechKids' own table: **`public.registrations`** (child_name, child_age, parent_name,
phone, email, workshop, notes, created_at). HiTechKids does NOT own any other table in the
shared project — all the rest (books/pages/community/comments/etc.) belong to Sipurai and
STAY in `furviizyohryyqubosut`.

## Step-by-step (zero data loss)

1. **[Elad]** Create a new Supabase project, e.g. `hitechkids-prod` (region: closest, e.g.
   `eu-central-1`/Frankfurt). Note its **Project URL** and **anon (publishable) key**.

2. **[Elad or Claude w/ access]** In the NEW project's SQL editor, run
   `01-hitechkids-new-project-schema.sql` (in this folder). Creates `registrations`, RLS,
   and the anon INSERT grant.

3. **Export existing rows from the OLD shared project.** In the OLD project's SQL editor:
   ```sql
   -- copy the output, or use Table editor → Export CSV on `registrations`
   select * from public.registrations order by created_at;
   ```
   (HiTechKids' registration volume is small — a marketing form — so a CSV export/import or
   a handful of INSERTs is sufficient. For a Postgres-native copy:
   `pg_dump "OLD_DB_URL" -t public.registrations --data-only --inserts > registrations.sql`
   then run that SQL against the NEW project.)

4. **Import into the NEW project** (CSV import via Table editor, or run the dumped INSERTs).
   `id` and `created_at` are preserved (the dump/CSV carries them), so no data is lost or
   re-dated.

5. **Repoint the app.** Update the HiTechKids Vercel env to the NEW project:
   ```bash
   cd C:/Users/eladj/projects/hitechkids
   vercel env rm NEXT_PUBLIC_SUPABASE_URL production
   vercel env rm NEXT_PUBLIC_SUPABASE_ANON_KEY production
   printf '%s' "<NEW_PROJECT_URL>"  | vercel env add NEXT_PUBLIC_SUPABASE_URL production
   printf '%s' "<NEW_ANON_KEY>"     | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
   vercel --prod --yes
   ```
   (Tiny cutover window: any registration submitted between the export and the repoint should
   be re-checked in the OLD project and backfilled — volume is low, so a quick visual diff of
   `created_at` covers it. For zero-gap, briefly show a "maintenance" message on the form
   during the ~2 min cutover, per the council's dual-write/maintenance recommendation.)

6. **Verify NEW project end-to-end:**
   ```bash
   curl -s -X POST "https://hitechkids.eladjak.com/api/register" \
     -H "Content-Type: application/json" \
     -d '{"childName":"בדיקה","childAge":"10","parentName":"הורה בדיקה","phone":"0501234567","workshop":"AI","notes":"migration test"}'
   # expect: {"success":true,...}
   ```
   Confirm the row appears in the NEW project, then delete the test row.

7. **Clean up the OLD shared project (after 24–48h stable):** drop HiTechKids' table so the
   shared project holds only Sipurai data:
   ```sql
   drop table if exists public.registrations cascade;
   ```
   This also lets the Sipurai team re-run a full `REVOKE ALL FROM anon` lockdown later WITHOUT
   touching HiTechKids — the whole point of separating.

## Cost note (council-acknowledged)
Free tier auto-pauses a project after 7 days of inactivity. HiTechKids is a marketing site
with steady-ish traffic, so it likely stays awake; if it pauses, a tiny uptime ping (e.g. an
Uptime-Kuma monitor hitting the homepage) keeps it warm. The council judged this a non-issue
vs. the security win. (Consider Supabase Pro if either child-PII app should never auto-pause.)
