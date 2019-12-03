import React from 'react';
import PropTypes from 'prop-types';
import { movieType } from './entities-types';

import styles from './MoviesTable.module.css';

const propTypes = {
  children: movieType,
  columnsOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const MovieRow = ({ children: movie, columnsOrder, ...remainingProps }) => (
  <div {...remainingProps} className={styles.row}>
    {columnsOrder.map(column => (
      <div
        key={column}
        className={`${styles.cell} ${styles[column]}`}
        title={movie[column]}
      >
        {movie[column] || '-'}
      </div>
    ))}
  </div>
);

MovieRow.propTypes = propTypes;

export default MovieRow;
