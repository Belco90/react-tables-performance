import React from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';
import { orderBy } from 'lodash';
import cn from 'classnames';
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
  const listRef = React.createRef();

  React.useEffect(() => {
    // scroll to the top when movies updated by any reason
    listRef.current.scrollToItem(0);
  }, [initialMovies, refinedMovies]);

  React.useEffect(() => {
    sortMovies();
  }, [sortCriteria]);

  const sortMovies = () => {
    if (!sortCriteria) {
      setRefinedMovies(initialMovies);
    } else if (sortCriteria.startsWith('-')) {
      setRefinedMovies(
        orderBy(initialMovies, [sortCriteria.replace('-', '')], ['desc'])
      );
    } else {
      setRefinedMovies(orderBy(initialMovies, [sortCriteria], ['asc']));
    }
  };

  /**
   * This calculates the new sort order criteria.
   *
   * The same criteria iterates like this: no sorted --> asc --> desc --> no sorted
   *
   * Desc sorting is represented with a '-' prefix.
   * @param {string} selectedCriteria - new criteria selected to sort by
   */
  const setSortOrderCriteria = selectedCriteria => {
    if (sortCriteria === selectedCriteria) {
      // this means it was sorted asc and same criteria applies, then we have to sort desc now
      setSortCriteria(`-${selectedCriteria}`);
    } else if (!sortCriteria) {
      // this means new criteria applies, then we need to sort asc
      setSortCriteria(selectedCriteria);
    } else {
      // this means it was sorted desc and same criteria applies, then we need to remove sorting
      setSortCriteria(null);
    }
  };

  return (
    <MoviesContextProvider movies={refinedMovies}>
      <div className={styles.root}>
        <div className={`${styles.row} ${styles.head}`}>
          {COLS_ORDER.map(column => (
            <div
              key={column}
              className={cn(styles.cell, styles[column], {
                [styles.asc]:
                  sortCriteria &&
                  sortCriteria.includes(column) &&
                  !sortCriteria.startsWith('-'),
                [styles.desc]:
                  sortCriteria &&
                  sortCriteria.includes(column) &&
                  sortCriteria.startsWith('-'),
              })}
              role="button"
              tabIndex="0"
              onClick={() => setSortOrderCriteria(column)}
            >
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
            ref={listRef}
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
