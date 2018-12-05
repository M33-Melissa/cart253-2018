// Player
//
// Player object, controlled by the user with arrow keys or WASD.
// Player constrained within window size.
// Default position at the middle, bottom of the screen.
//
// Player represents a "teru teru bozu", a japanese traditional doll
// made of white paper or cloth that was thought to stop or prevent the rain.

var playerSize;

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
  playerSize = size;
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity appropriately
Player.prototype.handleInput = function() {

  if (keyIsDown(this.leftKey)||keyIsDown(65)) {
    this.vx = -this.speed;

  } else if (keyIsDown(this.rightKey)||keyIsDown(68)) {
    this.vx = this.speed;

  } else {
    this.vx = 0;
  }

  if (keyIsDown(this.upKey)||keyIsDown(87)) {
    this.vy = -this.speed;

  } else if (keyIsDown(this.downKey)||keyIsDown(83)) {
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
    this.size = constrain(this.size,5,this.size);
}

// display()
//
// Draw the player as a white ghost with a blue ribbon on the screen.
Player.prototype.display = function() {
  push();
  fill(this.color);
  quad(this.x-this.size/4, this.y, this.x+this.size/4, this.y, this.x+this.size, this.y+this.size*2, this.x-this.size, this.y+this.size*2);
  ellipse(this.x,this.y,this.size,this.size);
  fill(0);
  ellipse(this.x+this.size/5,this.y-this.size/5,this.size/6);
  ellipse(this.x-this.size/5,this.y-this.size/5,this.size/6);
  stroke(0);
  noFill();
  arc(this.x,this.y+this.size/10,this.size/4,this.size/4,0,PI);
  strokeWeight(3);
  stroke(0,0,255);
  arc(this.x,this.y+2,this.size,this.size,QUARTER_PI,HALF_PI+QUARTER_PI);
  pop();
}

// reset()
//
// Reset player position
Player.prototype.reset = function() {
  this.size = playerSize;
  this.x = width/2;
  this.y = height-this.size/2;
  this.color = 255;
}
