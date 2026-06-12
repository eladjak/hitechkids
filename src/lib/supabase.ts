import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Lazily-instantiated Supabase client.
 *
 * We intentionally do NOT create the client at module load. Creating it
 * top-level throws "supabaseUrl is required" during the build / page-data
 * collection step on any environment that doesn't have the env vars set
 * (e.g. Vercel Preview deploys, which only carry Production-scoped vars).
 * Instantiating on first use keeps the build green everywhere and only
 * requires the vars at actual request time.
 */
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (client) return client;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase env vars missing (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)"
    );
  }

  client = createClient(supabaseUrl, supabaseAnonKey);
  return client;
}
