import { requestPasswordReset } from "../actions";
import { Button } from "@/components/ui/Button";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="p-6 flex flex-col gap-5 max-w-sm mx-auto">
      <h1 className="font-serif text-2xl">Reset your password</h1>
      <p className="text-dim text-sm">
        Enter your email and we&apos;ll send you a reset link.
      </p>

      {error && (
        <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/30 rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      <form action={requestPasswordReset} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs text-dim mb-1.5">Email address</label>
          <input
            name="email"
            type="email"
            required
            className="w-full bg-card border border-line rounded-xl px-4 py-3 text-sm"
          />
        </div>
        <Button type="submit">Send reset link</Button>
      </form>
    </main>
  );
}