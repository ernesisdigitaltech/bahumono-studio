import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { MediaCard } from "@/components/ui/MediaCard";
import { LogoutButton } from "@/components/ui/LogoutButton";

export default function Home() {
  return (
    <main className="p-6 flex flex-col gap-6">
      <h1 className="font-serif text-3xl">Bahumono Studio</h1>

      <div className="flex gap-3">
        <Button>Create account</Button>
        <Button variant="ghost">Log in</Button>
      </div>

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