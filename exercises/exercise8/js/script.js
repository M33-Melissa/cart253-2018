// Bullet Hell game (Avoid the particles)
// by Melissa Lim
//
// Arrow keys to move the player.
// Avoid red circles (enemies) and particles spreading around them.
// or else player reduces in size, darkens in color, until he loses(disappears).
//
// Written with JavaScript OOP.

// Variables to contain player, enemies, and projectiles objects.
var player1;
var arrows = [];

// setup()
//
// Create player object and array of enemies objects
function setup() {
  createCanvas(windowWidth,windowHeight);
  ellipseMode(CENTER);
  rectMode(CENTER);
  noStroke();

  player1 = new Player(width/2,height-50,5,20,LEFT_ARROW,RIGHT_ARROW,DOWN_ARROW,UP_ARROW,32);

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
  background(255);
  player1.handleInput();
  player1.update();
  player1.display();

  // Update and display arrow values
  for (var i = 0; i < arrows.length; i++) {
    arrows[i].update();
    if (arrows.length > 0) {
      arrows[i].display();
      arrows[i].handleCollision(enemies);
    }
  }

  // Game ends when player takes too much damage (size reduces to lower than 0)
  if (player1.size <= 2) {
    gameOver = true;
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
