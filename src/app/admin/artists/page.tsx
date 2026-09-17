import { requireAdmin } from "@/lib/supabase/user";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/Button";
import { BackButton } from "@/components/ui/BackButton";
import { EmptyState } from "@/components/ui/EmptyState";
import { Cover } from "@/components/ui/Cover";
import Link from "next/link";

export default async function AdminArtistsPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  await requireAdmin();
  const { success } = await searchParams;

  const supabase = await createClient();
  const { data: artists } = await supabase
    .from("artists")
    .select("id, name, bio, photo_url")
    .order("created_at", { ascending: false });

  return (
    <main className="p-6 flex flex-col gap-5 max-w-md mx-auto">
      <BackButton />

      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl">Artists</h1>
        <Link href="/admin/artists/new">
          <Button>+ New</Button>
        </Link>
      </div>

      {success && (
        <div className="text-sm text-teal bg-teal/10 border border-teal/30 rounded-xl px-4 py-3">
          {success}
        </div>
      )}

      {!artists || artists.length === 0 ? (
        <EmptyState
          title="No artists yet"
          message="Create your first artist to get started."
        />
      ) : (
        <div className="flex flex-col gap-3">
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="flex items-center gap-3 bg-card border border-line rounded-xl px-4 py-3"
            >
              <Cover title={artist.name} src={artist.photo_url ?? undefined} className="w-12 h-12 rounded-full" />
              <Link href={`/admin/artists/${artist.id}`} className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate">{artist.name}</div>
                {artist.bio && (
                  <div className="text-xs text-dim truncate">{artist.bio}</div>
                )}
              </Link>
              <Link href={`/artists/${artist.id}`} className="text-xs text-gold flex-shrink-0">
                View
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}