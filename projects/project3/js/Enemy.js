// Enemy
//
// Object moving across the screen horizontally, on a sine wave.
// Affects player negatively in size and darkens color if collision occurs.

// Variable that holds the initial size of the cloud
var initialSize;

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
  this.hit = false;
  this.resetValue = true;
  initialSize = size;
  this.hitBot = false;
  this.enemyCleared = 0;
  this.side = random();
  if (this.side > 0.5) {
    this.x = random(width+width/6,width+width/2);
  } else {
    this.x = random(-width/2,-width/6);
  }
}

// update()
//
// Update x and y positions based on velocities
// Handles reset of object on certain conditions
Enemy.prototype.update = function() {
  // Update x and y position with velocity on a sine wave movement
  this.y += 0.5 * sin(frameCount*this.vy);
  if (this.side > 0.5) {
    this.x -= this.vx;
  } else {
    this.x += this.vx;
  }
  this.size = constrain(this.size,0,this.size);
  this.resetted = false;
  this.resetValue = true;

  // When enemy reaches the far left or right, it resets
  if (this.x > width+width/2 && this.resetValue) {
    this.reset();
  }
  if (this.x < -width/2 && this.resetValue) {
    this.reset();
  }
  // When the enemy size reaches 5, it is cleared and reset
  if (this.size < 5 && this.resetValue) {
    this.enemyCleared++;
    bgRed+=20;
    bgGreen+=20;
    bgBlue+=20;
    endBlue+=20;
    endGreen+=20;
    this.reset();
  }
}

// handleCollision(player)
//
// Using the collision library, verify if collision occured
// If so, player size reduces, color darkens, and enemy resets
Enemy.prototype.handleCollision = function(player) {
  this.hitBot = collideRectCircle(this.x-this.size,this.y+this.size/4.9,this.size*2,this.size/5,player.x,player.y,player.size);
  if (this.hitBot) {
    player.size -= 5;
    player.color -= 50;
    this.reset();
  }
}

// display()
//
// Draw the enemy as a grey cloud (set of circles on a rectangle)
Enemy.prototype.display = function() {
  push();
  fill(120,120,120);
  ellipse(this.x,this.y,this.size,this.size-this.size/4);
  ellipse(this.x-this.size/1.7,this.y,this.size-this.size/3,this.size-this.size/2);
  ellipse(this.x+this.size/1.7,this.y,this.size-this.size/3,this.size-this.size/2);
  ellipse(this.x+this.size,this.y+this.size/5,this.size-this.size/2,this.size-this.size/1.7);
  ellipse(this.x-this.size,this.y+this.size/5,this.size-this.size/2,this.size-this.size/1.7);
  rect(this.x-this.size,this.y+this.size/4.9,this.size*2,this.size/5);
  pop();
}

// reset()
//
// Reset enemy size and position on the left or right side randomly
Enemy.prototype.reset = function() {
  this.resetValue = false;
  this.resetted = true;
  this.side = random();
  if (this.side > 0.5) {
    this.x = random(width+width/6,width+width/2);
  } else {
    this.x = random(-width/2,-width/6);
  }
  this.y = random(0, height/3);
  this.size = initialSize;
}
