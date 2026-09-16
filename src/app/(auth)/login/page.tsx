import { logIn } from "../actions";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="p-6 flex flex-col gap-5 max-w-sm mx-auto">
      <h1 className="font-serif text-2xl">Log in</h1>

      {error && (
        <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/30 rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      <form action={logIn} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs text-dim mb-1.5">Email address</label>
          <input
            name="email"
            type="email"
            required
            className="w-full bg-card border border-line rounded-xl px-4 py-3 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs text-dim mb-1.5">Password</label>
          <input
            name="password"
            type="password"
            required
            className="w-full bg-card border border-line rounded-xl px-4 py-3 text-sm"
          />
        </div>

        <Link href="/forgot-password" className="text-xs text-gold text-right">
          Forgot password?
        </Link>

        <Button type="submit">Log in</Button>
      </form>

      <p className="text-dim text-sm text-center">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-gold">
          Sign up
        </Link>
      </p>
    </main>
  );
}