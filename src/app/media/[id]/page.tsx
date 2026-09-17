import { createClient } from "@/lib/supabase/server";
import { Cover } from "@/components/ui/Cover";
import { PlayButton } from "@/components/ui/PlayButton";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { VolumeControl } from "@/components/ui/VolumeControl";
import { BackButton } from "@/components/ui/BackButton";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function MediaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: media } = await supabase
    .from("media")
    .select("id, title, type, category, file_path, cover_path, lyrics, artists(id, name)")
    .eq("id", id)
    .eq("status", "live")
    .single();

  if (!media) {
    notFound();
  }

  const artist = media.artists as unknown as { id: string; name: string } | null;

  return (
    <main className="p-6 flex flex-col gap-6 max-w-sm mx-auto">
      <BackButton />

      <Cover
        title={media.title}
        src={media.cover_path ?? undefined}
        className="w-full aspect-square"
      />

      <div>
        <h1 className="font-serif text-xl truncate">{media.title}</h1>
        {artist && (
          <Link href={`/artists/${artist.id}`} className="text-dim text-sm">
            {artist.name}
          </Link>
        )}
      </div>

      <ProgressBar />

      <div className="flex items-center justify-between">
        <VolumeControl />
        <PlayButton
          track={{
            id: media.id,
            title: media.title,
            artistName: artist?.name ?? "Unknown",
            fileUrl: media.file_path,
            coverUrl: media.cover_path ?? undefined,
            type: media.type as "audio" | "video",
          }}
        />
        <div style={{ width: 76 }} />
      </div>

      <div className="text-xs text-dim capitalize">
        {media.category} &middot; {media.type}
      </div>

      {media.lyrics && (
        <div>
          <h2 className="font-serif text-lg mb-2">Lyrics</h2>
          <p className="text-sm text-dim whitespace-pre-line leading-relaxed">
            {media.lyrics}
          </p>
        </div>
      )}
    </main>
  );
}