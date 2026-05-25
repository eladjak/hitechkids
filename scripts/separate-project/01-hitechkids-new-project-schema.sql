-- ============================================================================
-- HiTechKids — STANDALONE Supabase project bootstrap (2026-05-25)
-- ============================================================================
-- Run this ONCE in the SQL editor of the NEW, dedicated HiTechKids Supabase
-- project (after Elad creates it). It recreates the `registrations` table,
-- RLS, and the minimal anon GRANT that the public registration form needs.
--
-- Source of truth for the schema: src/app/api/register/route.ts (insert columns
-- + validation) and scripts/2026-05-25-restore-anon-insert.sql (the grant model).
--
-- SECURITY MODEL (identical intent to the patched shared project, now isolated):
--   * anon may INSERT into registrations (public form) — and NOTHING else.
--   * anon may NOT SELECT/UPDATE/DELETE — child PII stays unreadable to the public.
--   * Reads happen only via service_role (server) or authenticated (admin).
--   * PostgREST checks table GRANTs BEFORE RLS, so the GRANT + the RLS policy
--     must BOTH be present for inserts to work (this is the exact pair whose
--     absence caused the cross-app breakage in the shared project).
-- ============================================================================

create extension if not exists "pgcrypto";

create table if not exists public.registrations (
  id          uuid primary key default gen_random_uuid(),
  child_name  text not null,
  child_age   integer not null check (child_age between 8 and 15),
  parent_name text not null,
  phone       text not null,
  email       text,
  workshop    text not null,
  notes       text,
  created_at  timestamptz not null default now()
);

-- Lock the table down, then open exactly one door for the public form.
alter table public.registrations enable row level security;

-- Table-level GRANTs (checked before RLS by PostgREST):
revoke all on public.registrations from anon;
grant insert on public.registrations to anon;          -- public form INSERT only
grant all on public.registrations to service_role;     -- server / admin full access
grant select on public.registrations to authenticated; -- logged-in admin read

-- RLS policies:
drop policy if exists allow_anon_insert on public.registrations;
create policy allow_anon_insert
  on public.registrations
  for insert
  to anon
  with check (true);   -- validation is enforced server-side in /api/register

drop policy if exists service_role_all on public.registrations;
create policy service_role_all
  on public.registrations
  for all
  to service_role
  using (true)
  with check (true);

drop policy if exists authenticated_read on public.registrations;
create policy authenticated_read
  on public.registrations
  for select
  to authenticated
  using (true);

-- ============================================================================
-- POST-RUN VERIFICATION (expected):
--   anon  INSERT  -> 201 Created
--   anon  SELECT  -> 401 / permission denied  (child PII protected)
-- ============================================================================
