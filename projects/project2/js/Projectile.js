// Projectile
//
// New kind of ball that the players should avoid when playing.
// Square grey projectiles(rocks), randomize y spawn position.
// When collision with paddle (snowfort), paddle slows down(breaks), and gets smaller.

// Variable used to affect paddle speed and size
var penalty = 5;

// Projectile Constructor
//
// Sets the properties with the provided arguments or defaults
function Projectile(x,y,vx,vy,size,speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
  this.color = 100;
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
Projectile.prototype.update = function () {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;

  // Constrain y position to be on screen
  this.y = constrain(this.y,this.size/2,height-this.size/2);

  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y === this.size/2 || this.y + this.size/2 === height) {
    this.vy = -this.vy;
  }
}

// display()
//
// Draw the projectile as a grey rectangle on the screen (rock)
Projectile.prototype.display = function () {
  fill(this.color);
  rect(this.x,this.y,this.size,this.size);
}

// handleCollision(paddle)
//
// Check if this ball overlaps the paddle passed as an argument
// and if so, apply penalty and resets position upon paddle hit
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
      // If so, paddle gets smaller, vertical velocity slows down
      // Velocity never gets lower than 3 and height never gets smaller than 10
      if (paddle.h <= 10) {
        paddle.h = paddle.h;
      } else {
        paddle.h -= penalty;
      }
      if (paddle.speed <= 3) {
        paddle.speed = paddle.speed;
      } else {
        paddle.speed -= penalty/10;
      }
      this.reset();
    }
  }
  // Projectile spawns back at the origin (width/2) when out of screen
  if (projectileRight < 0 || projectileLeft > width) {
    this.reset();
  }
}

// reset()
//
// Set position back to the middle of the screen, at random y positions
Projectile.prototype.reset = function () {

  this.x = width/2;
  this.y = constrain(random(0,height),0,height);
  // Random horizontal speed, without being within 3 and -3
  do {
    this.vx = random(-9,9);
  } while (this.vx < 3 && this.vx > -3);
  // Random angle
  this.vy = random(-9,9);
}
