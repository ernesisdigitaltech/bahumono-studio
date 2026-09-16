"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signUp(formData: FormData) {
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const whatsapp = formData.get("whatsapp") as string;
  const agreed = formData.get("agreed");

  if (!agreed) {
    redirect("/signup?error=You must agree to the Terms and Privacy Policy");
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        whatsapp_number: whatsapp,
      },
    },
  });

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/signup/check-email");
}