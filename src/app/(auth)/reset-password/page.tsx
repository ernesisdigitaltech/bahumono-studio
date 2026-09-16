import { resetPassword } from "../actions";
import { Button } from "@/components/ui/Button";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="p-6 flex flex-col gap-5 max-w-sm mx-auto">
      <h1 className="font-serif text-2xl">Set a new password</h1>

      {error && (
        <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/30 rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      <form action={resetPassword} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs text-dim mb-1.5">New password</label>
          <input
            name="password"
            type="password"
            required
            minLength={6}
            className="w-full bg-card border border-line rounded-xl px-4 py-3 text-sm"
          />
        </div>
        <Button type="submit">Update password</Button>
      </form>
    </main>
  );
}