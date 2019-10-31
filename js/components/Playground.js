import React, {useState} from 'react';
import {ViroMaterials, ViroBox} from 'react-viro';

import PuckMaster from './PuckMaster';
import PuckSlave from './PuckSlave';
import Paddle from './Paddle';
import MasterContext from '../Context/MasterContext';

const NUMBER_OF_DECIMALS = 3;

const getFloat = value => {
  return parseFloat(value.toFixed(NUMBER_OF_DECIMALS));
};

const onPinch = (pinchState, scaleFactor, source, scale, setScale) => {
  setScale(scale * scaleFactor);
};

const Playground = props => {
  const {length, paddleAX, paddleAZ, paddleBX, paddleBZ, puckX, puckZ} = props;
  const [scale, setScale] = useState(1);

  const masterContext = React.useContext(MasterContext);

  const width = getFloat(length * 2);
  const height = getFloat(width / 100);

  const borders = [
    {
      key: 'borderA',
      width,
      length: getFloat(height * 2),
      height: getFloat(height * 4),
      positionX: 0,
      positionY: getFloat(height * 1.5),
      positionZ: getFloat(length / 2 + height),
    },
    {
      key: 'borderB',
      width,
      length: getFloat(height * 2),
      height: getFloat(height * 4),
      positionX: 0,
      positionY: getFloat(height * 1.5),
      positionZ: -getFloat(length / 2 + height),
    },
    {
      key: 'borderC',
      width: getFloat(height * 2),
      length: getFloat(length),
      height: getFloat(height * 4),
      positionX: -getFloat(width / 2 + height),
      positionY: getFloat(height * 1.5),
      positionZ: 0,
    },
    {
      key: 'borderD',
      width: getFloat(height * 2),
      length: getFloat(length),
      height: getFloat(height * 4),
      positionX: getFloat(width / 2 + height),
      positionY: getFloat(height * 1.5),
      positionZ: 0,
    },
  ];

  const bordersRender = borders.map(border => {
    const {
      key,
      positionX,
      positionY,
      positionZ,
      height,
      width,
      length,
    } = border;

    return (
      <ViroBox
        key={key}
        position={[positionX, positionY, positionZ]}
        height={height}
        length={length}
        width={width}
        scale={[scale, scale, scale]}
        materials={['whiteFilled']}
        physicsBody={{
          type: 'Static',
          mass: 0,
          friction: 0,
          enable: true,
          shape: {
            type: 'Box',
            params: [width, height, length],
          },
        }}
      />
    );
  });
  return (
    <>
      <ViroBox
        key={'base'}
        position={[0, 0, 0]}
        height={height}
        length={length}
        width={width}
        scale={[scale, scale, scale]}
        materials={['white']}
        onPinch={() => onPinch(scale, setScale)}
        physicsBody={{
          type: 'Static',
          mass: 0,
          friction: 0.01,
          enable: true,
          shape: {
            type: 'Box',
            params: [width, height, length],
          },
        }}
      />
      {bordersRender}
      <Paddle
        key={'paddleA'}
        positionX={getFloat(width / 2 - 0.05)}
        positionY={height}
        positionZ={paddleAZ}
        scaleFactor={scale}
      />
      <Paddle
        key={'paddleB'}
        positionX={getFloat(-width / 2 + 0.05)}
        positionY={height + 0.01}
        positionZ={paddleBZ}
        scaleFactor={scale}
      />
      {masterContext.isMaster && (
        <PuckMaster
          key={'puckMaster'}
          positionX={puckX}
          positionY={height + 0.01}
          positionZ={puckZ}
          scaleFactor={scale}
        />
      )}
      {!masterContext.isMaster && (
        <PuckSlave
          key={'puckSlave'}
          positionX={puckX}
          positionY={height + 0.01}
          positionZ={puckZ}
          scaleFactor={scale}
        />
      )}
    </>
  );
};

ViroMaterials.createMaterials({
  white: {
    lightingModel: 'PBR',
    diffuseColor: 'rgb(231,231,231)',
    blendMode: 'Add',
  },
  whiteFilled: {
    lightingModel: 'PBR',
    diffuseColor: 'rgb(231,231,231)',
  },
});

export default Playground;
