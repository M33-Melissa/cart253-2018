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
  this.shieldSize = 50;
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
// Reset drop position at the top
Shield.prototype.reset = function() {
  // index = shields.indexOf(this);
  // shields.splice(index,1);

  this.x = random(0,width);
  this.y = random(-2*height,0);
}
