import { top100DB } from "@/resources/top100DB";

export async function generateStaticParams() {
  const url = "https://imdb-top-100-movies.p.rapidapi.com/";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "8e1c4ac21emshff43004a5fdfdfbp1ed383jsn44faf3e89dcb",
      "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
    },
  };
  const movies = await fetch(url, options).then((res) => res.json());

  return movies.map((movie: { id: string }) => ({
    slug: movie.id,
  }));
}

export default function Page({ params }: { params: { id: string } }) {
  return <div>My Post: {params.id}</div>;
}
