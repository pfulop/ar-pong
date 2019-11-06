import React from 'react';
import {ViroMaterials, Viro3DObject} from 'react-viro';
import ControlContext from '../Context/ControlContext';
import paddleModel from '../res/D7-AirHockeyHandle.obj';

const SCALE = 0.0008;

const mapNumberRange = (inValue, inMin, outMin, inMax, outMax) =>
  ((inValue - inMin) * (outMax - inMax)) / (outMin - inMin) + inMax;

const Paddle = props => {
  const {positionX, positionY, scaleFactor, maxZ, paddleName} = props;

  const scale = SCALE * scaleFactor;

  const controlContext = React.useContext(ControlContext);
  const paddleRef = React.useRef();
  const paddleZ = mapNumberRange(
    controlContext.paddleZ,
    -60,
    60,
    -maxZ + 0.035,
    maxZ - 0.035,
  );

  return (
    <Viro3DObject
      ref={paddleRef}
      source={paddleModel}
      position={[positionX, positionY, paddleZ]}
      materials={['red']}
      type={'OBJ'}
      rotation={[0, 0, 0]}
      scale={[scale, scale, scale]}
    />
  );
};

ViroMaterials.createMaterials({
  red: {
    lightingModel: 'PBR',
    diffuseColor: 'rgb(255,0,0)',
    diffuseIntensity: 0.5,
  },
});

export default Paddle;
