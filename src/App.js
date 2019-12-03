import React from 'react';
import MoviesTable from './MoviesTable';
import styles from './App.module.css';

const DATA_SET_SIZE_URLS = {
  small: 'https://int.conducerevel.com/test/data/smov.json',
  large: 'https://int.conducerevel.com/test/data/mov.json',
};

function App() {
  const [moviesData, setMoviesData] = React.useState(null);
  const [isFetching, setIsFetching] = React.useState(false);
  const [isVirtualized, setIsVirtualized] = React.useState(true);

  const fetchMoviesDataSet = async size => {
    const url = DATA_SET_SIZE_URLS[size];

    if (!url) {
      alert('Wrong data set selected');
      return;
    }

    setIsFetching(true);
    const response = await fetch(url);
    setMoviesData(await response.json());
    setIsFetching(false);
  };

  return (
    <div className={styles.root}>
      <h1>Movies</h1>

      <div>
        <button onClick={() => fetchMoviesDataSet('small')}>
          Get small data set
        </button>
        <button onClick={() => fetchMoviesDataSet('large')}>
          Get large data set
        </button>
        <label>
          <input
            type="checkbox"
            checked={isVirtualized}
            onChange={event => {
              setIsVirtualized(event.currentTarget.checked);
            }}
          />
          Use virtualization
        </label>
      </div>

      <hr />

      {isFetching && <span>Loading (fetching and rendering)...</span>}

      {!isFetching && moviesData && (
        <MoviesTable isVirtualized={isVirtualized}>{moviesData}</MoviesTable>
      )}
    </div>
  );
}

export default App;
