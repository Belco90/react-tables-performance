import React from 'react';

const MoviesContext = React.createContext();

function MoviesContextProvider({ movies, ...remainingProps }) {
  return <MoviesContext.Provider value={movies} {...remainingProps} />;
}

function useMoviesContext() {
  const context = React.useContext(MoviesContext);

  if (context === undefined) {
    throw new Error(
      'useMoviesContext must be used within a MoviesContextProvider'
    );
  }

  return context;
}

export { useMoviesContext, MoviesContextProvider };
