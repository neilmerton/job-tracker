import { getSupabaseClient } from "../supabaseClient";
import { Update } from "../types";

export async function listUpdatesForParent(parentId: string): Promise<Update[]> {
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

export async function insertUpdate(update: Update): Promise<Update> {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
        .from("updates")
        .insert(update)
        .select("*")
        .single();

    if (error) {
        throw error;
    }
    return data as Update;
}

export async function deleteUpdatesForParent(parentId: string): Promise<void> {
    const supabase = getSupabaseClient();
    const { error } = await supabase
        .from("updates")
        .delete()
        .eq("parent_id", parentId);

    if (error) {
        throw error;
    }
}

export async function deleteUpdatesForParents(parentIds: string[]): Promise<void> {
    if (parentIds.length === 0) return;
    const supabase = getSupabaseClient();
    const { error } = await supabase
        .from("updates")
        .delete()
        .in("parent_id", parentIds);

    if (error) {
        throw error;
    }
}
