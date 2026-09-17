import { createClient } from "@/lib/supabase/server";

export type MediaFilters = {
  type?: "audio" | "video";
  category?: "gospel" | "random";
  limit?: number;
  offset?: number;
  sort?: "recent" | "title";
};

export async function getMedia(filters: MediaFilters = {}) {
  const supabase = await createClient();

  let query = supabase
    .from("media")
    .select("id, title, type, category, cover_path, created_at, artists(id, name)")
    .eq("status", "live");

  if (filters.type) {
    query = query.eq("type", filters.type);
  }
  if (filters.category) {
    query = query.eq("category", filters.category);
  }

  if (filters.sort === "title") {
    query = query.order("title", { ascending: true });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  const limit = filters.limit ?? 20;
  const offset = filters.offset ?? 0;
  query = query.range(offset, offset + limit - 1);

  const { data, error } = await query;

  return { data: data ?? [], error };
}