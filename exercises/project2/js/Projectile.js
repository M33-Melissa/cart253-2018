// Projectile
//
// New kind of ball that the players should avoid when playing.
// Look different, move different, collision with paddle = negative consequences.

var penalty = 5;

// Constructor
function Projectile(x,y,vx,vy,size,speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
  this.color = 150;
}

// update()
//
// Projectile moves according to its velocity
Projectile.prototype.update = function () {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;
}

// display()
//
// Draw the projectile as a rectangle on the screen
Projectile.prototype.display = function () {
  fill(this.color);
  ellipse(this.x,this.y,this.size,this.size);
}

// handleCollision(paddle)
//
// Check if this ball overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
Projectile.prototype.handleCollision = function(paddle) {
  // Calculate edges of ball for clearer if statements below
  var projectileRight = this.x + this.size/2;
  var projectileLeft = this.x - this.size/2;
  var projectileTop = this.y - this.size/2;
  var projectileBottom = this.y + this.size/2;

  // Calculate edges of paddle for clearer if statements below
  var paddleRight = paddle.x + paddle.w/2;
  var paddleLeft = paddle.x - paddle.w/2;
  var paddleTop = paddle.y - paddle.h/2;
  var paddleBottom = paddle.y + paddle.h/2;

  // Check if the ball overlaps the paddle on x axis
  if (projectileRight > paddleLeft && projectileLeft < paddleRight) {
    // Check if the ball overlaps the paddle on y axis
    if (projectileBottom > paddleTop && projectileTop < paddleBottom) {
      // If so, move ball back to previous position (by subtracting current velocity)
      paddle.h -= penalty;
      this.vx -= penalty/10;
      fill(this.color,0);

      projectile.reset();
    }
  }
  if (projectileRight < 0 || projectileLeft > width) {
    projectile.reset();
  }
}

// reset()
//
// Set position back to the middle of the screen
Projectile.prototype.reset = function () {

    this.x = width/2;
    this.y = constrain(random(0,height),0,height);
    do {
      this.vx = random(-9,9);
    } while (this.vx < 4 && this.vx > -4);

    this.vy = random(-9,9);
}
