import React from 'react';
import {ViroButton} from 'react-viro';
import firestore from '@react-native-firebase/firestore';

import newGame from './res/newGame.png';
import newGamePressed from './res/newGamePressed.png';
import joinGame from './res/joinGame.png';
import joinGamePressed from './res/joinGamePressed.png';
import spectateGame from './res/spectateGame.png';
import spectateGamePressed from './res/spectateGamePressed.png';
import GameContext from './Context/GameContext';
import MasterContext from './Context/MasterContext';

const GameActions = React.memo(() => {
  const gameContext = React.useContext(GameContext);
  const masterContext = React.useContext(MasterContext);

  const onTapNew = React.useCallback(() => {
    firestore()
      .collection('game')
      .doc('currentGame')
      .set({
        exists: true,
        slave: false,
      });
    masterContext.setMasterState(true);
  }, []);

  const onTapJoin = React.useCallback(async () => {
    await firestore()
      .collection('game')
      .doc('currentGame')
      .set({
        exists: true,
        slave: true,
      });
  }, []);

  const onTapSpectate = React.useCallback(() => {
    //TODO: hide buttons
  }, []);

  return (
    <>
      <ViroButton
        source={newGame}
        tapSource={newGamePressed}
        position={[0, 0.5, 0]}
        height={0.27}
        width={1}
        onClick={onTapNew}
        visible={!gameContext.exists}
      />
      <ViroButton
        source={joinGame}
        tapSource={joinGamePressed}
        position={[0, 0.5, 0]}
        height={0.27}
        width={1}
        onClick={onTapJoin}
        visible={gameContext.exists && !gameContext.slave}
      />
      <ViroButton
        source={spectateGame}
        tapSource={spectateGamePressed}
        position={[0, 0.5, 0]}
        height={0.27}
        width={1}
        onClick={onTapSpectate}
        visible={gameContext.exists && gameContext.slave}
      />
    </>
  );
});

export default GameActions;
