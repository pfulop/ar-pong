import React from 'react';
import {ViroMaterials, Viro3DObject} from 'react-viro';
import ControlContext from '../Context/ControlContext';

const paddleModel = require('../res/D7-AirHockeyHandle.obj');

const SCALE = 0.0008;

const mapNumberRange = (inValue, inMin, outMin, inMax, outMax) => (inValue - inMin) * (outMax - inMax) / (outMin - inMin) + inMax;

const PaddleA = (props) => {
	const {
		positionX,
		positionY,
		scaleFactor,
		maxZ,
	} = props;

	const scale = SCALE * scaleFactor;
	const controlContext = React.useContext(ControlContext);
	const paddleAZ = mapNumberRange(controlContext.paddleAZ, -60, 60, -maxZ + 0.035, maxZ - 0.035);

	return (
		<Viro3DObject
			source={paddleModel}
			position={[positionX, positionY, paddleAZ]}
			materials={['red']}
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
}

ViroMaterials.createMaterials({
  red: {
    lightingModel: 'PBR',
    diffuseColor: 'rgb(255,0,0)',
    diffuseIntensity: 0.5
	}
});

export default PaddleA;
