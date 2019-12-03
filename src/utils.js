export const getMovieId = movie =>
  `${movie.title}-${movie.year}-${movie.director}-${movie.genre}-${movie.cast}`;

export const COLS_ORDER = [
  'title',
  'year',
  'genre',
  'director',
  'cast',
  'notes',
];
