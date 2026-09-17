import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { MediaCard } from "@/components/ui/MediaCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { getCurrentUser } from "@/lib/supabase/user";
import { getMedia } from "@/lib/media";
import Link from "next/link";

export default async function Home() {
  const user = await getCurrentUser();
  const { data: recent } = await getMedia({ limit: 8 });

  return (
    <main className="p-6 flex flex-col gap-6">
      {user ? (
        <Link
          href="/profile"
          className="flex items-center justify-between bg-card border border-line rounded-2xl px-4 py-3"
        >
          <div>
            <div className="text-dim text-sm">Good to see you</div>
            <h1 className="font-serif text-2xl">{user.fullName}</h1>
          </div>
        </Link>
      ) : (
        <>
          <h1 className="font-serif text-3xl">Bahumono Studio</h1>
          <div className="flex gap-3">
            <Link href="/signup">
              <Button>Create account</Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
          </div>
        </>
      )}

      <div className="flex gap-2 overflow-x-auto pb-1">
        <Link href="/explore"><Pill active>All</Pill></Link>
        <Link href="/explore?type=audio"><Pill>Audio</Pill></Link>
        <Link href="/explore?type=video"><Pill>Video</Pill></Link>
        <Link href="/explore?category=gospel"><Pill>Gospel</Pill></Link>
        <Link href="/explore?category=random"><Pill>Random</Pill></Link>
        <Link href="/artists"><Pill>Artists</Pill></Link>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-serif text-lg">Recently added</h2>
          <Link href="/explore" className="text-xs text-gold">See all</Link>
        </div>

        {recent.length === 0 ? (
          <EmptyState
            title="Nothing here yet"
            message="Uploaded music and videos will show up here."
          />
        ) : (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {recent.map((item) => (
              <MediaCard
                key={item.id}
                size="sm"
                title={item.title}
                artist={(item.artists as unknown as { name: string } | null)?.name ?? "Unknown"}
                coverSrc={item.cover_path ?? undefined}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}