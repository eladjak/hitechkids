# HiTechKids Supabase separation — FINISH KIT (Elad, ~2 min)

**Status (2026-05-26):** BLOCKED on credentials for the new project. Claude has the new
URL + anon key (from the session prompt) but **no DB password and no service-role key** for
`klwcariyineeqpdfotqh`, so it cannot apply DDL or read the old project's rows. Everything
non-destructive is prepared below. Claude did NOT repoint Vercel env (doing so before the
table exists would break the live registration form).

New project: `https://klwcariyineeqpdfotqh.supabase.co`
Old (shared, Sipurai) project still live in prod: `furviizyohryyqubosut`

---

## Step 1 — Apply schema to the NEW project (dashboard, no creds needed by you)
Open the new project's **SQL editor** → paste the full contents of
`01-hitechkids-new-project-schema.sql` (same folder) → Run.
Expected: `registrations` table created, RLS on, anon INSERT-only grant.

## Step 2 — (Optional) migrate existing rows
In the **OLD** project SQL editor: `select * from public.registrations order by created_at;`
→ export CSV → import into the NEW project's `registrations` table (Table editor → Import).
Volume is small (marketing form). Skip if you don't need historical leads.

## Step 3 — Repoint Vercel env to the NEW project, then redeploy
Run locally (values already filled in):
```bash
cd C:/Users/eladj/projects/hitechkids
npx vercel env rm NEXT_PUBLIC_SUPABASE_URL production -y
npx vercel env rm NEXT_PUBLIC_SUPABASE_ANON_KEY production -y
printf '%s' "https://klwcariyineeqpdfotqh.supabase.co" | npx vercel env add NEXT_PUBLIC_SUPABASE_URL production
printf '%s' "sb_publishable_czXVU22G0sKZh2JU3D6jcA_3sjCZ6ED" | npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# also update local for dev:
#   NEXT_PUBLIC_SUPABASE_URL=https://klwcariyineeqpdfotqh.supabase.co
#   NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_czXVU22G0sKZh2JU3D6jcA_3sjCZ6ED
npx vercel --prod --yes
```

## Step 4 — Verify live E2E (then delete the test row in the new project)
```bash
curl -s -X POST "https://hitechkids.eladjak.com/api/register" \
  -H "Content-Type: application/json" \
  -d '{"childName":"בדיקה","childAge":"10","parentName":"הורה בדיקה","phone":"0501234567","workshop":"AI","notes":"migration test"}'
# expect: {"success":true,...}
```
Confirm the row lands in the NEW project, then delete it.

## Step 5 — After 24–48h stable: drop HiTechKids' table from the OLD shared project
```sql
drop table if exists public.registrations cascade;
```
Lets Sipurai re-run a full `REVOKE ALL FROM anon` lockdown without breaking HiTechKids.

---
### If you want Claude to finish it autonomously next time
Give it ONE of: (a) the new project's **DB password** (it'll apply schema via direct
Postgres like the Sipurai pass), or (b) a **service-role key** for `klwcariyineeqpdfotqh`,
or (c) re-point the Supabase MCP to that project_ref and run `/mcp` OAuth. RLS in the
schema is already correct (anon INSERT-only, no SELECT — child PII protected).
