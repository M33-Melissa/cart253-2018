// Broken Basic OO Pong
// by Pippin Barr
//
// A broken primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our ball and paddles
//////////////// FIXED typo 'bal' to 'ball'
var ball;
var leftPaddle;
var rightPaddle;

// setup()
//
// Creates the ball and paddles
function setup() {
  //////////////// FIXED typo 'crateCanvas' to 'createCanvas'
  createCanvas(640,480);
  noStroke();
  // Create a ball
  //////////////// FIXED corrected velocity vx, vy
  ball = new Ball(width/2,height/2,5,5,10,50);
  // Create the right paddle with UP and DOWN as controls
  //////////////// FIXED corrected height size
  rightPaddle = new Paddle(width-10,height/2,10,60,10,UP_ARROW,DOWN_ARROW);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  //////////////// FIXED added missing parenthesis
  leftPaddle = new Paddle(0,height/2,10,60,10,83,87);
  //////////////// FIXED added missing }
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);

  leftPaddle.handleInput();
  rightPaddle.handleInput();

  //////////////// FIXED added missing parenthesis
  ball.update();
  leftPaddle.update();
  rightPaddle.update();

  //////////////// FIXED added missing {
  //////////////// FIXED function reference "isOffTheScreen" to "isOffScreen"
  if (ball.isOffScreen()) {
    //////////////// FIXED reference "reset()" to "ball.reset()"
    ball.reset();
  }

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ball.display();
  leftPaddle.display();
  //////////////// FIXED added missing parenthesis
  rightPaddle.display();
}
