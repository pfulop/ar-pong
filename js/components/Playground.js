import React, { useState } from 'react';
import { ViroMaterials, ViroBox } from 'react-viro';

import Pack from './Pack';
import Paddle from './Paddle';

const NUMBER_OF_DECIMALS = 3;

const getFloat = (value) => {
  return parseFloat(value.toFixed(NUMBER_OF_DECIMALS));
};

const onPinch = (pinchState, scaleFactor, source, scale, setScale) => {
    setScale(scale * scaleFactor);
};

const Playground = (props) => {
  const {length, paddleAX, paddleAZ, paddleBX, paddleBZ, packX, packZ} = props;
  const [scale, setScale] = useState(1)

  const width = getFloat(length * 2);
  const height = getFloat(width / 100);

  const borders = [
    {
      key: 'borderA',
      width: getFloat(width),
      length: getFloat(height * 2),
      height: () => {
        getFloat(height * 4);
      },
      positionX: 0,
      positionY: getFloat((this.height - height) / 2),
      positionZ: getFloat(length / 2 + borderLength / 2)
    },
    {
      key: 'borderB',
      width: getFloat(width),
      length: getFloat(height * 2),
      height: () => {
        getFloat(height * 4)
      },
      positionX: 0,
      positionY: getFloat((this.height - height) / 2),
      positionZ: getFloat(-(playgroundLength / 2 + borderLength / 2))
    },
    {
      key: 'borderC',
      width: getFloat(height * 2),
      length: () => {
        getFloat(length);
      },
      height: () => {
        getFloat(height * 4);
      },
      positionX: getFloat((width / 2 + this.length / 2)),
      positionY: getFloat((this.height - height) / 2),
      positionZ: getFloat()
    },
    {
      key: 'borderD',
      width: getFloat(height * 2),
      length: () => {
        getFloat(length);
      },
      height: getFloat(height * 4),
      ppositionX: getFloat(-(width / 2 + this.length)),
      positionY: getFloat((borderHeight - playgroundHeight) / 2),
      positionZ: 0
    }
  ];

  const bordersRender = borders.map((border) => {
    const {key, positionX, positionY, positionZ, height, width, length} = border;
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
            params: [width, height, length]
          }
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
        positionX={getFloat(width / 2)}
        positionY={height}
        positionZ={paddleAZ}
        scaleFactor={scale}
      />
      <Paddle
        key={'paddleB'}
        positionX={getFloat(-width / 2)}
        positionY={height}
        positionZ={paddleBZ}
        scaleFactor={scale}
      />
      <Pack
        key={'pack'}
        positionX={packX}
        positionY={height}
        positionZ={packZ}
        scascaleFactorle={scale}
      />
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
  }
});

export default Playground;