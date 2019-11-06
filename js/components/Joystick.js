import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import _ from 'lodash';

import ControlContext from '../Context/ControlContext';

const USE_NATIVE_DRIVER = true;

const Joystick = React.memo(props => {
  const controlContext = React.useContext(ControlContext);
  const _translateX = new Animated.Value(0);

  const _gestureEventListener = event => {
    if (event.nativeEvent) {
      const translation = Math.floor(event.nativeEvent.translationX);
      if (
        (translation >= 1 && translation <= 60) ||
        (translation <= -1 && translation >= -60)
      ) {
        controlContext.setPaddleZ(translation);
      }
    }
  };

  const _onHandlerStateChange = event => {
    _translateX.setValue(0);
  };

  _onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: _translateX,
        },
      },
    ],
    {
      useNativeDriver: USE_NATIVE_DRIVER,
      listener: _gestureEventListener,
    },
  );

  return (
    <PanGestureHandler
      {...props}
      onGestureEvent={_onGestureEvent}
      onHandlerStateChange={_onHandlerStateChange}
      id="joystick">
      <Animated.View
        style={[
          styles.box,
          {
            transform: [{translateX: _translateX}, {translateY: -40}],
          },
        ]}
      />
    </PanGestureHandler>
  );
});

const styles = StyleSheet.create({
  box: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderColor: 'rgba(255,255,255,0.5)',
    alignSelf: 'center',
    zIndex: 200,
    top: '50%',
  },
});

export default Joystick;
