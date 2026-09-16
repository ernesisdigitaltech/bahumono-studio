import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { MediaCard } from "@/components/ui/MediaCard";
import { getCurrentUser } from "@/lib/supabase/user";
import Link from "next/link";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <main className="p-6 flex flex-col gap-6">
      {user ? (
        <div>
          <div className="text-dim text-sm">Good to see you</div>
          <h1 className="font-serif text-2xl">{user.fullName}</h1>
        </div>
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

      <div className="flex gap-2">
        <Pill active>All</Pill>
        <Pill>Audio</Pill>
        <Pill>Video</Pill>
        <Pill>Gospel</Pill>
      </div>

      <div>
        <h2 className="font-serif text-lg mb-3">Recently added</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          <MediaCard size="sm" title="Ekpat Mbe Ison" artist="Bassey Okon" />
          <MediaCard size="sm" title="Home Again" artist="Various Artists" />
          <MediaCard size="sm" title="Random Mix, Vol. 4" artist="Studio Selects" />
        </div>
      </div>

      <div>
        <h2 className="font-serif text-lg mb-3">Popular this week</h2>
        <div className="grid grid-cols-2 gap-4">
          <MediaCard title="Ke Obot Enyong" artist="Grace Etim" />
          <MediaCard title="Long Drive Mix" artist="Studio Selects" />
        </div>
      </div>
    </main>
  );
}