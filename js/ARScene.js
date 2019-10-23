import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import GameActions from './GameActions';
import {GameContextProvider} from './Context/GameContext';
import {MasterContextProvider} from './Context/MasterContext';

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
  Viro3DObject
} from "react-viro";

const packModel = require("./res/D7-AirHockeyPuck.obj");
const paddleModel = require("./res/D7-AirHockeyHandle.obj");
const imageMarker = require("./res/ah.jpg");

export default class ARScene extends Component {
  constructor() {
    super();

    this.state = {
      paddleAZ: 0,
      paddleBZ: 0,
      playgroundWidth: 1,
      playgroundLength: 0.5
    };

    // TODO: Remove paddle mocked movement
    let paddleLength = parseFloat((this.state.playgroundLength / 3).toFixed(3));
    maxZ = () => parseFloat((this.state.playgroundLength / 2 - paddleLength / 2).toFixed(3));
    minZ = () => - maxZ();

    setInterval(() => {
      let randomAZ = Math.random() * (maxZ() - minZ()) + minZ();
      let randomBZ = Math.random() * (maxZ() - minZ()) + minZ();

      this.setState({
        paddleAZ: randomAZ,
        paddleBZ: randomBZ,
      });
    }, 500);
    // END of TODO

    this.paddleA = React.createRef();

    this._onInitialized = this._onInitialized.bind(this);
    this._onAnchorFound = this._onAnchorFound.bind(this);
    this._onPinch = this._onPinch.bind(this);
  }

  render() {
    // Computable dimensions
    let playgroundLength = this.state.playgroundWidth / 2;
    let playgroundHeight = this.state.playgroundWidth / 100;

    let borderHeight = playgroundHeight * 4;
    let borderLength = playgroundHeight * 2;
    let borderWidth = this.state.playgroundWidth;

    let paddleHeight = playgroundHeight * 2;
    let paddleLength = parseFloat((playgroundLength / 4).toFixed(3));
    let paddleWidth = playgroundHeight * 4;

    // Computable positions
    let borderAZ = parseFloat((playgroundLength / 2 + borderLength / 2).toFixed(3));
    let borderBZ = - borderAZ;

    let borderY = (borderHeight - playgroundHeight) / 2;

    let paddleAX = parseFloat((this.state.playgroundWidth / 2 - paddleWidth / 2).toFixed(3));
    let paddleBX = - paddleAX;

    let paddleY = playgroundHeight;

    return (
      <GameContextProvider>
        <MasterContextProvider>
            <ViroARScene onTrackingUpdated={this._onInitialized}>
            <ViroARImageMarker target={"marker"}> 
              <GameActions />
              <ViroAmbientLight color={"#FFFFFF"}/>
              <ViroBox
                position={[0, 0, 0]}
                height={playgroundHeight}
                length={playgroundLength}
                width={this.state.playgroundWidth}
                materials={["white"]}
                onPinch={this._onPinch} />
              <ViroBox
                position={[0, borderY, borderAZ]}
                height={borderHeight}
                length={borderLength}
                width={borderWidth}
                materials={["whiteFilled"]} />
              <ViroBox
                position={[0, borderY, borderBZ]}
                height={borderHeight}
                length={borderLength}
                width={borderWidth}
                materials={["whiteFilled"]} />
              <Viro3DObject
                ref={this.paddleA}
                source={paddleModel}
                position={[paddleAX, paddleY, this.state.paddleAZ]}
                materials={["red"]} 
                type={"OBJ"}
                rotation={[0, 0, 0]}
                scale={[.0008, .0008, .0008]}
              />
              <Viro3DObject
                source={packModel}
                position={[0, 0, 0,]}
                materials={["red"]} 
                type={"OBJ"}
                rotation={[0, 0, 0]}
                scale={[.001, .001, .001]}
              />
              <Viro3DObject
                source={paddleModel}
                position={[paddleBX, paddleY, this.state.paddleBZ]}
                materials={["red"]} 
                type={"OBJ"}
                rotation={[0, 0, 0]}
                scale={[.0008, .0008, .0008]}
              />
            </ViroARImageMarker>
          </ViroARScene>
        </MasterContextProvider>
      </GameContextProvider>
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

  _onPinch(pinchState, scaleFactor, source) {

    if (pinchState === 1) {
      this.baseScaleFactor = scaleFactor;
    }

    if (pinchState === 2) {
      let diff = scaleFactor - this.baseScaleFactor;
      let playgroundWidth =  this.state.playgroundWidth + diff;
      playgroundWidth = playgroundWidth < 0.2 ? 0.2 : playgroundWidth;
      this.setState({
        playgroundLength: parseFloat((playgroundWidth / 2).toFixed(3)),
        playgroundWidth,
        playgroundHeight: parseFloat((playgroundWidth / 100).toFixed(3))
      })
      this.baseScaleFactor = scaleFactor;
    }
  }
}

ViroARTrackingTargets.createTargets({
  "marker" : {
    source: imageMarker,
    orientation: "Up",
    physicalWidth: 0.08 // real world width in meters
  },
});

ViroMaterials.createMaterials({
  white: {
    lightingModel: "PBR",
    diffuseColor: "rgb(231,231,231)",
    blendMode: 'Add'
  },
  whiteFilled: {
    lightingModel: "PBR",
    diffuseColor: "rgb(231,231,231)"
  },
  red: {
    lightingModel: "PBR",
    diffuseColor: "rgb(255,0,0)",
    diffuseIntensity: 0.5
  }
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
