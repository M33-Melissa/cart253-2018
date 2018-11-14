// Player

// Player constructor
//
// Sets the properties with the provided arguments or defaults
function Enemy(x,y,vx,vy,size) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
}

// update()
//
// Update x and y positions based on velocities
Enemy.prototype.update = function() {
  // Update y position with velocity
  this.y += this.vy;
  this.x += this.vx;

  // When enemy reaches the bottom, it resets at the top
  if (this.y > height) {
    this.reset();
  }
}

// display()
//
// Draw the enemy as a red circle on the screen
Enemy.prototype.display = function() {
  push();
  fill(255,0,0);
  ellipse(this.x,this.y,this.size);
  pop();
}

// reset()
//
// Reset player position
Enemy.prototype.reset = function() {
  this.y = random(-height,0);
  this.x = random(0,width);
}
