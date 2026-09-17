"use server";

import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/user";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createArtist(formData: FormData) {
  await requireAdmin();

  const name = formData.get("name") as string;
  const bio = formData.get("bio") as string;
  const photoUrl = formData.get("photoUrl") as string;

  const supabase = await createClient();

  const { error } = await supabase.from("artists").insert({
    name,
    bio: bio || null,
    photo_url: photoUrl || null,
  });

  if (error) {
    redirect(`/admin/artists/new?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/artists");
  redirect("/admin/artists?success=Artist created");
}

export async function updateArtist(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const bio = formData.get("bio") as string;
  const photoUrl = formData.get("photoUrl") as string;

  const supabase = await createClient();

  const { error } = await supabase
    .from("artists")
    .update({ name, bio: bio || null, photo_url: photoUrl || null })
    .eq("id", id);

  if (error) {
    redirect(`/admin/artists/${id}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/artists");
  revalidatePath(`/admin/artists/${id}`);
  redirect(`/admin/artists/${id}?success=Artist updated`);
}

export async function deleteArtist(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id") as string;
  const supabase = await createClient();

  const { error } = await supabase.from("artists").delete().eq("id", id);

  if (error) {
    redirect(`/admin/artists/${id}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/artists");
  redirect("/admin/artists?success=Artist deleted");
}

export async function createMedia(formData: FormData) {
  await requireAdmin();

  const title = formData.get("title") as string;
  const type = formData.get("type") as string;
  const category = formData.get("category") as string;
  const artistId = formData.get("artistId") as string;
  const filePath = formData.get("filePath") as string;
  const coverPath = formData.get("coverPath") as string;
  const releaseDate = formData.get("releaseDate") as string;
  const lyrics = formData.get("lyrics") as string;

  if (!filePath) {
    redirect(`/admin/media/new?error=${encodeURIComponent("Please upload a media file before submitting.")}`);
  }

  const supabase = await createClient();

  const { error } = await supabase.from("media").insert({
    title,
    type,
    category,
    artist_id: artistId,
    file_path: filePath,
    cover_path: coverPath || null,
    release_date: releaseDate || null,
    lyrics: lyrics || null,
    status: "live",
  });

  if (error) {
    redirect(`/admin/media/new?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/media");
  redirect("/admin/media?success=Media uploaded");
}