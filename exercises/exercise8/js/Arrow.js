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

// reset()
//
// Removes arrow from array
Arrow.prototype.reset = function () {
  index = arrows.indexOf(this);
  arrows.splice(index,1);
}
