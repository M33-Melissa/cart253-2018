// Basic OO Pong
// by Pippin Barr
//
// A primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our ball and paddles
var ball;
var leftPaddle;
var rightPaddle;

///////////////// NEW /////////////////
// Default Game Color
var fgColor = 255;

// How far in from the walls the paddles should be drawn on x
var paddleInset = 50;
/////////////// END NEW ///////////////

// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(640,480);

  ///////////////// NEW /////////////////
  rectMode(CENTER);
  ellipseMode(CENTER);
  noStroke();
  fill(fgColor);

  // Create a ball
  ball = new Ball(width/2,height/2,6,6,20,6);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-paddleInset,height/2,10,60,10,DOWN_ARROW,UP_ARROW);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(paddleInset,height/2,10,60,10,83,87);

  /////////////// END NEW ///////////////
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);

  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();

  if (ball.isOffScreen() === 1) {

    ball.reset();
    rightPaddle.addScore();
    console.log("R: " + rightPaddle.score);

  } else if (ball.isOffScreen() === 2) {

    ball.reset();
    leftPaddle.addScore();
    console.log("L: " + leftPaddle.score);

  }

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ball.display();
  leftPaddle.display();
  rightPaddle.display();
}
