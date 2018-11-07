// Snowstorm
//
// A class to display falling snowflakes to simulate snowstorm.
// Following code uses variables to give an organic feel to the falling snow.
// Code taken and modified from:
// https://p5js.org/examples/simulate-snowflakes.html

// Variables used for circular motion of snowflake's x position
var angularSpeed;
var angle;

// Snowstorm Constructor
//
// Initializes every snowflake's coordinates, position, angle, size and direction
function Snowstorm() {
  this.x = 0;
  this.y = random(-50,0);
  this.initialAngle = random(0,2*PI);
  this.size = random(2,5);
  this.radius = sqrt(random(pow(width/2,2)));
}

// update()
//
// moves the snowflakes on different speed and path
Snowstorm.prototype.update = function(time) {
  // x position following a circular motion
  angularSpeed = 0.6;
  angle = angularSpeed*time + this.initialAngle;
  this.x = width/2 + this.radius * sin(angle);

  // Size of snowflakes change falling speed
  this.y += pow(this.size, 0.5);

  // delete snowflake if off screen
  if (this.y > height) {
    index = snowflakes.indexOf(this);
    snowflakes.splice(index,1);
  }
}

// display()
//
// Display individual snowflakes as an ellipse
Snowstorm.prototype.display = function() {
  ellipse(this.x,this.y,this.size,this.size);
}
