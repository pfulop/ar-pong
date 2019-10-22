import React, {Component} from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroBox,
  ViroConstants,
  ViroARPlaneSelector,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroARPlane,
  ViroMaterials,
  ViroAmbientLight,
} from 'react-viro';

import GameActions from './GameActions';

const DIMENSIONS = {
  playgroundHeight: 0.01,
  playgroundLength: 0.2,
  playgroundWidth: 0.5,
  borderHeight: 0.02,
  borderLength: 0.01,
  paddleHeight: 0.01,
  paddleLength: 0.07,
  paddleWidth: 0.01,
};

export default class ARScene extends Component {
  constructor() {
    super();

    this.state = {
      paddleAZ: 0,
      paddleBZ: 0,
    };

    maxZ = () => DIMENSIONS.playgroundLength / 2 - DIMENSIONS.paddleLength / 2;
    minZ = () => -maxZ();

    setInterval(() => {
      let randomAZ = Math.random() * (maxZ() - minZ()) + minZ();
      let randomBZ = Math.random() * (maxZ() - minZ()) + minZ();

      this.setState({
        paddleAZ: randomAZ,
        paddleBZ: randomBZ,
      });
    }, 500);

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onAnchorFound = this._onAnchorFound.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <GameActions />
        <ViroARImageMarker target={'marker'}>
          <ViroAmbientLight color={'white'} />
          <ViroBox
            position={[0, 0, 0]}
            height={DIMENSIONS.playgroundHeight}
            length={DIMENSIONS.playgroundLength}
            width={DIMENSIONS.playgroundWidth}
            materials={['grass']}
          />
          <ViroBox
            position={[0, 0, 0.105]}
            height={DIMENSIONS.borderHeight}
            length={DIMENSIONS.borderLength}
            width={DIMENSIONS.playgroundWidth}
            materials={['white']}
          />
          <ViroBox
            position={[0, 0, -0.105]}
            height={DIMENSIONS.borderHeight}
            length={DIMENSIONS.borderLength}
            width={DIMENSIONS.playgroundWidth}
            materials={['white']}
          />
          <ViroBox
            position={[-0.245, 0.01, this.state.paddleAZ]}
            height={DIMENSIONS.paddleHeight}
            length={DIMENSIONS.paddleLength}
            width={DIMENSIONS.paddleWidth}
            materials={['red']}
          />
          <ViroBox
            position={[0.245, 0.01, this.state.paddleBZ]}
            height={DIMENSIONS.paddleHeight}
            length={DIMENSIONS.paddleLength}
            width={DIMENSIONS.paddleWidth}
            materials={['red']}
          />
        </ViroARImageMarker>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  _onAnchorFound() {
    alert('Anchor found!');
  }
}

ViroARTrackingTargets.createTargets({
  marker: {
    source: require('./res/ah.jpg'),
    orientation: 'Up',
    physicalWidth: 0.08, // real world width in meters
  },
});

ViroMaterials.createMaterials({
  grass: {
    lightingModel: 'PBR',
    diffuseTexture: require('./res/grass.jpg'),
  },
  stone: {
    lightingModel: 'PBR',
    diffuseTexture: require('./res/stone.jpg'),
  },
  white: {
    lightingModel: 'PBR',
    diffuseColor: 'rgb(231,231,231)',
  },
  red: {
    lightingModel: 'PBR',
    diffuseColor: 'rgb(255,0,0)',
  },
});

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
