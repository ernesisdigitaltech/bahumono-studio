import { createClient } from "@/lib/supabase/server";
import { Cover } from "@/components/ui/Cover";
import { EmptyState } from "@/components/ui/EmptyState";
import { BackButton } from "@/components/ui/BackButton";
import Link from "next/link";

export default async function ArtistsPage() {
  const supabase = await createClient();
  const { data: artists } = await supabase
    .from("artists")
    .select("id, name, photo_url")
    .order("name");

  return (
    <main className="p-6 flex flex-col gap-5">
      <BackButton />
      <h1 className="font-serif text-2xl">Artists</h1>

      {!artists || artists.length === 0 ? (
        <EmptyState
          title="No artists yet"
          message="Check back once artists have been added."
        />
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {artists.map((artist) => (
            <Link
              key={artist.id}
              href={`/artists/${artist.id}`}
              className="flex flex-col items-center gap-2 text-center"
            >
              <Cover
                title={artist.name}
                src={artist.photo_url ?? undefined}
                className="w-full aspect-square rounded-full"
              />
              <div className="text-xs font-semibold truncate w-full">{artist.name}</div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}