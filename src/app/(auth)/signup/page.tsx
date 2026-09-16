import { signUp } from "../actions";
import { Button } from "@/components/ui/Button";

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="p-6 flex flex-col gap-5 max-w-sm mx-auto">
      <h1 className="font-serif text-2xl">Create your account</h1>
      <p className="text-dim text-sm">Takes about a minute.</p>

      {error && (
        <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/30 rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      <form action={signUp} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs text-dim mb-1.5">Full name</label>
          <input
            name="fullName"
            required
            className="w-full bg-card border border-line rounded-xl px-4 py-3 text-sm"
          />
        </div>

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
          <label className="block text-xs text-dim mb-1.5">WhatsApp number</label>
          <input
            name="whatsapp"
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
            minLength={6}
            className="w-full bg-card border border-line rounded-xl px-4 py-3 text-sm"
          />
        </div>

        <label className="flex items-start gap-2 text-xs text-dim">
          <input name="agreed" type="checkbox" required className="mt-0.5" />
          <span>I agree to the Terms &amp; Conditions and Privacy Policy.</span>
        </label>

        <Button type="submit">Create account</Button>
      </form>
    </main>
  );
}