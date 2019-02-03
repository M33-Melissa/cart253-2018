// Collectable
//
// A class that adds "icy" (dark blue) snowflakes particles
// When collected by the ball, the ball augments in size and speed.

// Variable used for snowball growth
var growth = 3;

// Collectable Constructor
//
// Sets the properties with the provided arguments or defaults
function Collectable(x,y,vx,vy,size,speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
}

// update()
//
// Constrain the resulting position to be within the canvas
Collectable.prototype.update = function () {
  // Update y position with velocity
  this.y += this.vy;

  // When snowflake reaches the bottom, it respawns at the top at random x position
  if (this.y > height) {
    this.y = 0;
    this.x = random(0,width);
  }
}

// display()
//
// Draw the projectile as the preloaded snowflake image on the screen
Collectable.prototype.display = function () {
  image(snowflake,this.x,this.y,this.size,this.size);
}

// handleCollision(paddle)
//
// Check if this snowflake overlaps the ball passed as an argument
// and if so, increment ball size and velocity using growth factor
// and resets snowflake position
Collectable.prototype.handleCollision = function(ball) {
  // Check if the ball collides with the collectable
  var collectableHit = collideCircleCircle(this.x,this.y,this.size,ball.x,ball.y,ball.size);
  if (collectableHit) {
      // If so, increment ball size and velocity using growth variable
      ball.size += growth;
      this.vx += growth/10;
      this.reset();
  }
}

// reset()
//
// Set position back to the top of the screen, at random horizontal velocity
// and random x position
Collectable.prototype.reset = function () {
  this.x = random(50,width-50);
  this.y = 0;
  this.vy = random(0,9);
}
