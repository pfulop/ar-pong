import React, {Component} from 'react';
import GameActions from './components/GameActions';
import {GameContextProvider} from './Context/GameContext';
import {MasterContextProvider} from './Context/MasterContext';
import Playground from './components/Playground';

import {
  ViroARScene,
  ViroConstants,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroAmbientLight,
} from 'react-viro';
import AppState from './AppState';

import imageMarker from './res/ah.jpg';
import LocalCoordinatesContext from './Context/LocalCoordinatesContext';

export default class ARScene extends Component {
  constructor() {
    super();

    this.state = {
      playgroundLength: 0.5,
      paddleAZ: 0,
      paddleBZ: 0,
      packX: 0,
      packZ: 0,
    };

    this._onInitialized = this._onInitialized.bind(this);
    this._onAnchorFound = this._onAnchorFound.bind(this);
  }

  render() {
    return (
      <GameContextProvider>
        <AppState />
        <ViroARScene onTrackingUpdated={this._onInitialized}>
          <ViroARImageMarker target={'marker'}>
            <GameActions />
            <ViroAmbientLight color={'#FFFFFF'} />
            <Playground
              length={this.state.playgroundLength}
              paddleAZ={this.state.paddleAZ}
              paddleBZ={this.state.paddleBZ}
              puckX={this.state.packX}
              puckZ={this.state.packZ}
            />
          </ViroARImageMarker>
        </ViroARScene>
      </GameContextProvider>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      // Handle tracking
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  _onAnchorFound(anchor) {
    const [x, y, z] = anchor.position;
    this.context.setPlaygroundCoordinates({
      x,
      y,
      z,
    });
  }
}

ARScene.contextType = LocalCoordinatesContext;

ViroARTrackingTargets.createTargets({
  marker: {
    source: imageMarker,
    orientation: 'Up',
    physicalWidth: 0.08, // real world width in meters
  },
});
