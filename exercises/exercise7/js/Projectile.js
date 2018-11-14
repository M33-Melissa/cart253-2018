// Projectile
//
// A particle that the players have to avoid when playing.
// When collision with player, negative effects.

// Variables to contain hit values
var hit;
var projectileHit = 2;

// Projectile constructor
//
// Sets the properties with the provided arguments or defaults
function Projectile(x,y,vx,vy,size) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
}

// update()
//
// Update x and y positions based on velocities
Projectile.prototype.update = function() {
  this.x += this.vx;
  this.y += this.vy;
}

// handleCollision(player)
//
// Using the collision library, verify if collision occured
// If so, player size reduces
Projectile.prototype.handleCollision = function(player) {
  hit = collideRectCircle(this.x,this.y,this.size,this.size,player.x,player.y,player.size);
  if (hit) {
    player.size -= projectileHit;
    this.reset();
  }
}

// display()
//
// Draw the particles as a green squares on the screen
Projectile.prototype.display = function() {
  push();
  fill(0,255,0);
  rect(this.x,this.y,this.size,this.size);
  pop();
}

// reset()
//
// Removes particles when collided with player
Projectile.prototype.reset = function() {
  index = projectiles.indexOf(this);
  projectiles.splice(index,1);
}
