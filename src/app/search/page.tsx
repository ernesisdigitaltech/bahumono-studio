import { SearchBar } from "@/components/ui/SearchBar";
import { BackButton } from "@/components/ui/BackButton";

export default function SearchPage() {
  return (
    <main className="p-6 flex flex-col gap-5">
      <BackButton />
      <h1 className="font-serif text-2xl">Search</h1>
      <SearchBar />
    </main>
  );
}