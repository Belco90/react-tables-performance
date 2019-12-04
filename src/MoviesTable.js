import React from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';
import { sortBy } from 'lodash';
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
const getItemKey = (index, data) => getMovieId(data[index]);

const MoviesTable = ({ children: initialMovies, isVirtualized }) => {
  const [refinedMovies, setRefinedMovies] = React.useState(initialMovies);
  const [sortCriteria, setSortCriteria] = React.useState(null);

  /**
   * This sorts the table by a particular criteria.
   *
   * The same criteria iterates like this: no sorted --> asc --> desc --> no sorted
   *
   * Desc sorting is represented with a '-' prefix.
   * @param {string} selectedCriteria - new criteria selected to sort by
   */
  const sortMoviesBy = selectedCriteria => {
    let newMovies = initialMovies;
    let newSortCriteria = null;

    if (sortCriteria === selectedCriteria) {
      // this means it was sorted asc and same criteria applies, then we have to sort desc now
      newSortCriteria = `-${selectedCriteria}`;
      newMovies = refinedMovies.reverse();
    } else if (!sortCriteria) {
      // this means new criteria applies, then we need to sort asc
      newSortCriteria = selectedCriteria;
      newMovies = sortBy(initialMovies, selectedCriteria);
    }
    // this means it was sorted desc and same criteria applies, then we need to remove sorting
    // which is the init value when declaring the vars at the beginning

    setSortCriteria(newSortCriteria);
    setRefinedMovies(newMovies);
  };

  return (
    <MoviesContextProvider movies={refinedMovies}>
      <div className={styles.root}>
        <div className={`${styles.row} ${styles.head}`}>
          {COLS_ORDER.map(column => (
            <div
              key={column}
              className={`${styles.cell} ${styles[column]}`}
              role="button"
              tabIndex="0"
              onClick={() => sortMoviesBy(column)}
            >
              {/* TODO: show sorting indicator with classnames */}
              {column}
            </div>
          ))}
        </div>

        {isVirtualized ? (
          <FixedSizeList
            height={600}
            width="100%"
            itemSize={60}
            itemCount={refinedMovies.length}
            itemData={refinedMovies}
            itemKey={getItemKey}
          >
            {MoviesTableVirtualizedRow}
          </FixedSizeList>
        ) : (
          refinedMovies.map(movie => (
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
