import React from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';
import MovieRow from './MovieRow';
import MoviesTableVirtualizedRow from './MoviesTableVirtualizedRow';
import { MoviesContextProvider } from './movies-context';
import { movieType } from './entities-types';
import { getMovieId, COLS_ORDER } from './utils';

import styles from './MoviesTable.module.css';

const propTypes = {
  children: PropTypes.arrayOf(movieType),
  isVirtualized: PropTypes.bool,
};

const defaultProps = {
  children: [],
  isVirtualized: false,
};

const ROW_HEIGHT = 60;

const MoviesTable = ({ children: movies, isVirtualized }) => {
  return (
    <MoviesContextProvider movies={movies}>
      <div className={styles.root}>
        <div className={`${styles.row} ${styles.head}`}>
          {COLS_ORDER.map(column => (
            <div key={column} className={`${styles.cell} ${styles[column]}`}>
              {column}
            </div>
          ))}
        </div>

        {isVirtualized ? (
          <FixedSizeList
            height={600}
            width="100%"
            itemSize={60}
            itemCount={movies.length}
          >
            {MoviesTableVirtualizedRow}
          </FixedSizeList>
        ) : (
          movies.map(movie => (
            <MovieRow
              key={getMovieId(movie)}
              columnsOrder={COLS_ORDER}
              style={{
                height: `${ROW_HEIGHT}px`,
              }}
            >
              {movie}
            </MovieRow>
          ))
        )}
      </div>
    </MoviesContextProvider>
  );
};

MoviesTable.propTypes = propTypes;
MoviesTable.defaultProps = defaultProps;

export default MoviesTable;
