import React from 'react';
import firestore from '@react-native-firebase/firestore';

const GameContext = React.createContext({exists: false});

export const GameContextProvider = React.memo(() => {
  const [gameState, setGameState] = React.useState({exists: false});

  React.useEffect(() => {
    firestore()
      .collection('game')
      .onSnapshot(gameSnapshot => {
        if (gameSnapshot.empty()) {
          setGameState({exists: false});
        }
      });
  }, []);

  const createGame = React.useCallback(() => {
    firestore()
      .collection('game')
      .doc('currentGame')
      .set({
        exists: true,
        slave: false,
      });
  }, []);

  return (
    <GameContext.Provider value={gameState}>{children}</GameContext.Provider>
  );
});
