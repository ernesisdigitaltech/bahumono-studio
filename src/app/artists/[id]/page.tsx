import { createClient } from "@/lib/supabase/server";
import { Cover } from "@/components/ui/Cover";
import { BackButton } from "@/components/ui/BackButton";
import { EmptyState } from "@/components/ui/EmptyState";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: artist } = await supabase
    .from("artists")
    .select("id, name, bio, photo_url")
    .eq("id", id)
    .single();

  if (!artist) {
    notFound();
  }

  const { data: songs } = await supabase
    .from("media")
    .select("id, title, type, category")
    .eq("artist_id", id)
    .eq("status", "live")
    .order("created_at", { ascending: false });

  return (
    <main className="flex flex-col">
      <div className="p-4">
        <BackButton />
      </div>

      <div className="px-6 flex flex-col items-center gap-3 pb-6">
        <Cover title={artist.name} src={artist.photo_url ?? undefined} className="w-24 h-24 rounded-full" />
        <h1 className="font-serif text-2xl text-center">{artist.name}</h1>
        {artist.bio && (
          <p className="text-dim text-sm text-center max-w-sm">{artist.bio}</p>
        )}
      </div>

      <div className="px-6 pb-6">
        <h2 className="font-serif text-lg mb-3">Songs</h2>

        {!songs || songs.length === 0 ? (
          <EmptyState
            title="No songs yet"
            message={`${artist.name} hasn't released anything here yet.`}
          />
        ) : (
          <div className="flex flex-col gap-1">
            {songs.map((song) => (
              <Link
                key={song.id}
                href={`/media/${song.id}`}
                className="flex items-center justify-between py-3 border-b border-line"
              >
                <div>
                  <div className="text-sm font-semibold">{song.title}</div>
                  <div className="text-xs text-dim capitalize">
                    {song.category} &middot; {song.type}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}