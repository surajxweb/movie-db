import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tmdbid = searchParams.get("id");
  const actorResponse = await fetch(
    `https://api.themoviedb.org/3/person/${tmdbid}?api_key=d308de6f3b996ae3b334cbb6527cffc7&append_to_response=combined_credits,external_ids`
  );
  const actorData = await actorResponse.json();

  return NextResponse.json({ actorData });
}
