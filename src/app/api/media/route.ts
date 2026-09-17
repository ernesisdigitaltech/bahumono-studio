import { getMedia } from "@/lib/media";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const type = searchParams.get("type") as "audio" | "video" | undefined;
  const category = searchParams.get("category") as "gospel" | "random" | undefined;
  const offset = Number(searchParams.get("offset") ?? 0);

  const { data } = await getMedia({
    type: type ?? undefined,
    category: category ?? undefined,
    offset,
    limit: 30,
  });

  return NextResponse.json(data);
}