import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("routing begins");

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const type = searchParams.get("type");
  const tmdb = process.env.TMDBchabi;
  const res = await fetch(
    `https://api.themoviedb.org/3/${type}/${query}?api_key=${tmdb}`
  );
  const movieData = await res.json();

  return NextResponse.json({ movieData });
}
