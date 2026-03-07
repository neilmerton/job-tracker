import { getSupabaseClient } from "../supabaseClient";
import { Connection } from "../types";
import { INSTANCE_ID } from "./instanceRepository";

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

export async function getConnectionById(id: string): Promise<Connection | null> {
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

export async function fetchConnectionIds(): Promise<string[]> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from("connections")
        .select("id")
        .eq("instance_id", INSTANCE_ID);

    if (error) {
        throw error;
    }
    return (data?.map((c) => c.id) as string[]) ?? [];
}

export async function insertConnection(
    connection: Omit<Connection, "instance_id" | "last_update_date">,
): Promise<Connection> {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
        .from("connections")
        .insert({
            id: connection.id,
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
    updates: Partial<Omit<Connection, "id" | "instance_id" | "last_update_date" | "date_requested">>,
): Promise<Connection | null> {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
        .from("connections")
        .update(updates)
        .eq("id", id)
        .eq("instance_id", INSTANCE_ID)
        .select("*")
        .maybeSingle();

    if (error) {
        throw error;
    }
    return (data as Connection | null) ?? null;
}

export async function updateConnectionLastUpdateDate(id: string, date: string): Promise<void> {
    const supabase = getSupabaseClient();
    const { error } = await supabase
        .from("connections")
        .update({ last_update_date: date })
        .eq("id", id)
        .eq("instance_id", INSTANCE_ID);

    if (error) {
        throw error;
    }
}

export async function deleteConnectionRecord(id: string): Promise<void> {
    const supabase = getSupabaseClient();
    const { error } = await supabase
        .from("connections")
        .delete()
        .eq("id", id)
        .eq("instance_id", INSTANCE_ID);

    if (error) {
        throw error;
    }
}

export async function deleteAllConnectionsForInstance(): Promise<void> {
    const supabase = getSupabaseClient();
    const { error } = await supabase
        .from("connections")
        .delete()
        .eq("instance_id", INSTANCE_ID);

    if (error) {
        throw error;
    }
}
