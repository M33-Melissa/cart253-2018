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
}

// display()
//
// Draw the paddle as a rectangle on the screen
Player.prototype.display = function() {
  push();
  fill(this.color);
  quad(this.x-5, this.y, this.x+5, this.y, this.x+20, this.y+40, this.x-20, this.y+40);
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
  this.x = width/2;
  this.y = height-this.size/2;
}
