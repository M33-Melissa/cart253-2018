// Arrow
//
// A particle that would affect the enemy negatively when collided.
// Sun rays that will be defeating cloud enemies.

// Arrow constructor
//
// Sets the properties with the provided arguments or defaults
function Arrow(x, y, vx, vy, width, height) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.width = width;
  this.height = height;
  this.hitArrow = false;
}

// update()
//
// Update x and y positions based on velocities (sunrays are sent upwards)
Arrow.prototype.update = function () {
  this.x += this.vx;
  this.y += this.vy;
}

// display()
//
// Draw the enemy as a yellow rectangle on the screen
Arrow.prototype.display = function () {
  push();
  fill(255,255,0);
  rect(this.x, this.y, this.width, this.height);
  pop();
}

// handleCollision(player)
//
// Using the collision library, verify if collision occured
// If so, enemy size reduces and arrow resets
Arrow.prototype.handleCollision = function (enemies) {
  this.hitArrow = collideRectCircle(this.x, this.y, this.width, this.height, enemies.x, enemies.y, enemies.size);
  if (this.hitArrow) {
    enemies.size -= 10;
    this.reset();
    this.hitArrow = false;
  }
}

// reset()
//
// Removes arrow from array
Arrow.prototype.reset = function () {
  index = arrows.indexOf(this);
  arrows.splice(index,1);
}
