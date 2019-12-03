import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      year: PropTypes.number,
      genre: PropTypes.string,
      director: PropTypes.string,
      cast: PropTypes.string,
      notes: PropTypes.string,
    })
  ).isRequired,
};

const MoviesTable = ({ children: movies }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Year</th>
          <th>Genre</th>
          <th>Director</th>
          <th>Cast</th>
          <th>Notes</th>
        </tr>
      </thead>

      <tbody>
        {movies.map(movie => (
          <tr
            key={`${movie.title}-${movie.year}-${movie.director}-${movie.genre}-${movie.cast}`}
          >
            <td>{movie.title}</td>
            <td>{movie.year}</td>
            <td>{movie.genre}</td>
            <td>{movie.director}</td>
            <td>{movie.cast}</td>
            <td>{movie.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

MoviesTable.propTypes = propTypes;

export default MoviesTable;
