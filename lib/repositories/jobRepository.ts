import { getSupabaseClient } from "../supabaseClient";
import { Job } from "../types";
import { INSTANCE_ID } from "./instanceRepository";

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

export async function fetchJobIds(): Promise<string[]> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from("jobs")
        .select("id")
        .eq("instance_id", INSTANCE_ID);

    if (error) {
        throw error;
    }
    return (data?.map((j) => j.id) as string[]) ?? [];
}

export async function insertJob(
    job: Omit<Job, "instance_id" | "last_update_date">,
): Promise<Job> {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
        .from("jobs")
        .insert({
            id: job.id,
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
    updates: Partial<Omit<Job, "id" | "instance_id" | "last_update_date" | "date_applied">>,
): Promise<Job | null> {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
        .from("jobs")
        .update(updates)
        .eq("id", id)
        .eq("instance_id", INSTANCE_ID)
        .select("*")
        .maybeSingle();

    if (error) {
        throw error;
    }
    return (data as Job | null) ?? null;
}

export async function updateJobLastUpdateDate(id: string, date: string): Promise<void> {
    const supabase = getSupabaseClient();
    const { error } = await supabase
        .from("jobs")
        .update({ last_update_date: date })
        .eq("id", id)
        .eq("instance_id", INSTANCE_ID);

    if (error) {
        throw error;
    }
}

export async function deleteJobRecord(id: string): Promise<void> {
    const supabase = getSupabaseClient();
    const { error } = await supabase
        .from("jobs")
        .delete()
        .eq("id", id)
        .eq("instance_id", INSTANCE_ID);

    if (error) {
        throw error;
    }
}

export async function deleteAllJobsForInstance(): Promise<void> {
    const supabase = getSupabaseClient();
    const { error } = await supabase
        .from("jobs")
        .delete()
        .eq("instance_id", INSTANCE_ID);

    if (error) {
        throw error;
    }
}
