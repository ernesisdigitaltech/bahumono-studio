import { getCurrentUser } from "@/lib/supabase/user";
import { updateProfile } from "@/app/(auth)/actions";
import { LogoutButton } from "@/components/ui/LogoutButton";
import { Button } from "@/components/ui/Button";
import { redirect } from "next/navigation";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const { error, success } = await searchParams;
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="p-6 flex flex-col gap-6 max-w-sm mx-auto">
      <div className="flex flex-col items-center gap-3 pt-4">
        <div className="w-20 h-20 rounded-full bg-card2" />
        <h1 className="font-serif text-2xl">{user.fullName}</h1>
        <p className="text-dim text-sm">{user.email}</p>
        {user.isAdmin && (
          <span className="text-xs font-semibold bg-gold/15 text-gold px-3 py-1 rounded-full">
            Admin
          </span>
        )}
      </div>

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

      <form action={updateProfile} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs text-dim mb-1.5">Full name</label>
          <input
            name="fullName"
            defaultValue={user.fullName}
            required
            className="w-full bg-card border border-line rounded-xl px-4 py-3 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs text-dim mb-1.5">WhatsApp number</label>
          <input
            name="whatsapp"
            defaultValue={user.whatsapp ?? ""}
            className="w-full bg-card border border-line rounded-xl px-4 py-3 text-sm"
          />
        </div>

        <Button type="submit">Save changes</Button>
      </form>

      <LogoutButton />
    </main>
  );
}