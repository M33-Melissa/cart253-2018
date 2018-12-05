// Enemy
//
// Object moving across the screen from top to bottom.
// Affects player negatively in size and darkens color if collision occurs.

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
    this.y = random(0, height/3);
  } else {
    this.x = random(-width/2,-width/6);
    this.y = random(0, height/3);
  }
}

// update()s
//
// Update x and y positions based on velocities
Enemy.prototype.update = function() {
  // Update y position with velocity
  this.y += 0.5 * sin(frameCount*this.vy);
  if (this.side > 0.5) {
    this.x -= this.vx;
  } else {
    this.x += this.vx;
  }
  this.size = constrain(this.size,0,this.size);
  this.resetted = false;
  this.resetValue = true;
  console.log(this.x);
  // When enemy reaches the bottom, it resets at the top
  if (this.x > width+width/2 && this.resetValue) {
    this.reset();
  }
  if (this.x < -width/2 && this.resetValue) {
    this.reset();
  }
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
// Draw the enemy as a red circle on the screen
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
// Reset enemy position at the top
Enemy.prototype.reset = function() {
  this.resetValue = false;
  this.resetted = true;
  this.side = random();
  if (this.side > 0.5) {
    this.x = random(width+width/6,width+width/2);
    this.y = random(0, height/3);
  } else {
    this.x = random(-width/2,-width/6);
    this.y = random(0, height/3);
  }
  this.size = initialSize;
}
