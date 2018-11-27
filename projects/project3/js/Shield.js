// Shield
//
// Blue umbrella-shaped collectable, grants a player-sized umbrella as a shield.

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
  this.shieldSize = 50;
  this.shieldHP = 10;
}

// update()s
//
// Update x and y positions based on velocities
Shield.prototype.update = function() {
  // Update y position with velocity
  this.y += this.vy;
  this.x += this.vx;

  if (this.shieldHP <= 0) {
    this.trigger = false;
    this.shieldHP = 10;
  }

  // When shield drop reaches the bottom, it resets at the top
  if (this.y > height) {
    this.reset();
  }
}

// handleCollision(player)
//
// Using the collision library, verify if collision occured
// If the umbrella collided with the player, it sets the trigger to true
Shield.prototype.handleCollision = function(player) {
  hit = collideCircleCircle(this.x,this.y,this.size,player.x,player.y,player.size);
  if (hit) {
    this.trigger = true;
    this.reset();
  }
}

// display()
//
// Draw the shield drop as a blue umbrella on the screen
// Verifies if trigger is set to true (see handleCollision())
// If so, draws a player-sized blue umbrella over the player
Shield.prototype.display = function(player) {
  push();
  fill(0,0,255,200);
  arc(this.x,this.y,this.size,this.size,PI,2*PI);
  stroke(0,0,255,200);
  noFill();
  line(this.x,this.y-this.size*0.6,this.x,this.y+this.size/4);
  arc(this.x+this.size/4,this.y+this.size/4,this.size/2,this.size/2,QUARTER_PI,PI);

  if (this.trigger) {
    fill(0,0,255);
    noStroke();
    arc(player.x,player.y-20,this.shieldSize,this.shieldSize,PI,2*PI);
    stroke(0,0,255);
    strokeWeight(2);
    noFill();
    line(player.x-this.shieldSize/4,player.y-this.shieldSize*0.9,player.x-this.shieldSize/4,player.y+this.shieldSize/4);
    arc(player.x-this.shieldSize/10,player.y+this.shieldSize/4,this.shieldSize/4,this.shieldSize/4,QUARTER_PI,PI);
  }
  pop();
}

// reset()
//
// Reset shield drop position at the top
Shield.prototype.reset = function() {
  this.x = random(0,width);
  this.y = random(-2*height,0);
}
