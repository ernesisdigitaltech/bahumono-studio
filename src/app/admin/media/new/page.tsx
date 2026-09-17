import { requireAdmin } from "@/lib/supabase/user";
import { createClient } from "@/lib/supabase/server";
import { createMedia } from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";
import { BackButton } from "@/components/ui/BackButton";
import { PhotoUploadField } from "@/components/ui/PhotoUploadField";
import { MediaUploadField } from "@/components/ui/MediaUploadField";

export default async function NewMediaPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  await requireAdmin();
  const { error } = await searchParams;

  const supabase = await createClient();
  const { data: artists } = await supabase
    .from("artists")
    .select("id, name")
    .order("name");

  return (
    <main className="p-6 flex flex-col gap-5 max-w-sm mx-auto">
      <BackButton />
      <h1 className="font-serif text-2xl">Upload media</h1>

      {error && (
        <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/30 rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      {!artists || artists.length === 0 ? (
        <p className="text-dim text-sm">
          Create at least one artist before uploading media.
        </p>
      ) : (
        <form action={createMedia} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs text-dim mb-1.5">Media type</label>
            <select
              name="type"
              required
              className="w-full bg-card border border-line rounded-xl px-4 py-3 text-sm"
            >
              <option value="audio">Audio</option>
              <option value="video">Video</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-dim mb-1.5">Category</label>
            <select
              name="category"
              required
              className="w-full bg-card border border-line rounded-xl px-4 py-3 text-sm"
            >
              <option value="gospel">Gospel</option>
              <option value="random">Random</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-dim mb-1.5">Artist</label>
            <select
              name="artistId"
              required
              className="w-full bg-card border border-line rounded-xl px-4 py-3 text-sm"
            >
              {artists.map((artist) => (
                <option key={artist.id} value={artist.id}>
                  {artist.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-dim mb-1.5">Title</label>
            <input
              name="title"
              required
              className="w-full bg-card border border-line rounded-xl px-4 py-3 text-sm"
            />
          </div>

          <MediaUploadField name="filePath" label="Media file (audio or video)" />

          <PhotoUploadField name="coverPath" label="Cover image" />

          <div>
            <label className="block text-xs text-dim mb-1.5">Release date</label>
            <input
              name="releaseDate"
              type="date"
              className="w-full bg-card border border-line rounded-xl px-4 py-3 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs text-dim mb-1.5">
              Lyrics <span className="text-dim">(optional)</span>
            </label>
            <textarea
              name="lyrics"
              rows={5}
              className="w-full bg-card border border-line rounded-xl px-4 py-3 text-sm"
            />
          </div>

          <Button type="submit">Upload</Button>
        </form>
      )}
    </main>
  );
}