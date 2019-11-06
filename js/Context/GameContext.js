import React from 'react';
import firestore from '@react-native-firebase/firestore';

const GameContext = React.createContext({exists: false, slave: false});

export const GameContextProvider = React.memo(({children}) => {
  const [gameState, setGameState] = React.useState({
    exists: false,
    slave: false,
  });

  React.useEffect(() => {
    const unsubscribe = firestore()
      .collection('game')
      .onSnapshot({
        error: e => console.error(e),
        next: gameSnapshot => {
          if (gameSnapshot.empty && gameState.exists) {
            setGameState({exists: false, slave: false});
          } else {
            gameSnapshot.forEach(documentSnapshot => {
              setGameState(documentSnapshot.data());
            });
          }
        },
      });
    return () => unsubscribe();
  }, []);

  return (
    <GameContext.Provider value={gameState}>{children}</GameContext.Provider>
  );
});

export default GameContext;
