// Pong Plus
// by Melissa Lim
//
// A customized implementation of Pong with scoring system
// just the ability to play the game with the keyboard.

// Default game colors
var bgRed = 0;
var bgGreen = 0;
var bgBlue = 0;
var fgColor = 255;

// BALL

///////////////// NEW /////////////////
// Basic definition of a ball object with its key properties of
// position, size, velocity, and speed
var ball = {
  x: 0,
  y: 0,
  size: 20,
  vx: 0,
  vy: 0,
  red: 255,
  green: 255,
  blue: 255,
  speed: 5
}

// PADDLES

// How far in from the walls the paddles should be drawn on x
var paddleInset = 50;

// LEFT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, speed, and score
var leftPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vx: 0,
  vy: 0,
  speed: 5,
  score: 0,
  red: 255,
  green: 0,
  blue: 0,
  upKeyCode: 87, // The key code for W
  downKeyCode: 83 // The key code for S
}

// RIGHT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, speed, and score
var rightPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vx: 0,
  vy: 0,
  speed: 5,
  score: 0,
  red: 0,
  green: 0,
  blue: 255,
  upKeyCode: 38, // The key code for the UP ARROW
  downKeyCode: 40 // The key code for the DOWN ARROW
}

// Boolean value, checks if ball gave point to the right or left
var ballOutRight = false;

// A variable to hold the SFX sounds we will play
var beepSFX;
var pointSFX;
var gameSFX;
var collideSFX;

// preload()
//
// Loads the SFX audios for the sound of bouncing, scoring, and winning
function preload() {
  beepSFX = new Audio("assets/sounds/beep.wav");
  pointSFX = new Audio("assets/sounds/point.wav");
  gameSFX = new Audio("assets/sounds/game.wav");
  collideSFX = new Audio("assets/sounds/collide.wav");
}
/////////////// END NEW ///////////////

// setup()
//
// Creates the canvas, sets up the drawing modes,
// Sets initial values for paddle and ball positions
// and velocities.
function setup() {
  // Create canvas and set drawing modes
  createCanvas(windowWidth-3,windowHeight-3);
  rectMode(CENTER);
  ///////////////// NEW /////////////////
  ellipseMode(CENTER);
  /////////////// END NEW ///////////////
  noStroke();
  fill(fgColor);

  setupPaddles();
  setupBall();
}

// setupPaddles()
//
// Sets the positions of the two paddles
function setupPaddles() {
  // Initialise the left paddle
  leftPaddle.x = paddleInset;
  leftPaddle.y = height/2;

  // Initialise the right paddle
  rightPaddle.x = width - paddleInset;
  rightPaddle.y = height/2;
}

// setupBall()
//
// Sets the position and velocity of the ball
function setupBall() {
  ball.x = width/2;
  ball.y = height/2;
  ball.vx = ball.speed;
  ball.vy = ball.speed;
}

///////////////// NEW /////////////////
// draw()
//
// Calls the appropriate functions to run the game
function draw() {
  // Fill the background with red, green, and blue variables
  background(bgRed,bgGreen,bgBlue);

  // Handle input
  // Notice how we're using the SAME FUNCTION to handle the input
  // for the two paddles!
  handleInput(leftPaddle);
  handleInput(rightPaddle);

  // Update positions of all objects
  // Notice how we're using the SAME FUNCTION to handle the input
  // for all three objects!
  updatePosition(leftPaddle);
  updatePosition(rightPaddle);
  updatePosition(ball);

  // Handle collisions
  handleBallWallCollision();
  handleBallPaddleCollision(leftPaddle);
  handleBallPaddleCollision(rightPaddle);

  // Handle the ball going off screen
  handleBallOffScreen();

  // Display the paddles and ball
  displayPaddle(leftPaddle);
  displayPaddle(rightPaddle);
  displayBall();
}
/////////////// END NEW ///////////////

// handleInput(paddle)
//
// Updates the paddle's velocity based on whether one of its movement
// keys are pressed or not.
// Takes one parameter: the paddle to handle.
function handleInput(paddle) {

  // Set the velocity based on whether one or neither of the keys is pressed

  // NOTE how we can change properties in the object, like .vy and they will
  // actually CHANGE THE OBJECT PASSED IN, this allows us to change the velocity
  // of WHICHEVER paddle is passed as a parameter by changing it's .vy.

  // UNLIKE most variables passed into functions, which just pass their VALUE,
  // when we pass JAVASCRIPT OBJECTS into functions it's the object itself that
  // gets passed, so we can change its properties etc.

  // Check whether the upKeyCode is being pressed
  // NOTE how this relies on the paddle passed as a parameter having the
  // property .upKey
  if (keyIsDown(paddle.upKeyCode)) {
    // Move up
    paddle.vy = -paddle.speed;
  }
  // Otherwise if the .downKeyCode is being pressed
  else if (keyIsDown(paddle.downKeyCode)) {
    // Move down
    paddle.vy = paddle.speed;
  }
  else {
    // Otherwise stop moving
    paddle.vy = 0;
  }

  ///////////////// NEW /////////////////
  handlePaddleOffscreen();
  /////////////// END NEW ///////////////
}

// updatePosition(object)
//
// Sets the position of the object passed in based on its velocity
// Takes one parameter: the object to update, which will be a paddle or a ball
//
// NOTE how this relies on the object passed in have .x, .y, .vx, and .vy
// properties, which is true of both the two paddles and the ball
function updatePosition(object) {
  object.x += object.vx;
  object.y += object.vy;
}

