import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const category = searchParams.get("category");
  const res = await fetch(
    `https://api.themoviedb.org/3/search/${category}?api_key=${process.env.TMDBchabi}&query=${query}`
  );
  const movieData = await res.json();

  return NextResponse.json({ movieData });
}
