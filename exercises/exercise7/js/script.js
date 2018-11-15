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
var enemies = [];
var projectiles = [];
var arrows = [];

// Default number of enemies and projectiles
var numEnemies = 10;
var numProjectiles = 20;
var start = false;
var gameOver = false;

// setup()
//
// Create player object and array of enemies objects
function setup() {
  createCanvas(windowWidth-3,windowHeight-3);
  ellipseMode(CENTER);
  rectMode(CENTER);
  noStroke();

  player1 = new Player(width/2,height-50,5,20,LEFT_ARROW,RIGHT_ARROW,DOWN_ARROW,UP_ARROW,32);

  for (var j = 0; j < numEnemies; j++) {
    enemies.push(new Enemy(random(0,width),random(-height*2,0),0,1.5,20));

    for (var i = 0; i < numProjectiles; i++) {
      projectiles.push(new Projectile(enemies[j].x,enemies[j].y,random(-1,1),random(1,3),5));
    }
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
  if (start === false) {
    titleScreen();
  } else {
    play();
  }
  if (gameOver === true) {
    gameOverScreen();
  }
}

// play()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything (player, enemies, projectiles).
// Verifies end game condition
function play() {
  background(78, 0, 127);
  player1.handleInput();
  player1.update();
  player1.display();

  // Update and display enemies with projectiles spreading around them
  for (var i = 0; i < numEnemies; i++) {
    enemies[i].update();
    enemies[i].display();
    enemies[i].handleCollision(player1);
    if (enemies[i].resetted) {
      for (var j = 0; j < numProjectiles; j++) {
        projectiles.push(new Projectile(enemies[i].x,enemies[i].y,random(-1,1),random(1,3),5));
      }
    }
  }

  // Update and display projectiles
  for (var i = 0; i < projectiles.length; i++) {
    projectiles[i].update();
    projectiles[i].display();
    projectiles[i].handleCollision(player1);
  }

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

// titleScreen()
//
// Sets up title screen elements, prompt text
function titleScreen() {
  // Style set up, decorative elements
  textSize(width/15);
  textAlign(CENTER,CENTER);
  background(233,226,255);

  // Title screen text, instructions, and prompt to begin game
  text("Avoid Everything!", width/2, height/3);
  textSize(width/40);
  // Instructions
  text("Red dots are enemies!", width/2, height*1/2);
  text("The confetti are evil!", width/2, height*1.15/2);
  textSize(width/35);
  text("Press SPACE to shoot!", width/2, height*1.3/2);
  // Play prompt
  textSize(width/25);
  text("Press ENTER to play", width/2, height*3/4);
}

// gameOverScreen()
//
// Displays text of a game over and prompts to restart
function gameOverScreen() {
  push();
  background(233, 226, 255);
  textSize(width/15);
  text("You Lost!", width/2, height/2);
  textSize(width/30);
  text("Press SHIFT to try again!", width/2, height*3/4);
  pop();
}

// resetGame()
//
// Reset game values for a new game
// Missing projectiles reset
function resetGame() {
  player1.x = width/2;
  player1.y = height-50;
  player1.size = 20;
  player1.color = 255;

  // Enemy reset values
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].reset();
  }

  // Display title screen
  titleScreen();
}

// keyPressed()
//
// Changes display depending on which key is pressed
function keyPressed() {
  // Title screen prompts for ENTER key to begin play
  if (keyCode === ENTER && start === false) {
    start = true;
    play();
  }

  // Game Over screen prompts for SHIFT key to reset game
  if (keyCode === SHIFT && gameOver === true) {
    gameOver = false;
    start = false;
    resetGame();
  }

  // Pressing Space shoots arrows off the player
  if (keyCode === 32) {
    createArrow();
  }

  return false;
}
