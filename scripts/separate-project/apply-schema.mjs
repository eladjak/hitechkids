// Apply 01-...schema.sql to the NEW HiTechKids Supabase project + verify. Prints NO secrets.
// Run: NODE_PATH="$HOME/.claude/node_modules" node scripts/separate-project/apply-schema.mjs
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import os from "node:os";
import path from "node:path";
const require = createRequire(path.join(os.homedir(), ".claude", "x.js"));
const { Client } = require("pg");

const root = new URL("../../", import.meta.url);
const pw = readFileSync(new URL(".env.db-admin.local", root), "utf8").match(/^SUPABASE_DB_PASSWORD=(.*)$/m)[1].trim();
const sql = readFileSync(new URL("scripts/separate-project/01-hitechkids-new-project-schema.sql", root), "utf8");

const c = new Client({
  host: "db.klwcariyineeqpdfotqh.supabase.co", port: 5432, user: "postgres",
  password: pw, database: "postgres", ssl: { rejectUnauthorized: false }, connectionTimeoutMillis: 20000,
});

try {
  await c.connect();
  console.log("CONNECTED to klwcariyineeqpdfotqh");
  await c.query(sql);
  console.log("SCHEMA APPLIED ok");
  const t = await c.query(`select column_name,data_type from information_schema.columns where table_schema='public' and table_name='registrations' order by ordinal_position`);
  console.log("\nregistrations columns:"); console.table(t.rows);
  const rls = await c.query(`select relrowsecurity from pg_class where oid='public.registrations'::regclass`);
  console.log("RLS enabled:", rls.rows[0]?.relrowsecurity);
  const pol = await c.query(`select policyname,cmd,roles::text from pg_policies where schemaname='public' and tablename='registrations' order by policyname`);
  console.log("policies:"); console.table(pol.rows);
  const gr = await c.query(`select grantee,privilege_type from information_schema.role_table_grants where table_schema='public' and table_name='registrations' and grantee in ('anon','authenticated','service_role') order by grantee,privilege_type`);
  console.log("grants:"); console.table(gr.rows);
} catch (e) {
  console.error("ERROR:", e.message); process.exit(1);
} finally { await c.end().catch(()=>{}); }
