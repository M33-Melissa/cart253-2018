// Player


// Variables to contain hit values
var hit;
var enemyHit = 5;

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

// update()
//
// Update x and y positions based on velocities
Enemy.prototype.update = function() {
  // Update y position with velocity
  this.y += this.vy;
  this.x += this.vx;
  this.resetted = false;
  // When enemy reaches the bottom, it resets at the top
  if (this.y > height) {
    this.reset();
  }
}

// handleCollision(player)
//
// Using the collision library, verify if collision occured
// If so, player size reduces
Enemy.prototype.handleCollision = function(player) {
  hit = collideCircleCircle(this.x,this.y,this.size,player.x,player.y,player.size);
  if (hit) {
    player.size -= enemyHit;
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
  console.log("true");
  this.resetted = true;
  this.x = random(0,width);
  this.y = random(-height,0);
}
