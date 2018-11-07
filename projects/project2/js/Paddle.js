// Paddle
//
// A class that defines how a paddle appears and behaves, including the ability
// to specify the input keys to move it up and down
// Paddles appears as snow forts and increase in height when score incremented.

// Paddle constructor
//
// Sets the properties with the provided arguments or defaults
function Paddle(x,y,w,h,speed,downKey,upKey) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.w = w;
  this.h = h;
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
  this.score = 0;
  this.red = 135;
  this.green = 190;
  this.blue = 235;
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
Paddle.prototype.handleInput = function() {
  if (keyIsDown(this.upKey)) {
    this.vy = -this.speed;
  }
  else if (keyIsDown(this.downKey)) {
    this.vy = this.speed;
  }
  else {
    this.vy = 0;
  }
}

// update()
//
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  this.y = constrain(this.y,this.h/2,height-this.h/2);
}

// display()
//
// Draw the paddle as a snow fort/castle on the screen
Paddle.prototype.display = function() {
  // Actual paddle properties
  fill(this.red,this.green,this.blue);
  rect(this.x,this.y,this.w,this.h);

  // Adding white bricks for aesthetics to make the paddle feel like snowforts
  fill(255);
  rect(this.x-this.w/3.5,this.y-this.h/3,this.w/2.2,this.h/3.5);
  rect(this.x-this.w/3.5,this.y,this.w/2.2,this.h/3.5);
  rect(this.x-this.w/3.5,this.y+this.h/3,this.w/2.2,this.h/3.5);
  rect(this.x+this.w/3.5,this.y-this.h/3,this.w/2.2,this.h/3.5);
  rect(this.x+this.w/3.5,this.y,this.w/2.2,this.h/3.5);
  rect(this.x+this.w/3.5,this.y+this.h/3,this.w/2.2,this.h/3.5);

  // Fort tops on each paddle sides
  rect(leftPaddle.x-leftPaddle.w/1.2,leftPaddle.y-leftPaddle.h/3,leftPaddle.w/2.2,leftPaddle.h/3.5);
  rect(leftPaddle.x-leftPaddle.w/1.2,leftPaddle.y+leftPaddle.h/3,leftPaddle.w/2.2,leftPaddle.h/3.5);
  rect(rightPaddle.x+rightPaddle.w/1.2,rightPaddle.y-rightPaddle.h/3,rightPaddle.w/2.2,rightPaddle.h/3.5);
  rect(rightPaddle.x+rightPaddle.w/1.2,rightPaddle.y+rightPaddle.h/3,rightPaddle.w/2.2,rightPaddle.h/3.5);
}

// updateScore()
//
// Increment scores and adds height to paddle to display scores
// Longest paddle has highest score
Paddle.prototype.updateScore = function() {
  this.score++;
  this.h += 10;
}

// gameOver()
//
// Game over reset game values, paddle height, speed, and score
Paddle.prototype.gameOver = function() {
  this.h = 60;
  this.score = 0;
  this.speed = 15;
}
