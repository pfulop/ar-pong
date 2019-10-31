/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, {Component} from 'react';

import {ViroARSceneNavigator} from 'react-viro';
import ARScene from './js/ARScene';
import {LocalCoordinatesProvider} from './js/Context/LocalCoordinatesContext';

export default class ViroSample extends Component {
  render() {
    return (
      <LocalCoordinatesProvider>
        <ViroARSceneNavigator
          initialScene={{scene: ARScene}}
          autofocus
          hdrEnabled
        />
      </LocalCoordinatesProvider>
    );
  }
}
