import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {Viro3DObject} from 'react-viro';
import MasterContext from './Context/MasterContext';
const packModel = require('./res/D7-AirHockeyPuck.obj');

const Puck = React.memo(() => {
  const masterContext = React.useContext(MasterContext);
  const [puckPosition, pullPuckPosition] = React.useState([0, 0.3, 0]);

  const setPuckPosition = async e => {
    console.log('setting position');
    const [x, y, z] = e;
    await firestore()
      .collection('puck')
      .doc('position')
      .set({
        x,
        y,
        z,
      });
  };

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

  if (masterContext.isMaster) {
    return (
      <Viro3DObject
        source={packModel}
        position={[0, 0.3, 0]}
        materials={['red']}
        type={'OBJ'}
        rotation={[0, 0, 0]}
        scale={[0.001, 0.001, 0.001]}
        onTransformUpdate={() => console.log('update')}
        physicsBody={{
          type: 'Dynamic',
          mass: 1,
          shape: {
            type: 'Box',
            params: [0.1, 0.1, 0.1],
          },
          // force: {value: [0, 0.1, 0]},
          // torque: [0, 30, 0],
        }}
      />
    );
  }

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
