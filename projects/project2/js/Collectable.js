// Collectable
//
//

var growth = 2;
function preload() {
  snowflake = loadImage("assets/images/snowflake.png");
}

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
// Projectile moves according to its velocity
Collectable.prototype.update = function () {
  // Update position with velocity
  this.y += this.vy;
  if (this.y>height) {
    this.y = 0;
    this.x = random(0,width);
  }
}

// display()
//
// Draw the projectile as a rectangle on the screen
Collectable.prototype.display = function () {
  image(snowflake,this.x,this.y,this.size,this.size);
}

// handleCollision(paddle)
//
// Check if this ball overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
Collectable.prototype.handleCollision = function(ball) {
  // Calculate edges of ball for clearer if statements below
  var collectableRight = this.x + this.size/2;
  var collectableLeft = this.x - this.size/2;
  var collectableTop = this.y - this.size/2;
  var collectableBottom = this.y + this.size/2;

  // Calculate edges of paddle for clearer if statements below
  var ballRight = ball.x + ball.size/2;
  var ballLeft = ball.x - ball.size/2;
  var ballTop = ball.y - ball.size/2;
  var ballBottom = ball.y + ball.size/2;

  // Check if the ball overlaps the paddle on x axis
  if (collectableRight > ballLeft && collectableLeft < ballRight) {
    // Check if the ball overlaps the paddle on y axis
    if (collectableBottom > ballTop && collectableTop < ballBottom) {
      // If so, move ball back to previous position (by subtracting current velocity)
      ball.size += growth;
      this.vx += growth/10;
      collectable.reset();
    }
  }
}

// reset()
//
// Set position back to the middle of the screen
Collectable.prototype.reset = function () {

    this.x = constrain(random(50,width-50),0,width);
    this.y = 0;

    this.vy = random(0,9);
}
