# Google Day POC 2019

Purpose of this repo is to introduce possible options for Google Day 2019. It walks trough some AR/VR JS frameworks. It also contains example project made in react-viro and it's shortcomings.

# Table of contents

1. [POC](#POC)
   1. [Playground](#Playground)
   2. [Puck](#Puck)
   3. [Paddles](#Paddles)
   4. [Issues](#Issues)
      1. [Position](#Position)
      1. [Physics](#Physics)
      1. [Position transformation](#position-transformation)
2. [Framworks](#Frameworks)
   1. [Suggested framework](#Suggested-framework)
3. [Possible Game Ideas](#Frameworks)
4. [Pointers](#Pointers)

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

## Suggested framework

After working with react-viro we suggest the best theme for google day would be creating small and easy game. Since real-time position synchronization of objects in the game is complicated (dare to say currently impossible) we suggest bringing online in a form of competitiveness trough maintaining high score table.

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
