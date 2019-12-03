import React from 'react';
import MovieRow from './MovieRow';
import { useMoviesContext } from './movies-context';
import { COLS_ORDER } from './utils';

const MoviesTableVirtualizedRow = ({ index, style }) => {
  const movies = useMoviesContext();

  return (
    <MovieRow style={style} columnsOrder={COLS_ORDER}>
      {movies[index]}
    </MovieRow>
  );
};

export default MoviesTableVirtualizedRow;
