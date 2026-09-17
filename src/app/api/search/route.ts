import { searchMedia } from "@/lib/search";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const type = searchParams.get("type") ?? undefined;
  const category = searchParams.get("category") ?? undefined;

  const { media } = await searchMedia(q, { type, category });

  return NextResponse.json(media);
}