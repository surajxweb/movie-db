const genres = {
  genres: [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
  ],
};

type GenreColors = {
  [key: number]: string;
};

export const genreAndColors: GenreColors = {
  28: "cornflowerblue",
  12: "yellowgreen",
  16: "violet",
  35: "yellow",
  80: "peru",
  99: "palevioletred",
  18: "seagreen",
  10751: "lawngreen",
  14: "pink",
  36: "gold",
  27: "darkorchid",
  10402: "orange",
  9648: "yellow",
  10749: "red",
  878: "darkorange",
  10770: "tan",
  53: "aqua",
  10752: "grey",
  37: "brown",
};
