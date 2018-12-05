// Arrow
//
// A particle that affects the enemy negatively when collided.
// Clouds reduce in size to eventually get cleared.
// Sun rays sent to clear cloud enemies.

// Arrow constructor
//
// Sets the properties with the provided arguments or defaults
function Arrow(x, y, vx, vy, width, height) {
  this.x = x - width/2;
  this.y = y + height/2;
  this.vx = vx;
  this.vy = vy;
  this.width = width;
  this.height = height;
  this.hitArrow = false;
  this.hitBorder = false;
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
// Draw the arrow as a yellow rectangle on the screen (sun ray)
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
// Colliders are the clouds and top border of the window.
Arrow.prototype.handleCollision = function (enemies) {
  this.hitArrow = collideRectRect(this.x,this.y,this.width,this.height,enemies.x-enemies.size,enemies.y+enemies.size/4.9,enemies.size*2,enemies.size/5);
  this.hitBorder = collideLineRect(-width,0,width*2,0,this.x,this.y,this.width,this.height);
  if (this.hitArrow) {
    enemies.size -= 10;
    this.reset();
    this.hitArrow = false;
  }
  if (this.hitBorder) {
    this.reset();
    this.hitBorder = false;
  }
}

// reset()
//
// Removes arrow from array
Arrow.prototype.reset = function () {
  index = arrows.indexOf(this);
  arrows.splice(index,1);
}
