import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {Viro3DObject} from 'react-viro';
import LocalCoordinates from '../Context/LocalCoordinatesContext';
const packModel = require('../res/D7-AirHockeyPuck.obj');

const Puck = React.memo(() => {
  const [puckPosition, pullPuckPosition] = React.useState([0, 0.3, 0]);
  const localCoordinates = React.useContext(LocalCoordinates);

  React.useEffect(() => {
    const unsubscribe = firestore()
      .doc('puck/position')
      .onSnapshot({
        error: e => console.error(e),
        next: puckSnapshot => {
          const puckPosition = puckSnapshot.data();
          if (puckPosition) {
            const position = puckPosition;

            pullPuckPosition([position.x, position.y, position.z]);
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
