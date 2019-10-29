import React, {Component} from 'react';
import GameActions from './GameActions';
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

export default class ARScene extends Component {
  constructor() {
    super();

    this.state = {
      playgroundLength: 0.5,
      paddleAX: null,
      paddleAZ: 0,
      paddleBX: null,
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
        <MasterContextProvider>
          <AppState />
          <ViroARScene onTrackingUpdated={this._onInitialized}>
            <ViroARImageMarker target={'marker'}>
              <GameActions />
              <ViroAmbientLight color={'#FFFFFF'} />
              <Playground
                length={this.state.playgroundLength}
                paddleAX={this.state.paddleAX}
                paddleAZ={this.state.paddleAZ}
                paddleBX={this.state.paddleBX}
                paddleBZ={this.state.paddleBZ}
                puckX={this.state.packX}
                puckZ={this.state.packZ}
              />
            </ViroARImageMarker>
          </ViroARScene>
        </MasterContextProvider>
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

  _onAnchorFound() {
    // Implement handler
  }
}

ViroARTrackingTargets.createTargets({
  marker: {
    source: imageMarker,
    orientation: 'Up',
    physicalWidth: 0.08, // real world width in meters
  },
});
