import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let supabase: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (supabase) return supabase;

  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Supabase environment variables SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set.",
    );
  }

  supabase = createClient(url, serviceKey, {
    auth: {
      persistSession: false,
    },
  });

  return supabase;
}

