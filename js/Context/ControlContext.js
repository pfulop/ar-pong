import React from 'react';

const ControlContext = React.createContext({
  paddleZ: 0,
  setPaddleZ: () => {},
});

export const ControlContextProvider = React.memo(({children}) => {
  const [paddleZ, setPaddleZ] = React.useState(0);
  
  return (
    <ControlContext.Provider value={{paddleZ, setPaddleZ}}>
      {children}
    </ControlContext.Provider>
  );
});

export default ControlContext;
