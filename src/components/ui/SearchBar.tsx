"use client";

import { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { MediaCard } from "@/components/ui/MediaCard";
import { Pill } from "@/components/ui/Pill";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";

type MediaItem = {
  id: string;
  title: string;
  cover_path: string | null;
  artists: { name: string } | null;
};

const filters = [
  { label: "All", type: undefined, category: undefined },
  { label: "Audio", type: "audio", category: undefined },
  { label: "Video", type: "video", category: undefined },
  { label: "Gospel", type: undefined, category: "gospel" },
  { label: "Random", type: undefined, category: "random" },
];

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState(0);
  const [results, setResults] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!query.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }

    setLoading(true);

    // Wait 400ms after the last keystroke before actually searching —
    // stops firing a request on every single letter typed.
    debounceRef.current = setTimeout(async () => {
      const params = new URLSearchParams({ q: query });
      const filter = filters[activeFilter];
      if (filter.type) params.set("type", filter.type);
      if (filter.category) params.set("category", filter.category);

      const res = await fetch(`/api/search?${params.toString()}`);
      const data: MediaItem[] = await res.json();

      setResults(data);
      setLoading(false);
      setSearched(true);
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, activeFilter]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-dim" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search songs, videos, artists..."
          className="w-full bg-card border border-line rounded-full pl-11 pr-10 py-3 text-sm"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-dim"
            type="button"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map((filter, index) => (
          <button key={filter.label} onClick={() => setActiveFilter(index)} type="button">
            <Pill active={activeFilter === index}>{filter.label}</Pill>
          </button>
        ))}
      </div>

      {loading && (
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="w-full aspect-square" />
          <Skeleton className="w-full aspect-square" />
        </div>
      )}

      {!loading && searched && results.length === 0 && (
        <EmptyState
          title="No results"
          message={`Nothing matched "${query}". Try a different search.`}
        />
      )}

      {!loading && results.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {results.map((item) => (
            <MediaCard
              key={item.id}
              title={item.title}
              artist={item.artists?.name ?? "Unknown"}
              coverSrc={item.cover_path ?? undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}