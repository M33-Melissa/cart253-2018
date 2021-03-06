// Enemy
//
// Object moving across the screen from top to bottom.
// Affects player negatively in size and darkens color if collision occurs.

// Variables to contain hit values
var hit;
var enemyHit = 5;
var resetValue = true;

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
}

// update()s
//
// Update x and y positions based on velocities
Enemy.prototype.update = function() {
  // Update y position with velocity
  this.y += this.vy;
  this.x += this.vx;
  this.size = constrain(this.size,0,20);
  this.resetted = false;
  resetValue = true;
  // When enemy reaches the bottom, it resets at the top
  if (this.y > height && resetValue) {
    this.reset();
  }
  if (this.size <= 0 && resetValue) {
    this.reset();
  }
}

// handleCollision(player)
//
// Using the collision library, verify if collision occured
// If so, player size reduces, color darkens, and enemy resets
Enemy.prototype.handleCollision = function(player) {
  hit = collideCircleCircle(this.x,this.y,this.size,player.x,player.y,player.size);
  if (hit) {
    player.size -= enemyHit;
    player.color -= 50;
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
// Reset enemy position at the top
Enemy.prototype.reset = function() {
  resetValue = false;
  this.resetted = true;
  this.x = random(0,width);
  this.y = random(-height,0);
  this.size = 20;
}
