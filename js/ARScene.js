import React, { Component } from "react";

import { StyleSheet } from "react-native";

import { ViroARScene, ViroBox, ViroConstants, ViroARPlane } from "react-viro";

export default class ARScene extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroARPlane minHeight={0.5} minWidth={0.5} alignment={"Horizontal"}>
          <ViroBox position={[0, 0.25, 0]} scale={[0.5, 0.5, 0.5]} />
        </ViroARPlane>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: "Hello World!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center"
  }
});
