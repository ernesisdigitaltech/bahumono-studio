"use client";

import { deleteMedia } from "@/app/admin/actions";

export function DeleteMediaButton({ id, title }: { id: string; title: string }) {
  return (
    <form
      action={deleteMedia}
      onSubmit={(e) => {
        if (!confirm(`Delete "${title}"? This cannot be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-sm text-red-400 hover:text-red-300 w-full text-center py-2"
      >
        Delete media
      </button>
    </form>
  );
}