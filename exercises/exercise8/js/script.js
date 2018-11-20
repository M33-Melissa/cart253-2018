// Bullet Hell game (Avoid the particles)
// by Melissa Lim
//
// Arrow keys to move the player.
// Adding collectables to modify gameplay.
//
// Written with JavaScript OOP.

// Variables to contain player and arrow objects.
var player1;
var arrows = [];
var shields = [];

var bgRed = 255;
var bgGreen = 255;
var bgBlue = 255;

// setup()
//
// Create player object and array of enemies objects
function setup() {
  createCanvas(windowWidth,windowHeight);
  ellipseMode(CENTER);
  rectMode(CENTER);
  noStroke();

  player1 = new Player(width/2,height-50,5,20,LEFT_ARROW,RIGHT_ARROW,DOWN_ARROW,UP_ARROW,32);

  for (var i = 0; i < 5; i++) {
    shields.push(new Shield(random(0,width),random(-2*height,0),0,3,20));
  }

}

// createArrow()
//
// Creates arrows shooting up when spacebar is pressed in keyPressed()
function createArrow() {
  arrows.push(new Arrow(player1.x,player1.y-player1.size*1.5,0,-10,player1.size*0.5,40));
}

// draw()
//
// Calls appropriate screen methods according to game state
function draw() {
  play();
}

// play()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything (player, enemies, projectiles).
// Verifies end game condition
function play() {
  background(bgRed,bgGreen,bgBlue);
  player1.handleInput();
  player1.update();
  player1.display();

  // Update and display arrow values
  for (var i = 0; i < shields.length; i++) {
    shields[i].update();
    shields[i].display(player1);
    shields[i].handleCollision(player1);
  }

  // Update and display arrow values
  for (var i = 0; i < arrows.length; i++) {
    arrows[i].update();
    if (arrows.length > 0) {
      arrows[i].display();
    }
  }
}

// keyPressed()
//
// Changes display depending on which key is pressed
function keyPressed() {

  // Pressing Space shoots arrows off the player
  if (keyCode === 32) {
    createArrow();
  }

  return false;
}
