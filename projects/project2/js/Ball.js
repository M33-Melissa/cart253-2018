// Ball
//
// A class to define how a ball behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

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

  // Constrain y position to be on screen
  this.y = constrain(this.y,this.size/2,height-this.size/2);

  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y === this.size/2 || this.y + this.size/2 === height) {
    this.vy = -this.vy;
  }
}

// isOffScreen()
//
// Checks if the ball has moved off the screen
// If so, returns 1 when off to the left
// and returns 2 when off to the right
// Otherwise it returns 0.
Ball.prototype.isOffScreen = function () {
  var ballRight = this.x + this.size/2;
  var ballLeft = this.x - this.size/2;

  // Check for going off screen and reset if so
  if (ballRight < 0) {
    return 1;
  } else if (ballLeft > width) {
    return 2;
  } else {
    return 0;
  }
}

// display()
//
// Draw the ball as a ahite ellipse on the screen (snowball)
Ball.prototype.display = function () {
  fill(255);
  ellipse(this.x,this.y,this.size,this.size);
}

// handleCollision(paddle)
//
// Check if this ball overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
Ball.prototype.handleCollision = function(paddle) {

  // Check if the ball collides with paddle
  var paddleHit = collideRectCircle(paddle.x-paddle.w/2,paddle.y-paddle.h/2,paddle.w,paddle.h,this.x,this.y,this.size);
  if (paddleHit) {
    // Reverse x velocity to bounce
    this.vx = -this.vx;
    // If so, move ball back to previous position (by subtracting current velocity)
    this.x += this.vx;
    this.y += this.vy;
  }
}

// reset()
//
// Set ball position back to the middle of the screen
// At randomized velocity
// Going towards the winning paddle
Ball.prototype.reset = function () {
  if (ball.isOffScreen() === 1) {
    this.x = width/2;
    this.y = height/2;
    this.vx = random(7,10);
    this.vy = random(-9,9);

  } else if (ball.isOffScreen() === 2) {
    this.x = width/2;
    this.y = height/2;
    this.vx = random(-10,-7);
    this.vy = random(-9,9);
  }
}

// gameOver()
//
// Game over reset values of velocity and size to default.
Ball.prototype.gameOver = function() {
  this.vx = 7;
  this.size = 30;
}
