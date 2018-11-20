// Player
//
// Player object, controlled by the user with arrow keys.
// Player constrained within window size.
// Default position at the middle, bottom of the screen.

// Player constructor
//
// Sets the properties with the provided arguments or defaults
function Player(x,y,speed,size,leftKey,rightKey,downKey,upKey) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.speed = speed;
  this.size = size;
  this.leftKey = leftKey;
  this.rightKey = rightKey;
  this.downKey = downKey;
  this.upKey = upKey;
  this.color = 255;
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity appropriately
Player.prototype.handleInput = function() {

  if (keyIsDown(this.leftKey)) {
    this.vx = -this.speed;

  } else if (keyIsDown(this.rightKey)) {
    this.vx = this.speed;

  } else {
    this.vx = 0;
  }

  if (keyIsDown(this.upKey)) {
    this.vy = -this.speed;

  } else if (keyIsDown(this.downKey)) {
    this.vy = this.speed;

  } else {
    this.vy = 0;
  }
}

// update()
//
// Update x and y positions based on velocities
// Constrain the resulting position to be within the canvas
Player.prototype.update = function() {
    this.y += this.vy;
    this.y = constrain(this.y,this.size/2,height-this.size/2);
    this.x += this.vx;
    this.x = constrain(this.x,this.size/2,width-this.size/2);
}

// display()
//
// Draw the paddle as a rectangle on the screen
Player.prototype.display = function() {
  push();
  fill(0,0,this.color);
  ellipse(this.x,this.y,this.size);
  pop();
}

// reset()
//
// Reset player position
Player.prototype.reset = function() {
  this.x = width/2;
  this.y = height-this.size/2;
}
