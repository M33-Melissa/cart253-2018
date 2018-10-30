// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

// Paddle constructor
//
// Sets the properties with the provided arguments or defaults
//////////////// FIXED typo "Pladdle" to "Paddle"
function Paddle(x,y,w,h,speed,downKey,upKey) {
  this.x = x;
  this.y = y;
  this.xv = 0;
  this.yv = 0;
  this.w = w;
  this.h = h;
  //////////////// FIXED typo 'speeed' as 'speed'
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
//////////////// FIXED completed word "proto" to "prototype"
Paddle.prototype.handleInput = function() {
  //////////////// FIXED p5.js function reference "keyDown" to "keyIsDown"
  //////////////// FIXED added "this." before upKey
  if (keyIsDown(this.upKey)) {
    this.vy = -this.speed;
  }
  //////////////// FIXED p5.js function reference "keyDown" to "keyIsDown"
  //////////////// FIXED added "this." before downKey
  else if (keyIsDown(this.downKey)) {
    this.vy = -this.speed;
  }
  //////////////// FIXED added condition to stop moving when key isn't down
  else {
    this.vy = 0;
  }
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  //////////////// FIXED typo "hight" to "height"
  //////////////// FIXED p5.js function reference "constraint" to "constrain"
  this.y = constrain(this.y,0,height-this.h);
}

// display()
//
// Draw the paddle as a rectangle on the screen
//////////////// FIXED extra paranthesis "function())" & "disploy" to "display"
Paddle.prototype.display = function() {
  //////////////// FIXED p5.js function reference "rectangle" to "rect"
  rect(this.x,this.y,this.w,this.h);
}
