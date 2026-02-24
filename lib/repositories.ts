import crypto from "node:crypto";
import { getSupabaseClient } from "./supabaseClient";

export type Instance = {
  id: string;
  name: string;
  email: string;
};

export type Job = {
  id: string;
  instance_id: string;
  date_applied: string;
  role: string;
  description: string | null;
  job_type: string;
  source: string;
  link: string | null;
  company: string;
  contact_name: string | null;
  contact_email: string | null;
  contact_mobile: string | null;
  status: string;
  last_update_date: string | null;
};

export type Connection = {
  id: string;
  instance_id: string;
  date_requested: string;
  company: string;
  contact_name: string | null;
  contact_linkedin_url: string | null;
  contact_mobile: string | null;
  status: string;
  last_update_date: string | null;
};

export type Update = {
  id: string;
  type: "job" | "connection";
  parent_id: string;
  date: string;
  description: string;
};

const INSTANCE_ID = "singleton";

function hashSecret(secret: string): string {
  return crypto.createHash("sha256").update(secret).digest("hex");
}

export async function createOrReplaceInstance(params: {
  name: string;
  email: string;
  secret: string;
}): Promise<Instance> {
  const supabase = getSupabaseClient();
  const secretHash = hashSecret(params.secret);

  const { error: deleteError } = await supabase
    .from("instances")
    .delete()
    .neq("id", "");

  if (deleteError) {
    throw deleteError;
  }

  const { data, error } = await supabase
    .from("instances")
    .insert({
      id: INSTANCE_ID,
      name: params.name,
      email: params.email,
      secret_hash: secretHash,
    })
    .select("id, name, email")
    .single();

  if (error) {
    throw error;
  }

  return data as Instance;
}

