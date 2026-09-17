import { requireAdmin } from "@/lib/supabase/user";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/Button";
import { BackButton } from "@/components/ui/BackButton";
import { EmptyState } from "@/components/ui/EmptyState";
import { Cover } from "@/components/ui/Cover";
import Link from "next/link";

export default async function AdminMediaPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  await requireAdmin();
  const { success } = await searchParams;

  const supabase = await createClient();
  const { data: media } = await supabase
    .from("media")
    .select("id, title, type, category, cover_path, status, artists(name)")
    .order("created_at", { ascending: false });

  return (
    <main className="p-6 flex flex-col gap-5 max-w-md mx-auto">
      <BackButton />

      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl">Media</h1>
        <Link href="/admin/media/new">
          <Button>+ Upload</Button>
        </Link>
      </div>

      {success && (
        <div className="text-sm text-teal bg-teal/10 border border-teal/30 rounded-xl px-4 py-3">
          {success}
        </div>
      )}

      {!media || media.length === 0 ? (
        <EmptyState
          title="No media yet"
          message="Upload your first song or video to get started."
        />
      ) : (
        <div className="flex flex-col gap-3">
          {media.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 bg-card border border-line rounded-xl px-4 py-3"
            >
              <Cover
                title={item.title}
                src={item.cover_path ?? undefined}
                className="w-12 h-12 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate">{item.title}</div>
                <div className="text-xs text-dim truncate capitalize">
                  {(item.artists as unknown as { name: string } | null)?.name ?? "Unknown artist"}
                  {" · "}
                  {item.type} · {item.category}
                </div>
              </div>
              <span
                className={`text-[10px] font-semibold px-2 py-1 rounded-full flex-shrink-0 ${
                  item.status === "live"
                    ? "bg-teal/15 text-teal"
                    : "bg-gold/15 text-gold"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}