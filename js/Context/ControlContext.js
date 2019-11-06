import React from 'react';
import MasterContext from './MasterContext';
import firestore from '@react-native-firebase/firestore';

const ControlContext = React.createContext({
  paddleAZ: 0,
  setPaddleAZ: () => {},
});

export const ControlContextProvider = React.memo(({children}) => {
  const [paddleAZ, setPaddleAZ] = React.useState(0);
  const masterContext = React.useContext(MasterContext);

  const setPaddlePosition = async position => {
		const collectionName = masterContext.isMaster ? 'paddleMaster' : 'paddleSlave';
    await firestore()
      .doc(collectionName + '/position')
      .set({position});
	};

	React.useEffect(() => {
    setPaddlePosition(paddleAZ);
  }, [paddleAZ]);
  
  return (
    <ControlContext.Provider value={{paddleAZ, setPaddleAZ}}>
      {children}
    </ControlContext.Provider>
  );
});

export default ControlContext;
