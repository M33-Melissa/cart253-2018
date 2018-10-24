// Ball
//
// A class to define how a ball behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

///////////////// NEW /////////////////
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

// Ball constructor
//
// Sets the properties with the provided arguments
function Ball(x,y,vx,vy,size,speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
  this.red = 255;
  this.green = 255;
  this.blue = 255;
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
Ball.prototype.update = function () {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;

  ///////////////// NEW /////////////////
  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y - this.size/2 < 0 || this.y + this.size/2 > height) {
    this.vy = -this.vy;
    // Play our bouncing sound effect by rewinding and then playing
    beepSFX.currentTime = 0;
    beepSFX.play();
  }
  /////////////// END NEW ///////////////
}

///////////////// NEW /////////////////
// isOffScreen()
//
// Checks if the ball has moved off the screen and, if so, returns true.
// Otherwise it returns a value from 0 to 2.
// Value of 0 means ball not offscreen.
// Value of 1 means ball is off to the left.
// Value of 2 means ball is off to the right.
Ball.prototype.isOffScreen = function () {

  // Calculate edges of ball for clearer if statement below
  var ballLeft = this.x - this.size/2;
  var ballRight = this.x + this.size/2;

  // Check for going off screen and reset if so
  if (ballRight < 0) {
    // Plays SFX of gaining a point
    pointSFX.currentTime = 0;
    pointSFX.play();
    return 1;

  } else if (ballLeft > width) {
    // Plays SFX of gaining a point by rewinding and then playing
    pointSFX.currentTime = 0;
    pointSFX.play();
    return 2;

  } else {
    return 0;
  }
}
/////////////// END NEW ///////////////

// display()
//
// Draw the ball as a rectangle on the screen
Ball.prototype.display = function () {
  fill(this.red,this.green,this.blue);
  ///////////////// NEW /////////////////
  ellipse(this.x,this.y,this.size,this.size);
  /////////////// END NEW ///////////////
}

///////////////// NEW /////////////////
// handleCollision(paddle)
//
// Check if this ball overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
Ball.prototype.handleCollision = function(paddle) {

  // Calculate edges of ball for clearer if statements below
  var ballTop = this.y - this.size/2;
  var ballBottom = this.y + this.size/2;
  var ballLeft = this.x - this.size/2;
  var ballRight = this.x + this.size/2;

  // Calculate edges of paddle for clearer if statements below
  var paddleTop = paddle.y - paddle.h/2;
  var paddleBottom = paddle.y + paddle.h/2;
  var paddleLeft = paddle.x - paddle.w/2;
  var paddleRight = paddle.x + paddle.w/2;

  // First check it is in the vertical range of the paddle
  if (ballBottom > paddleTop && ballTop < paddleBottom) {
    // Then check if it is touching the paddle horizontally
    if (ballLeft < paddleRight && ballRight > paddleLeft) {
      this.red = paddle.red;
      this.green = 0;
      this.blue = paddle.blue;
      // Reverse x velocity to bounce
      this.vx *= -1.03;
      // Play our bouncing sound effect by rewinding and then playing
      collideSFX.currentTime = 0;
      collideSFX.play();
    }
  }
}
/////////////// END NEW ///////////////

///////////////// NEW /////////////////
// reset()
//
// Set position back to the middle of the screen
// Size increase every reset, randomized speed
// Ball goes in the direction of the winner
Ball.prototype.reset = function () {
  ball.size += 2;
  if (ball.isOffScreen() === 1) {
    this.x = width/2;
    this.y = height/2;
    this.vx = random(this.speed,10);
    this.vy = random(-9,9);

  } else if (ball.isOffScreen() === 2) {
    this.x = width/2;
    this.y = height/2;
    this.vx = random(-10,-this.speed);
    this.vy = random(-9,9);
  }
}

// gameOver()
//
// Game over reset values of speed and size to default.
Ball.prototype.gameOver = function() {
  this.speed = 7;
  this.size = 20;

  // Play winning sound effect by rewinding and then playing
  gameSFX.currentTime = 0;
  gameSFX.play();
}
/////////////// END NEW ///////////////
