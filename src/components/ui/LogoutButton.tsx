import { logOut } from "@/app/(auth)/actions";

export function LogoutButton() {
  return (
    <form action={logOut}>
      <button className="text-sm text-dim hover:text-text" type="submit">
        Log out
      </button>
    </form>
  );
}