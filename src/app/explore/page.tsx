import { getMedia } from "@/lib/media";
import { MediaCard } from "@/components/ui/MediaCard";
import { Pill } from "@/components/ui/Pill";
import { EmptyState } from "@/components/ui/EmptyState";
import { BackButton } from "@/components/ui/BackButton";
import Link from "next/link";

type SearchParams = {
  type?: "audio" | "video";
  category?: "gospel" | "random";
};

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { data: media } = await getMedia({
    type: params.type,
    category: params.category,
    limit: 30,
  });

  const isActive = (type?: string, category?: string) =>
    params.type === type && params.category === category;

  return (
    <main className="p-6 flex flex-col gap-5">
      <BackButton />
      <h1 className="font-serif text-2xl">Explore</h1>

      <div className="flex gap-2 overflow-x-auto pb-1">
        <Link href="/explore">
          <Pill active={!params.type && !params.category}>All</Pill>
        </Link>
        <Link href="/explore?type=audio">
          <Pill active={isActive("audio", undefined)}>Audio</Pill>
        </Link>
        <Link href="/explore?type=video">
          <Pill active={isActive("video", undefined)}>Video</Pill>
        </Link>
        <Link href="/explore?category=gospel">
          <Pill active={isActive(undefined, "gospel")}>Gospel</Pill>
        </Link>
        <Link href="/explore?category=random">
          <Pill active={isActive(undefined, "random")}>Random</Pill>
        </Link>
      </div>

      {media.length === 0 ? (
        <EmptyState
          title="Nothing here yet"
          message="Try a different filter, or check back once more media is uploaded."
        />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {media.map((item) => (
            <MediaCard
              key={item.id}
              title={item.title}
              artist={(item.artists as unknown as { name: string } | null)?.name ?? "Unknown"}
              coverSrc={item.cover_path ?? undefined}
            />
          ))}
        </div>
      )}
    </main>
  );
}