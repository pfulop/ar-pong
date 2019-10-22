import React from 'react';
import {ViroButton} from 'react-viro';

import newGame from './res/newGame.png';
import newGamePressed from './res/newGamePressed.png';

const GameActions = React.memo(() => {
  const onTap = React.useCallback(() => alert('hit'), []);

  return (
    <ViroButton
      source={newGame}
      tapSource={newGamePressed}
      position={[1, 3, -5]}
      height={2}
      width={3}
      onTap={onTap}
    />
  );
});

export default GameActions;
