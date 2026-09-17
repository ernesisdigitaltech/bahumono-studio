import { createClient } from "@/lib/supabase/server";

export async function searchMedia(query: string, filters: { type?: string; category?: string } = {}) {
  if (!query.trim()) {
    return { media: [], error: null };
  }

  const supabase = await createClient();

  // 1. Songs/videos whose title matches
  let titleQuery = supabase
    .from("media")
    .select("id, title, type, category, cover_path, artists(id, name)")
    .eq("status", "live")
    .ilike("title", `%${query}%`);

  if (filters.type) titleQuery = titleQuery.eq("type", filters.type);
  if (filters.category) titleQuery = titleQuery.eq("category", filters.category);

  const { data: titleMatches } = await titleQuery;

  // 2. Artists whose name matches
  const { data: matchingArtists } = await supabase
    .from("artists")
    .select("id")
    .ilike("name", `%${query}%`);

  const artistIds = (matchingArtists ?? []).map((a) => a.id);

  // 3. Songs/videos by any of those matching artists
  let byArtistQuery = supabase
    .from("media")
    .select("id, title, type, category, cover_path, artists(id, name)")
    .eq("status", "live")
    .in("artist_id", artistIds.length > 0 ? artistIds : ["00000000-0000-0000-0000-000000000000"]);

  if (filters.type) byArtistQuery = byArtistQuery.eq("type", filters.type);
  if (filters.category) byArtistQuery = byArtistQuery.eq("category", filters.category);

  const { data: artistMatches } = artistIds.length > 0 ? await byArtistQuery : { data: [] };

  // Merge both result sets, removing duplicates (a song could match both ways)
  const combined = [...(titleMatches ?? []), ...(artistMatches ?? [])];
  const unique = Array.from(new Map(combined.map((item) => [item.id, item])).values());

  return { media: unique, error: null };
}