// Rain
//
//
// Has a collider interaction with the player and the shield object.
// Have a negative effect on the player if player isn't sheilded.
//
// Code taken from p5.js example:
// https://editor.p5js.org/zygugi/sketches/H1-5-1p5W

// Rain constructor
//
// refers to the reset function
function Rain() {
  this.reset();
}

// reset()
//
// Randomizes spawn position and sets default values
Rain.prototype.reset = function() {
  this.x = random(width);
  this.y = random(-150, 0);
  this.vy = random(0.1, 2);
  this.maxy = this.y + height;
  this.r = 0;
  this.tr = 50;
  this.weight = random(0.1, 2);
  this.hit = false;
  this.hitShield = false;
}

// update()
//
// Raindrop motion downwards in y axis.
// When raindrop reaches the bottom, it spreads in a fading ring.
Rain.prototype.update = function() {
  if (this.y < this.maxy) {
    this.y += this.vy;
  } else {
    this.r++;
  }
  if (this.r > this.tr) {
    this.reset();
  }
}

// handleCollision(shield,player)
//
// Using the collision library, verify if collision with shield or player
// has occured. If so, raindrop resets to a random position at the top.
Rain.prototype.handleCollision = function(shield,player) {
  if (shield.trigger) {
    this.hitShield = collideCircleCircle(this.x,this.y,5,player.x,player.y-20,shield.shieldSize);
  } else {
    this.hit = collideCircleCircle(this.x,this.y,5,player.x,player.y,player.size);
  }
  if (this.hit) {
    player.size -= 1;
    player.color -= 15;
    this.reset();
  }
  if (this.hitShield) {
    shieldSFX.currentTime = 0;
    shieldSFX.play();
    this.reset();
    shield.shieldHP -= 1;
  }
}

// display()
//
// Display raindrops in teardrop shapes or fading rings.
Rain.prototype.display = function() {
  strokeWeight(this.weight);
  if (this.y < this.maxy) {
    stroke(255);
    push();
    translate(this.x,this.y);
    beginShape();
    strokeWeight(1);
    vertex(0,-5);
    quadraticVertex(3, 0, 0, 1);
    quadraticVertex(-3,0, 0, -5);
    endShape(CLOSE);
    pop();

  } else {
    stroke(255, map(0, 0, 50, 255, 0));
    ellipse(this.x, this.y, this.r, this.r*0.5);
  }
}
