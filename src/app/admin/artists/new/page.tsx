import { requireAdmin } from "@/lib/supabase/user";
import { createArtist } from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";
import { BackButton } from "@/components/ui/BackButton";
import { PhotoUploadField } from "@/components/ui/PhotoUploadField";

export default async function NewArtistPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  await requireAdmin();
  const { error } = await searchParams;

  return (
    <main className="p-6 flex flex-col gap-5 max-w-sm mx-auto">
      <BackButton />
      <h1 className="font-serif text-2xl">Create artist</h1>

      {error && (
        <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/30 rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      <form action={createArtist} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs text-dim mb-1.5">Artist name</label>
          <input
            name="name"
            required
            className="w-full bg-card border border-line rounded-xl px-4 py-3 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs text-dim mb-1.5">Biography</label>
          <textarea
            name="bio"
            rows={4}
            className="w-full bg-card border border-line rounded-xl px-4 py-3 text-sm"
          />
        </div>

        <PhotoUploadField name="photoUrl" label="Artist photo" />

        <Button type="submit">Create artist</Button>
      </form>
    </main>
  );
}