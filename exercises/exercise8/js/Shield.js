//
//

// Shield constructor
//
// Sets the properties with the provided arguments or defaults
function Shield(x,y,vx,vy,size) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.trigger = false;
  this.shieldSize = 10;
}

// update()s
//
// Update x and y positions based on velocities
Shield.prototype.update = function() {
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
Shield.prototype.handleCollision = function(player) {
  hit = collideCircleCircle(this.x,this.y,this.size,player.x,player.y,player.size);
  if (hit) {
    // do-something
    this.trigger = true;
    this.reset();
  }
  // hitShield = collideRectCircle(player.x,player.y-20,50,10,enemy.x,enemy.y,enemy.size);
  // if (hitShield) {
  //   this.shieldSize -= 2;
  //   enemy.vy = -enemy.vy;
  // }
}

// display()
//
// Draw the drop as a green circle on the screen
Shield.prototype.display = function(player) {
  push();
  fill(0,200,255);
  ellipse(this.x,this.y,this.size);
  if (this.trigger) {
    rect(player.x,player.y-20,50,this.shieldSize);
  }
  pop();
}

// reset()
//
// Reset drop position at the top
Shield.prototype.reset = function() {
  // index = shields.indexOf(this);
  // shields.splice(index,1);
}
