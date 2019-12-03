import PropTypes from 'prop-types';

export const movieType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  year: PropTypes.number,
  genre: PropTypes.string,
  director: PropTypes.string,
  cast: PropTypes.string,
  notes: PropTypes.string,
});
