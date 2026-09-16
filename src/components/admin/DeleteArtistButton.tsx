"use client";

import { deleteArtist } from "@/app/admin/actions";

export function DeleteArtistButton({ id, name }: { id: string; name: string }) {
  return (
    <form
      action={deleteArtist}
      onSubmit={(e) => {
        if (!confirm(`Delete ${name}? This also deletes all of their songs and videos.`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-sm text-red-400 hover:text-red-300 w-full text-center py-2"
      >
        Delete artist
      </button>
    </form>
  );
}