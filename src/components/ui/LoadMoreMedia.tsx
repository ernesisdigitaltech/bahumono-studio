"use client";

import { useState, useTransition } from "react";
import { MediaCard } from "@/components/ui/MediaCard";
import { Button } from "@/components/ui/Button";

type MediaItem = {
  id: string;
  title: string;
  cover_path: string | null;
  artists: { name: string } | null;
};

export function LoadMoreMedia({
  initialItems,
  type,
  category,
}: {
  initialItems: MediaItem[];
  type?: string;
  category?: string;
}) {
  const [items, setItems] = useState(initialItems);
  const [hasMore, setHasMore] = useState(initialItems.length === 30);
  const [isPending, startTransition] = useTransition();

  function loadMore() {
    startTransition(async () => {
      const params = new URLSearchParams();
      if (type) params.set("type", type);
      if (category) params.set("category", category);
      params.set("offset", String(items.length));

      const res = await fetch(`/api/media?${params.toString()}`);
      const more: MediaItem[] = await res.json();

      setItems((prev) => [...prev, ...more]);
      setHasMore(more.length === 30);
    });
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <MediaCard
            key={item.id}
            title={item.title}
            artist={item.artists?.name ?? "Unknown"}
            coverSrc={item.cover_path ?? undefined}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-4">
          <Button variant="ghost" onClick={loadMore} disabled={isPending}>
            {isPending ? "Loading..." : "Load more"}
          </Button>
        </div>
      )}
    </>
  );
}