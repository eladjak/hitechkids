-- HiTechKids registration form fix (2026-05-25)
--
-- ROOT CAUSE: The Sipurai RLS lockdown (2026-05-25) ran `REVOKE ALL FROM anon`
-- on the shared Supabase project `furviizyohryyqubosut`. That revoked the anon
-- table-level GRANT on public.registrations, so PostgREST returned
-- `42501 permission denied for table registrations` for the public registration
-- form (the /api/register route uses the anon key). RLS policy `allow_anon_insert`
-- already exists and is correct -- but PostgREST checks table GRANTS *before* RLS,
-- so the missing grant blocked inserts before the policy was ever evaluated.
--
-- FIX (minimal, non-destructive): restore ONLY the INSERT grant to anon.
-- Do NOT grant SELECT to anon -- child PII (names, ages, parent phones) must stay
-- unreadable by the public. SELECT remains via service_role / authenticated only.
--
-- Verify after: anon INSERT -> 201 ; anon SELECT -> 401 permission denied.

GRANT INSERT ON public.registrations TO anon;
