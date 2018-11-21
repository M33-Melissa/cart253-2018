//
//

// Shield constructor
//
// Sets the properties with the provided arguments or defaults
function Powerup(x,y,vx,vy,size) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.trigger = false;
  this.shieldSize = 10;
  this.collided = false;
}

// update()s
//
// Update x and y positions based on velocities
Powerup.prototype.update = function() {
  // Update y position with velocity
  this.y += this.vy;
  this.x += this.vx;

  // When drop reaches the bottom, it resets at the top
  if (this.y > height) {
    this.reset();
  }
}

// handleCollision(player)
//
// Using the collision library, verify if collision occured
// If so, player size reduces, color darkens, and enemy resets
Powerup.prototype.handleCollision = function(player) {
  hit = collideCircleCircle(this.x,this.y,this.size,player.x,player.y,player.size);
  if (hit) {
    this.collided = true;
    this.x = random(0,width);
    this.y = random(-2*height,0);
  }
}

// display()
//
// Draw the drop as a green circle on the screen
Powerup.prototype.display = function() {
  push();
  fill(255,255,0);
  ellipse(this.x,this.y,this.size);
  pop();
}

// reset()
//
// Reset drop position at the top
Powerup.prototype.reset = function() {
  this.x = random(0,width);
  this.y = random(-2*height,0);
}
