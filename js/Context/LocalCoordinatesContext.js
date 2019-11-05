import React from 'react';

const LocalCoordinates = React.createContext({
  playgroundCoordinates: {
    x: 0,
    y: 0,
    z: 0,
  },
  getLocalCoordinates: () => {},
  setLocalCoordinates: () => {},
});

export const LocalCoordinatesProvider = React.memo(({children}) => {
  const [playgroundCoordinates, setPlaygroundCoordinates] = React.useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const getLocalCoordinates = React.useCallback(
    ({x, y, z}) => {
      return {
        x: playgroundCoordinates.x - x,
        y: playgroundCoordinates.y - y,
        z: playgroundCoordinates.z - z,
      };
    },
    [playgroundCoordinates],
  );

  const setLocalCoordinates = React.useCallback(
    ({x, y, z}) => {
      return {
        x: playgroundCoordinates.x + x,
        y: playgroundCoordinates.y + y,
        z: playgroundCoordinates.z + z,
      };
    },
    [playgroundCoordinates],
  );

  return (
    <LocalCoordinates.Provider
      value={{
        playgroundCoordinates,
        setPlaygroundCoordinates,
        getLocalCoordinates,
        setLocalCoordinates,
      }}>
      {children}
    </LocalCoordinates.Provider>
  );
});

export default LocalCoordinates;
