// The rain particles would later be attached to cloud enemies to be defeated
//
// Code taken from p5.js example:
// https://editor.p5js.org/zygugi/sketches/H1-5-1p5W


// Rain constructor
function Rain() {
  this.reset();
}

// reset()
//
//
Rain.prototype.reset = function() {
  this.x = random(width);
  this.y = random(-150, 0);
  this.vy = random(0.1, 2);
  this.maxy = this.y + height;
  this.r = 0;
  this.tr = 50;
  this.weight = random(0.1, 2);
}

// update()
//
// Raindrop dropping motion
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

Rain.prototype.handleCollision = function(shield,player) {

  if (shield.trigger) {
    hit = collideCircleCircle(this.x,this.y,5,player.x,player.y-20,shield.shieldSize);
  } else {
    hit = collideCircleCircle(this.x,this.y,5,player.x,player.y,player.size);
  }
  if (hit) {
    this.reset();
  }
}

// display()
//
// Display raindrops shapes
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
    ellipse(this.x, this.y, this.r, this.r*.5);
  }
}
