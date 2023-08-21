import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const category = searchParams.get("category");
  const res = await fetch(
    `https://api.themoviedb.org/3/search/${category}?api_key=d308de6f3b996ae3b334cbb6527cffc7&query=${query}`
  );
  const movieData = await res.json();

  return NextResponse.json({ movieData });
}