// handleBallWallCollision()
//
// Checks if the ball has overlapped the upper or lower 'wall' (edge of the screen)
// and is so reverses its vy
function handleBallWallCollision() {

  // Calculate edges of ball for clearer if statement below
  var ballTop = ball.y - ball.size/2;
  var ballBottom = ball.y + ball.size/2;
  var ballLeft = ball.x - ball.size/2;
  var ballRight = ball.x + ball.size/2;

  // Check for ball colliding with top and bottom
  if (ballTop < 0 || ballBottom > height) {
    // If it touched the top or bottom, reverse its vy
    ball.vy = -ball.vy;
    // Play our bouncing sound effect by rewinding and then playing
    beepSFX.currentTime = 0;
    beepSFX.play();
  }
}

// handleBallPaddleCollision(paddle)
//
// Checks if the ball overlaps the specified paddle and if so
// reverses the ball's vx so it bounces
function handleBallPaddleCollision(paddle) {

  // Calculate edges of ball for clearer if statements below
  var ballTop = ball.y - ball.size/2;
  var ballBottom = ball.y + ball.size/2;
  var ballLeft = ball.x - ball.size/2;
  var ballRight = ball.x + ball.size/2;

  // Calculate edges of paddle for clearer if statements below
  var paddleTop = paddle.y - paddle.h/2;
  var paddleBottom = paddle.y + paddle.h/2;
  var paddleLeft = paddle.x - paddle.w/2;
  var paddleRight = paddle.x + paddle.w/2;

  // First check it is in the vertical range of the paddle
  if (ballBottom > paddleTop && ballTop < paddleBottom) {
    // Then check if it is touching the paddle horizontally
    if (ballLeft < paddleRight && ballRight > paddleLeft) {
      // Then the ball is touching the paddle so reverse its vx
      ball.vx = -ball.vx;
      // Play our bouncing sound effect by rewinding and then playing
      ///////////////// NEW /////////////////
      collideSFX.currentTime = 0;
      collideSFX.play();
      /////////////// END NEW ///////////////
    }
  }
}



///////////////// NEW /////////////////
// handleBallOffScreen()
//
// Checks if the ball has gone off screen to the left or right
// and moves it back to the centre if so
function handleBallOffScreen() {

  // Calculate edges of ball for clearer if statement below
  var ballLeft = ball.x - ball.size/2;
  var ballRight = ball.x + ball.size/2;

  // Check for ball going off the sides
  if (ballRight < 0) {
    // If it went off to the left side, reset it to the centre
    // And randomizes its velocity
    // Sets ball out to the right of the screen to true
    ballOutRight = false;
    reset();

    // NOTE that we don't change its velocity here so it just
    // carries on moving with the same velocity after its
    // position is reset.

    // This is where we count and display points for the right paddle!
    rightPaddle.score++;
    console.log("R: " + rightPaddle.score);
    displayScore();

  } else if (ballLeft > width) {
    // If it went off to the right side, reset it to the centre
    // And randomizes its velocity
    // Sets ball out to the right of the screen to true
    ballOutRight = true;
    reset();

    // This is where we count and display points for the left paddle!
    leftPaddle.score++;
    console.log("L: " + leftPaddle.score);
    displayScore();
  }

  // Winning condition: 10 score resets the game
  if (leftPaddle.score > 10 || rightPaddle.score > 10) {
    gameSFX.currentTime = 0;
    gameSFX.play();
    newGame();
  }
}

// handlePaddleOffscreen()
//
// Paddle can't go further than the limits of the screen height
function handlePaddleOffscreen() {
  if (leftPaddle.y > height) {
    leftPaddle.y = height;
  }
  if (rightPaddle.y > height) {
    rightPaddle.y = height;
  }
  if (leftPaddle.y < 0) {
    leftPaddle.y = 0;
  }
  if (rightPaddle.y < 0) {
    rightPaddle.y = 0;
  }
}
/////////////// END NEW ///////////////

///////////////// NEW /////////////////
// displayScoreRight()
//
// Changes height of paddle to display to represent score
// Longest paddle has highest score
// Theme changes colors of the previous score marked
function displayScore() {

  // Plays SFX of gaining a point
  pointSFX.currentTime = 0;
  pointSFX.play();

  // Changes background and ball color, increments paddle height
  if (ballOutRight === true) {
    leftPaddle.h += 10;
    ballColor(255,0,0);
    bgRed = 80;
    bgBlue = 0;

  } else {
    rightPaddle.h += 10;
    ballColor(0,0,255);
    bgRed = 0;
    bgBlue = 80;
  }
}

// reset()
//
// Repositions ball speed and position
function reset() {
  if (ballOutRight === true) {
    ball.speed = random(-10,-4);
    setupBall();
  } else {
    ball.speed = random(4,10);
    setupBall();
  }
}

// newGame()
//
// Resets game attributes to begin new game
function newGame() {
  leftPaddle.h = 70;
  rightPaddle.h = 70;
  ball.speed = 5;
  ballColor(255,255,255);
  bgRed = 0;
  bgBlue = 0;
  ballOutRight = false;
  leftPaddle.score = 0;
  rightPaddle.score = 0;
}

// displayBall()
//
// Draws ball on screen based on its properties
function displayBall() {
  fill(ball.red,ball.green,ball.blue);
  ellipse(ball.x,ball.y,ball.size,ball.size);
}

// ballColor(red,green,blue)
//
// Changes ball color attributes to given arguments
function ballColor(red,green,blue) {
    ball.red = red;
    ball.green = green;
    ball.blue = blue;
}

// displayPaddle(paddle)
//
// Draws the specified paddle on screen based on its properties
// Left paddle is red, right paddle is blue
function displayPaddle(paddle) {
  push();
  fill(paddle.red, paddle.green, paddle.blue);
  rect(paddle.x,paddle.y,paddle.w,paddle.h);
  pop();
}
/////////////// END NEW ///////////////
