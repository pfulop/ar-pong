import React from 'react';
import {
  ViroMaterials,
  Viro3DObject,
} from 'react-viro';

const packModel = require('../res/D7-AirHockeyPuck.obj');
const SCALE = 0.001;

const Pack = (props) => {
	const {
		positionX,
		positionY,
		positionZ,
		scaleFactor
	} = props;

	const scale = SCALE * scaleFactor;

	return(
		<Viro3DObject
			source={packModel}
			position={[positionX, positionY, positionZ]}
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
    diffuseIntensity: 0.5
  },
});

export default Pack;
