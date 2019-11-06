import React from 'react';
import {ViroMaterials, Viro3DObject} from 'react-viro';
import firestore from '@react-native-firebase/firestore';

import MasterContext from '../Context/MasterContext';
import paddleModel from '../res/D7-AirHockeyHandle.obj';

const SCALE = 0.0008;

const PaddleB = props => {
  const {positionX, positionY, scaleFactor} = props;

  const scale = SCALE * scaleFactor;
  const [paddleBZ, setPaddleBZ] = React.useState(0);
  const masterContext = React.useContext(MasterContext);

  React.useEffect(() => {
    const collectionName = masterContext.isMaster
      ? 'paddleSlave'
      : 'paddleMaster';
    const unsubscribe = firestore()
      .doc(collectionName + '/position')
      .onSnapshot({
        error: e => console.error(e),
        next: paddleSnapshot => {
          const paddlePosition = paddleSnapshot.data();
          if (paddlePosition && paddlePosition.position) {
            console.log('slave', paddlePosition.position);
            setPaddleBZ(paddlePosition.position);
          }
        },
      });

    return () => unsubscribe();
  }, []);

  return (
    <Viro3DObject
      source={paddleModel}
      position={[positionX, positionY, paddleBZ]}
      materials={['blue']}
      type={'OBJ'}
      rotation={[0, 0, 0]}
      scale={[scale, scale, scale]}
      physicsBody={{
        type: 'Kinematic',
        mass: 0,
        shape: {
          type: 'Sphere',
          params: [0.035],
        },
      }}
    />
  );
};

ViroMaterials.createMaterials({
  blue: {
    lightingModel: 'PBR',
    diffuseColor: 'rgb(0,0,255)',
    diffuseIntensity: 0.5,
  },
});

export default PaddleB;
