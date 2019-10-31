import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {Viro3DObject} from 'react-viro';
const packModel = require('../res/D7-AirHockeyPuck.obj');

const Puck = React.memo(() => {
  const [puckPosition, pullPuckPosition] = React.useState([0, 0.3, 0]);

  React.useEffect(() => {
    const unsubscribe = firestore()
      .doc('puck/position')
      .onSnapshot({
        error: e => console.error(e),
        next: puckSnapshot => {
          const puckPosition = puckSnapshot.data();
          if (puckPosition) {
            pullPuckPosition([puckPosition.x, puckPosition.y, puckPosition.z]);
          }
        },
      });

    return () => unsubscribe();
  }, []);

  return (
    <Viro3DObject
      source={packModel}
      position={puckPosition}
      materials={['red']}
      type={'OBJ'}
      rotation={[0, 0, 0]}
      scale={[0.001, 0.001, 0.001]}
    />
  );
});

export default Puck;
