import React from 'react';
import {AppState} from 'react-native';
import firestore from '@react-native-firebase/firestore';

class AppStateComponent extends React.Component {
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = async nextAppState => {
    if (nextAppState.match(/inactive|background/)) {
      console.log('being called');
      const game = {
        exists: false,
        slave: false,
      };
      await firestore()
        .collection('game')
        .doc('currentGame')
        .set(game);
    }
  };

  render() {
    return null;
  }
}

export default AppStateComponent;
