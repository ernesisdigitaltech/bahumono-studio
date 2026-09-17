import { requireAdmin } from "@/lib/supabase/user";
import { createClient } from "@/lib/supabase/server";
import { updateMedia } from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";
import { BackButton } from "@/components/ui/BackButton";
import { PhotoUploadField } from "@/components/ui/PhotoUploadField";
import { MediaUploadField } from "@/components/ui/MediaUploadField";
import { DeleteMediaButton } from "@/components/admin/DeleteMediaButton";
import { notFound } from "next/navigation";

export default async function EditMediaPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const { error, success } = await searchParams;

  const supabase = await createClient();

  const { data: media } = await supabase
    .from("media")
    .select("*")
    .eq("id", id)
    .single();

  if (!media) {
    notFound();
  }

  const { data: artists } = await supabase
    .from("artists")
    .select("id, name")
    .order("name");

  return (
    <main className="p-6 flex flex-col gap-5 max-w-sm mx-auto">
      <BackButton />
      <h1 className="font-serif text-2xl">Edit media</h1>

      {error && (
        <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/30 rounded-xl px-4 py-3">
          {error}
        </div>
      )}
      {success && (
        <div className="text-sm text-teal bg-teal/10 border border-teal/30 rounded-xl px-4 py-3">
          {success}
        </div>
      )}

      <form action={updateMedia} className="flex flex-col gap-4">
        <input type="hidden" name="id" value={media.id} />

        <div>
          <label className="block text-xs text-dim mb-1.5">Media type</label>
          <select
            name="type"
            defaultValue={media.type}
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
            defaultValue={media.category}
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
            defaultValue={media.artist_id}
            required
            className="w-full bg-card border border-line rounded-xl px-4 py-3 text-sm"
          >
            {artists?.map((artist) => (
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
            defaultValue={media.title}
            required
            className="w-full bg-card border border-line rounded-xl px-4 py-3 text-sm"
          />
        </div>

        <MediaUploadField
          name="filePath"
          label="Media file"
          defaultValue={media.file_path}
        />

        <PhotoUploadField
          name="coverPath"
          label="Cover image"
          defaultValue={media.cover_path ?? ""}
        />

        <div>
          <label className="block text-xs text-dim mb-1.5">Release date</label>
          <input
            name="releaseDate"
            type="date"
            defaultValue={media.release_date ?? ""}
            className="w-full bg-card border border-line rounded-xl px-4 py-3 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs text-dim mb-1.5">Lyrics</label>
          <textarea
            name="lyrics"
            rows={5}
            defaultValue={media.lyrics ?? ""}
            className="w-full bg-card border border-line rounded-xl px-4 py-3 text-sm"
          />
        </div>

        <Button type="submit">Save changes</Button>
      </form>

      <DeleteMediaButton id={media.id} title={media.title} />
    </main>
  );
}