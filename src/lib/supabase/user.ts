import { createClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, whatsapp_number, avatar_url")
    .eq("id", user.id)
    .single();

  const { data: roleRow } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "admin")
    .maybeSingle();

  return {
    id: user.id,
    email: user.email,
    fullName: profile?.full_name ?? "User",
    whatsapp: profile?.whatsapp_number ?? null,
    avatarUrl: profile?.avatar_url ?? null,
    isAdmin: !!roleRow,
  };
}