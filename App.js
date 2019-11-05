import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { ViroARSceneNavigator } from "react-viro";

import ARScene from "./js/ARScene";
import Joystick from './js/components/Joystick';
import { LocalCoordinatesProvider } from './js/Context/LocalCoordinatesContext';
import { ControlContextProvider } from './js/Context/ControlContext';

class AiRPong extends Component {
  render() {
    return (
      <>
        <ControlContextProvider>
          <View style={styles.arscene}>
            <LocalCoordinatesProvider>
              <ViroARSceneNavigator
                initialScene={{scene: ARScene}}
                autofocus
                hdrEnabled
              />
            </LocalCoordinatesProvider>
          </View>
          <View style={styles.touchpadArea}>
            <Joystick />
          </View>
        </ControlContextProvider>
      </>
    )
  }
}

const styles = StyleSheet.create({
  arscene: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  touchpadArea: {
    alignSelf: 'center',
    position: 'absolute',
    width: 200,
    height: 200,
    backgroundColor: 'rgba(255,255,255,0.1)',
    bottom: '15%',
    borderRadius: 100,
    borderColor: "rgba(255,255,255,0.5)",
    borderWidth: 1
  },
});

export default AiRPong;
