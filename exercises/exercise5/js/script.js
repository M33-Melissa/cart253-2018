// OOP Pong
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
var bgRed = 0;
var bgBlue = 0;

// How far in from the walls the paddles should be drawn on x
var paddleInset = 50;
/////////////// END NEW ///////////////

// setup()
//
// Creates the ball and paddles
function setup() {
  ///////////////// NEW /////////////////
  createCanvas(windowWidth-3,windowHeight-3);
  rectMode(CENTER);
  ellipseMode(CENTER);
  noStroke();
  fill(fgColor);

  // Create a ball
  ball = new Ball(width/2,height/2,6,6,20,6);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-paddleInset,height/2,20,60,10,DOWN_ARROW,UP_ARROW,0,255);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(paddleInset,height/2,20,60,10,83,87,255,0);

  /////////////// END NEW ///////////////
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(bgRed,0,bgBlue);

  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();

  ///////////////// NEW /////////////////
  // Sets background to red or blue depending on who got the point
  // Updates and display scores, resets the ball to the center
  if (ball.isOffScreen() === 1) {
    ball.reset();
    rightPaddle.updateScore();
    console.log("R: " + rightPaddle.score);
    bgRed = 0;
    bgBlue = 80;

  } else if (ball.isOffScreen() === 2) {
    ball.reset();
    leftPaddle.updateScore();
    console.log("L: " + leftPaddle.score);
    bgRed = 80;
    bgBlue = 0;
  }
  /////////////// END NEW ///////////////

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ball.display();
  leftPaddle.display();
  rightPaddle.display();
}
