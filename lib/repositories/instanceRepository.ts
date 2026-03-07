import { getSupabaseClient } from "../supabaseClient";
import { Instance } from "../types";

export const INSTANCE_ID = "singleton";

export async function insertInstance(params: {
  name: string;
  email: string;
  secretHash: string;
}): Promise<Instance> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("instances")
    .insert({
      id: INSTANCE_ID,
      name: params.name,
      email: params.email,
      secret_hash: params.secretHash,
    })
    .select("id, name, email")
    .single();

  if (error) {
    throw error;
  }
  return data as Instance;
}

export async function deleteAllInstances(): Promise<void> {
  const supabase = getSupabaseClient();
  const { error } = await supabase.from("instances").delete().neq("id", "");

  if (error) {
    throw error;
  }
}

export async function findInstance(): Promise<Instance | null> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("instances")
    .select("id, name, email")
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }
  return (data as Instance | null) ?? null;
}

export async function findInstanceBySecretHash(
  secretHash: string,
): Promise<Instance | null> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("instances")
    .select("id, name, email")
    .eq("id", INSTANCE_ID)
    .eq("secret_hash", secretHash)
    .maybeSingle();

  if (error) {
    throw error;
  }
  return (data as Instance | null) ?? null;
}

export async function updateInstanceDetails(params: {
  name: string;
  email: string;
}): Promise<Instance | null> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("instances")
    .update({ name: params.name, email: params.email })
    .eq("id", INSTANCE_ID)
    .select("id, name, email")
    .maybeSingle();

  if (error) {
    throw error;
  }
  return (data as Instance | null) ?? null;
}

export async function deleteInstance(): Promise<void> {
  const supabase = getSupabaseClient();
  const { error } = await supabase
    .from("instances")
    .delete()
    .eq("id", INSTANCE_ID);

  if (error) {
    throw error;
  }
}