export async function getInstance(): Promise<Instance | null> {
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

export async function validateInstanceSecret(
  secret: string,
): Promise<Instance | null> {
  const supabase = getSupabaseClient();
  const secretHash = hashSecret(secret);
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

export async function updateInstance(params: {
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

export async function deleteInstanceCompletely(): Promise<void> {
  const supabase = getSupabaseClient();

  const { data: jobs, error: jobsError } = await supabase
    .from("jobs")
    .select("id")
    .eq("instance_id", INSTANCE_ID);
  if (jobsError) throw jobsError;

  const { data: connections, error: connectionsError } = await supabase
    .from("connections")
    .select("id")
    .eq("instance_id", INSTANCE_ID);
  if (connectionsError) throw connectionsError;

  const parentIds = [
    ...((jobs as Array<{ id: string }> | null | undefined)?.map(
      (job) => job.id,
    ) ?? []),
    ...((connections as Array<{ id: string }> | null | undefined)?.map(
      (connection) => connection.id,
    ) ?? []),
  ];

  if (parentIds.length > 0) {
    const { error: updatesError } = await supabase
      .from("updates")
      .delete()
      .in("parent_id", parentIds);
    if (updatesError) throw updatesError;
  }

  const { error: jobsDeleteError } = await supabase
    .from("jobs")
    .delete()
    .eq("instance_id", INSTANCE_ID);
  if (jobsDeleteError) throw jobsDeleteError;

  const { error: connectionsDeleteError } = await supabase
    .from("connections")
    .delete()
    .eq("instance_id", INSTANCE_ID);
  if (connectionsDeleteError) throw connectionsDeleteError;

  const { error: instanceDeleteError } = await supabase
    .from("instances")
    .delete()
    .eq("id", INSTANCE_ID);
  if (instanceDeleteError) throw instanceDeleteError;
}

export async function listJobs(): Promise<Job[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("instance_id", INSTANCE_ID)
    .order("date_applied", { ascending: true });

  if (error) {
    throw error;
  }

  return (data as Job[]) ?? [];
}

export async function getJobById(id: string): Promise<Job | null> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .eq("instance_id", INSTANCE_ID)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return (data as Job | null) ?? null;
}

export async function createJob(
  job: Omit<Job, "id" | "instance_id" | "last_update_date">,
): Promise<Job> {
  const supabase = getSupabaseClient();
  const id = crypto.randomUUID();

  const { data, error } = await supabase
    .from("jobs")
    .insert({
      id,
      instance_id: INSTANCE_ID,
      date_applied: job.date_applied,
      role: job.role,
      description: job.description,
      job_type: job.job_type,
      source: job.source,
      link: job.link,
      company: job.company,
      contact_name: job.contact_name,
      contact_email: job.contact_email,
      contact_mobile: job.contact_mobile,
      status: job.status,
      last_update_date: null,
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as Job;
}

export async function updateJob(
  id: string,
  updates: Partial<
    Omit<Job, "id" | "instance_id" | "last_update_date" | "date_applied">
  >,
): Promise<Job | null> {
  const current = await getJobById(id);
  if (!current) return null;

  const next = {
    ...current,
    ...updates,
  };

  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("jobs")
    .update({
      role: next.role,
      description: next.description,
      job_type: next.job_type,
      source: next.source,
      link: next.link,
      company: next.company,
      contact_name: next.contact_name,
      contact_email: next.contact_email,
      contact_mobile: next.contact_mobile,
      status: next.status,
    })
    .eq("id", id)
    .eq("instance_id", INSTANCE_ID)
    .select("*")
    .maybeSingle();

  if (error) {
    throw error;
  }

  return (data as Job | null) ?? null;
}

export async function deleteJob(id: string): Promise<void> {
  const supabase = getSupabaseClient();

  const { error: updatesError } = await supabase
    .from("updates")
    .delete()
    .eq("parent_id", id);
  if (updatesError) throw updatesError;

  const { error: jobError } = await supabase
    .from("jobs")
    .delete()
    .eq("id", id)
    .eq("instance_id", INSTANCE_ID);
  if (jobError) throw jobError;
}

export async function listConnections(): Promise<Connection[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("connections")
    .select("*")
    .eq("instance_id", INSTANCE_ID)
    .order("date_requested", { ascending: true });

  if (error) {
    throw error;
  }

  return (data as Connection[]) ?? [];
}

export async function getConnectionById(
  id: string,
): Promise<Connection | null> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("connections")
    .select("*")
    .eq("id", id)
    .eq("instance_id", INSTANCE_ID)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return (data as Connection | null) ?? null;
}

export async function createConnection(
  connection: Omit<Connection, "id" | "instance_id" | "last_update_date">,
): Promise<Connection> {
  const supabase = getSupabaseClient();
  const id = crypto.randomUUID();

  const { data, error } = await supabase
    .from("connections")
    .insert({
      id,
      instance_id: INSTANCE_ID,
      date_requested: connection.date_requested,
      company: connection.company,
      contact_name: connection.contact_name,
      contact_linkedin_url: connection.contact_linkedin_url,
      contact_mobile: connection.contact_mobile,
      status: connection.status,
      last_update_date: null,
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as Connection;
}

export async function updateConnection(
  id: string,
  updates: Partial<
    Omit<Connection, "id" | "instance_id" | "last_update_date" | "date_requested">
  >,
): Promise<Connection | null> {
  const current = await getConnectionById(id);
  if (!current) return null;

  const next = {
    ...current,
    ...updates,
  };

  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("connections")
    .update({
      company: next.company,
      contact_name: next.contact_name,
      contact_linkedin_url: next.contact_linkedin_url,
      contact_mobile: next.contact_mobile,
      status: next.status,
    })
    .eq("id", id)
    .eq("instance_id", INSTANCE_ID)
    .select("*")
    .maybeSingle();

  if (error) {
    throw error;
  }

  return (data as Connection | null) ?? null;
}

export async function deleteConnection(id: string): Promise<void> {
  const supabase = getSupabaseClient();

  const { error: updatesError } = await supabase
    .from("updates")
    .delete()
    .eq("parent_id", id);
  if (updatesError) throw updatesError;

  const { error: connectionError } = await supabase
    .from("connections")
    .delete()
    .eq("id", id)
    .eq("instance_id", INSTANCE_ID);
  if (connectionError) throw connectionError;
}

export async function listUpdatesForParent(
  parentId: string,
): Promise<Update[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("updates")
    .select("*")
    .eq("parent_id", parentId)
    .order("date", { ascending: false })
    .order("id", { ascending: false });

  if (error) {
    throw error;
  }

  return (data as Update[]) ?? [];
}

export async function createUpdate(params: {
  type: "job" | "connection";
  parentId: string;
  date: string;
  description: string;
}): Promise<Update> {
  const supabase = getSupabaseClient();
  const id = crypto.randomUUID();

  const { error: insertError } = await supabase.from("updates").insert({
    id,
    type: params.type,
    parent_id: params.parentId,
    date: params.date,
    description: params.description,
  });
  if (insertError) throw insertError;

  const dateForParent = params.date;

  if (params.type === "job") {
    const { error: jobError } = await supabase
      .from("jobs")
      .update({ last_update_date: dateForParent })
      .eq("id", params.parentId)
      .eq("instance_id", INSTANCE_ID);
    if (jobError) throw jobError;
  } else {
    const { error: connectionError } = await supabase
      .from("connections")
      .update({ last_update_date: dateForParent })
      .eq("id", params.parentId)
      .eq("instance_id", INSTANCE_ID);
    if (connectionError) throw connectionError;
  }

  return {
    id,
    type: params.type,
    parent_id: params.parentId,
    date: params.date,
    description: params.description,
  };
}

