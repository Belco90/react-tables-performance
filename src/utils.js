export const getMovieId = movie =>
  `${movie.title}-${movie.year}-${movie.director}-${movie.genre}-${movie.cast}`;
