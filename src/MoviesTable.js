import React from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';
import MovieRow from './MovieRow';
import { movieType } from './entities-types';

import styles from './MoviesTable.module.css';

const propTypes = {
  children: PropTypes.arrayOf(movieType),
};

const defaultProps = {
  children: [],
};

const COLS_ORDER = ['title', 'year', 'genre', 'director', 'cast', 'notes'];

const MoviesTable = ({ children: movies }) => {
  const MoviesTableInnerRow = ({ index, style }) => (
    <MovieRow style={style} columnsOrder={COLS_ORDER}>
      {movies[index]}
    </MovieRow>
  );

  return (
    <div className={styles.root}>
      <div className={`${styles.row} ${styles.head}`}>
        {COLS_ORDER.map(column => (
          <div key={column} className={`${styles.cell} ${styles[column]}`}>
            {column}
          </div>
        ))}
      </div>

      <FixedSizeList
        height={600}
        width="100%"
        itemSize={60}
        itemCount={movies.length}
      >
        {MoviesTableInnerRow}
      </FixedSizeList>
    </div>
  );
};

MoviesTable.propTypes = propTypes;
MoviesTable.defaultProps = defaultProps;

export default MoviesTable;
