# Google Day POC 2019

Purpose of this repo is to introduce possible options for Google Day 2019. It walks trough some AR/VR JS frameworks. It also contains example project made in react-viro and it's shortcomings.

### Table of contents

- [Google Day POC 2019](#google-day-poc-2019)
    - [Table of contents](#table-of-contents)
  - [Augmented Reality](#augmented-reality)
  - [Javascript AR Frameworks / Libraries / Tools](#javascript-ar-frameworks--libraries--tools)
    - [three.js](#threejs)
    - [WebXR API](#webxr-api)
    - [AR.js](#arjs)
    - [React-viro](#react-viro)
    - [A-Frame](#a-frame)
    - [Suggested framework](#suggested-framework)
  - [POC](#poc)
    - [Playground](#playground)
    - [Puck](#puck)
    - [Paddles](#paddles)
    - [Issues](#issues)
      - [Position](#position)
      - [Physics](#physics)
      - [Position transformation](#position-transformation)
- [Possible Game Ideas](#possible-game-ideas)
- [Pointers](#pointers)
- [ANDROID](#android)

## Augmented Reality

Augmented Reality - AR is name for technology that utilises digital representation of real world (camera feed, optical display) and renders contextual 3D graphical information on top of it, it extends it. To be able to do so, AR device needs to understand physical world around it, and it does so through computer vision, depth cameras, and various other sensors. To help device recognizing real world features, we use markers (images we put in real world), location and object recognition.

AR device can be smartphone or standalone headset (Microsoft Holo Lens). On Android, device needs tu support Android AR framework ARCore, while iOS devices use ARKit framework. Those are two most popular AR frameworks on the market, they make the best use of smartphone's hardware capabilities, while ARKit is more advanced from these two feature and performance wise, so we have more atractive AR products for iOS. In this research, we were focusing on JS AR frameworks that wrap these two frameworks to achieve the best results currently possible.

In contrast Virtual Reality - VR is completely virtual world renderd using 3D graphics and fed to user through VR headset (Oculus, Vive, Daydream).

## Javascript AR Frameworks / Libraries / Tools

### three.js

The most popular JS library for 3D graphics, it uses WebGL, it's not AR/VR specific, but it's ofently used in combination with other AR/VR frameworks.
https://threejs.org/

### WebXR API

Specification in draft stage, future standard, but still unstable, and unsupported by stable versions of browsers. It uses WebGL for rendering, integrates well with three.js. It gives AR/VR compatible device support through browser, so it means that it consumes native ARCore/ARKit API under the hood, it renders 3D scene in appropriate frame rate for device, and gives control support through vector system.
https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API

### AR.js

The most used and mature Javascript AR library. It doesn’t consume native ARCore/ARKit, it’s powered by ARToolKit, so it has a weaker understanding of physical space. It offers nice rendering options by integrating three.js + jsartoolkit5.
https://github.com/jeromeetienne/AR.js/blob/master/README.md

### React-viro

The react-native library offers AR and VR capabilities with a physics engine and custom rendering engine on top of it, which means it offers everything out of the box.
We were able to create little POC (playground for an air hockey game and we’re striving toward multiplayer (which is in progress)). It leverages ARCore and ARKit so you need an Android or iOS device that has support for it (which probably won’t be a problem). Some notes about react-viro:- It’s not fully compatible with latest RN but we found a for that works with 0.61.2- Documentation examples sometimes don’t reflect API (props are mostly named differently)- There’s a strange behavior with plane detection on android devices (but we think it’s simply ARCore having issues retaining information about its position in the real-world)https://github.com/viromedia/viro

### A-Frame

VR framework for three.js. It gives support for various VR platforms like HTC Vive, Windows Mixed Reality, Oculus, Daydream, GearVR... It's based on top of HTML, so it's easy to get started and provides declarative, extensible and composabale structure to three.js.
https://aframe.io/

### Suggested framework

After working with react-viro we suggest the best theme for google day would be creating small and easy game. Since real-time position synchronization of objects in the game is complicated (dare to say currently impossible) we suggest bringing online in a form of competitiveness through maintaining high score table or turn based mechanics.

From all mentioned frameworks, Viro is the quickest entry to AR world for JS developers (if you like React-Native).

## POC

As a POC we tried to implement multiplayer pong game. We wanted to explore limitations of react-viro and this game has enough complexity to do so.
It is a multiplayer game where each of the player controls theirs paddle and tries to prevent puck to touch their side of the wall as well as directing the puck to opponents’ side.

### Playground

The playground is made of 5 ViroBox elements. First is the floor of the playground on which the puck slides. It has physics property of a static object with 0 friction. Later the friction was supposed to be decreased into negative values so the puck would accelerate instead of maintaining the same speed through the game.
Next are 2 long side walls. Also, with physics property so the puck can bounce of them.
At last 2 short side walls on each side of the player. This have the same physics property as the other walls but on top of that they have onCollision listener so we can maintain correct score points for each player. On contact with them we also reset puck to its starting position.

### Puck

Puck is simple physics object that has mass and is set to be dynamic. This means it’s affected by all the forces in the world (gravity, impulses, etc.). As a result, it slides on the playground and bounces of walls and paddles. The position of Puck is then synchronized (in this case using firebase).

### Paddles

Paddles are controlled using joystick implemented using PanGestureHandler. They are fixed to move only on 1 axis and the movement is again synchronized between the clients.

### Issues

We observed some issues that are imposed by react-viro and that prevent us from providing game in state that we would be comfortable with.

#### Position

To synchronize the movements of objects between players we need to listen on position changes. This was made difficult because we are unable to report position of object more frequently than every 300ms. This is due to the callback prop onTransformUpdate which is not behaving correctly (being called only 4 times in the entirety of the game) which forced us to call react-viro provided function getTransformAsync to obtain position of object in 3d space. This forced us to call this function in interval which if being shorter than 300ms results in callback que that’s not being resolved.

#### Physics

The one good thing about react-viro is it’s built in physics engine. However, as many other engines this one also can glitch sometimes. What we’ve mostly observed was objects falling through other object even when it wasn’t supposed to.

#### Position transformation

position is relative to the Marker. However, if the method getTransformAsync is used, position is reported relatively to world coordinates. World coordinates have starting point (0 values) in the point where app was open, which means the coordinates if shared with different device need to be recalculated for the new world origin. React-viro doesn’t provide any function that could help with this, so we naively tried to just do simple subtractions to resolve position relative to other object, we didn’t account for rotation differences so to get correct position a transformation matrix needs to be used instead.

# Possible Game Ideas

- Snake
- Stack tower
- Jenga
- Bowling

# Pointers

- try not to overengineer your idea (best if you can start with something primitive and extend it later).
- make sure you can represent your object in 3d (find models online or use simple shapes)
- don’t forget the 3d coordinate system starts where your app starts
- android and iOS have different strengths when it comes to AR (iOS usually can keep up with where in the world you are more easily, android needs more scanning to be done)
- try to move your phone slower when mapping environment around you (mainly if you want to use plane detection)
- get familiar with the [physics](https://docs.viromedia.com/docs/physics) engine abilities

# ANDROID

A patched verions of react-viro is required for android devices. 

```yarn add react-viro@npm:@iskander508/react-viro@0.61.2```