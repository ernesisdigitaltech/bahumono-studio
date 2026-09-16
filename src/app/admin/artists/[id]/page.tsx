import { requireAdmin } from "@/lib/supabase/user";
import { createClient } from "@/lib/supabase/server";
import { updateArtist } from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";
import { BackButton } from "@/components/ui/BackButton";
import { DeleteArtistButton } from "@/components/admin/DeleteArtistButton";
import { notFound } from "next/navigation";

export default async function EditArtistPage({
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
  const { data: artist } = await supabase
    .from("artists")
    .select("id, name, bio, photo_url")
    .eq("id", id)
    .single();

  if (!artist) {
    notFound();
  }

  return (
    <main className="p-6 flex flex-col gap-5 max-w-sm mx-auto">
      <BackButton />
      <h1 className="font-serif text-2xl">Edit artist</h1>

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

      <form action={updateArtist} className="flex flex-col gap-4">
        <input type="hidden" name="id" value={artist.id} />

        <div>
          <label className="block text-xs text-dim mb-1.5">Artist name</label>
          <input
            name="name"
            defaultValue={artist.name}
            required
            className="w-full bg-card border border-line rounded-xl px-4 py-3 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs text-dim mb-1.5">Biography</label>
          <textarea
            name="bio"
            rows={4}
            defaultValue={artist.bio ?? ""}
            className="w-full bg-card border border-line rounded-xl px-4 py-3 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs text-dim mb-1.5">Photo URL</label>
          <input
            name="photoUrl"
            defaultValue={artist.photo_url ?? ""}
            className="w-full bg-card border border-line rounded-xl px-4 py-3 text-sm"
          />
        </div>

        <Button type="submit">Save changes</Button>
      </form>

      <DeleteArtistButton id={artist.id} name={artist.name} />
    </main>
  );
}