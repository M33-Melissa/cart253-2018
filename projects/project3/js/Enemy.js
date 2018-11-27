// Enemy
//
// Object moving across the screen from top to bottom.
// Affects player negatively in size and darkens color if collision occurs.

// Player constructor
//
// Sets the properties with the provided arguments or defaults
function Enemy(x,y,vx,vy,size) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.resetted = false;
  this.size = size;
  this.hit = false;
  this.resetValue = true;
}

// update()s
//
// Update x and y positions based on velocities
Enemy.prototype.update = function() {
  // Update y position with velocity
  this.y += this.vy;
  this.x += this.vx;
  this.size = constrain(this.size,0,this.size);
  this.resetted = false;
  this.resetValue = true;
  // When enemy reaches the bottom, it resets at the top
  if (this.y > height && this.resetValue) {
    this.reset();
  }
  if (this.size <= 0 && this.resetValue) {
    this.reset();
  }
}

// handleCollision(player)
//
// Using the collision library, verify if collision occured
// If so, player size reduces, color darkens, and enemy resets
Enemy.prototype.handleCollision = function(player) {
  this.hit = collideCircleCircle(this.x,this.y,this.size,player.x,player.y,player.size);
  if (this.hit) {
    player.color -= 50;
    this.reset();
  }
}

// display()
//
// Draw the enemy as a red circle on the screen
Enemy.prototype.display = function() {
  push();
  fill(110,110,110);
  ellipse(this.x,this.y,this.size,this.size-this.size/4);
  ellipse(this.x-this.size/1.7,this.y,this.size-this.size/3,this.size-this.size/2);
  ellipse(this.x+this.size/1.7,this.y,this.size-this.size/3,this.size-this.size/2);
  pop();
}

// reset()
//
// Reset enemy position at the top
Enemy.prototype.reset = function() {
  this.resetValue = false;
  this.resetted = true;
  this.x = random(0,width);
  this.y = random(-height,0);
  this.size = 50;
}
