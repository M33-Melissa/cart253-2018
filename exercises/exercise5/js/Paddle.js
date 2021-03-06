// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

// Paddle constructor
//
// Sets the properties with the provided arguments or defaults
function Paddle(x,y,w,h,speed,downKey,upKey,red,blue) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.w = w;
  this.h = h;
  this.score = 0;
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
  ///////////////// NEW /////////////////
  this.red = red;
  this.blue = blue;
  /////////////// END NEW ///////////////
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
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  ///////////////// NEW /////////////////
  this.y = constrain(this.y,this.h/2,height-this.h/2);
  /////////////// END NEW ///////////////
}

// display()
//
// Draws the specified paddle on screen based on its properties
// Left paddle is red, right paddle is blue
Paddle.prototype.display = function() {
  ///////////////// NEW /////////////////
  fill(this.red,0,this.blue);
  /////////////// END NEW ///////////////
  rect(this.x,this.y,this.w,this.h);
}

///////////////// NEW /////////////////
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
// Game over reset game values, paddle height and score
Paddle.prototype.gameOver = function() {
  this.h = 70;
  this.score = 0;
}
/////////////// END NEW ///////////////
