import React from 'react';

const MasterContext = React.createContext({
  isMaster: false,
  setMasterState: () => {},
});

export const MasterContextProvider = React.memo(({children}) => {
  const [isMaster, setMasterState] = React.useState(false);

  return (
    <MasterContext.Provider value={{isMaster, setMasterState}}>
      {children}
    </MasterContext.Provider>
  );
});

export default MasterContext;
