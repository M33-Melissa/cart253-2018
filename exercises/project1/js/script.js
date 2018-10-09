/******************************************************

Game - Chaser
Melissa Lim

A simple game of cat and mouse, music edition.

Physics-based movement, keyboard controls, health/stamina,
sprinting, random movement, screen wrap.

Catch the notes before they fade away!

******************************************************/

// Track whether the game is over
var gameOver = false;

// Player position, size, velocity
var playerX;
var playerY;
var playerRadius = 25;
var playerVX = 0;
var playerVY = 0;
var playerMaxSpeed = 3;
// Player health
var playerHealth;
var playerMaxHealth = 255;
// Player fill color
var playerFill = 250;

///////////////
var playerMaxSpeedDouble;
var playerHealthDecrease = 0.2;
var playerHealthDecreaseFast;

var preyMaxSpeedDouble;
//////////////

// Prey position, size, velocity
var preyX;
var preyY;
var preyRadius = 25;
var preyVX;
var preyVY;
var preyMaxSpeed = 6;
var tx;
var ty;
// Prey health
var preyHealth;
var preyMaxHealth = 100;
// Prey fill color
var preyFill = 0;

// Amount of health obtained per frame of "eating" the prey
var eatHealth = 10;
// Number of prey eaten during the game
var preyEaten = 0;

///////////////
var bgRed = 100;
var bgGreen = 100;
var bgBlue = 200;
// var notesDrawn = 0;
// var numSegments = 5;
// var noteRange = 20;
// var segmentsX = playerX*2;
// var segmentsY = playerY;
///////////////

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(windowWidth,windowHeight);

  noStroke();

  setupPrey();
  setupPlayer();

  ////////////
  // Random time values for noise functions
  tx = random(0,1000);
  ty = random(0,1000);
  ////////////
}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width/5;
  preyY = height/2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
  ////////////////////////
  preyMaxSpeedDouble = preyMaxSpeed*1.5;
  ////////////////////////
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4*width/5;
  playerY = height/2;
  playerHealth = playerMaxHealth;
  /////////////////
  playerHealthDecreaseFast = playerHealthDecrease*2;
  playerMaxSpeedDouble = playerMaxSpeed*2;
  /////////////////
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  background(bgRed,bgGreen,bgBlue);

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

    drawPrey();
    drawPlayer();

    preyPlayful();
  }
  else {
    showGameOver();
    notesDrawn = 0;
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
  }
  else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
  }
  else {
    playerVY = 0;
  }

  /////////////////////////////
  // Sprint Ability
  if (keyIsDown(SHIFT)) {
    playerMaxSpeed = playerMaxSpeedDouble;
    playerHealthDecrease = playerHealthDecreaseFast;
  }
  else {
    playerMaxSpeed = playerMaxSpeedDouble/2;
    playerHealthDecrease = playerHealthDecreaseFast/2;
  }
  ////////////////////////////
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX += playerVX;
  playerY += playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    playerX += width;
  }
  else if (playerX > width) {
    playerX -= width;
  }

  if (playerY < 0) {
    playerY += height;
  }
  else if (playerY > height) {
    playerY -= height;
  }
}

// updateHealth()
//
// Reduce the player's health (every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health, constrain to reasonable range
  ////////////////
  playerHealth = constrain(playerHealth - playerHealthDecrease,0,playerMaxHealth);
  ////////////////
  // Check if the player is dead
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  var d = dist(playerX,playerY,preyX,preyY);
  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Increase the player health
    playerHealth = constrain(playerHealth + eatHealth,0,playerMaxHealth);
    // Reduce the prey health
    preyHealth = constrain(preyHealth - eatHealth,0,preyMaxHealth);

    // Check if the prey died
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0,width);
      preyY = random(0,height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten++;

      //////////////
      bgRed = random(150,200);
      bgGreen = random(150,200);
      bgBlue = random(150,200);
      preyRadius = constrain(random(-10,10), 20, width/5);
      /////////////
    }
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  // Change the prey's velocity at random intervals
  // random() will be < 0.05 5% of the time, so the prey
  // will change direction on 5% of frames

  // Set velocity based on random values to get a new direction
  // and speed of movement
  // Use map() to convert from the 0-1 range of the random() function
  // to the appropriate range of velocities for the prey
  ///////////////////
  preyVX = map(noise(tx),0,1,-preyMaxSpeed,preyMaxSpeed);
  preyVY = map(noise(ty),0,1,-preyMaxSpeed,preyMaxSpeed);

  preyX += preyVX;
  preyY += preyVY;
  //////////////////

  // Screen wrapping
  if (preyX < 0) {
    preyX += width;
  }
  else if (preyX > width) {
    preyX -= width;
  }

  if (preyY < 0) {
    preyY += height;
  }
  else if (preyY > height) {
    preyY -= height;
  }

  /////////////
  // Increasing time for noise functions
  tx += 0.02;
  ty += 0.02;
  ///////////////
}

///////////MOD//////////////
// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  fill(preyFill,preyHealth*2);
  ellipse(preyX,preyY,preyRadius*2,preyRadius*1.6);
  // push();
  // stroke(preyFill,preyHealth*2);
  // strokeWeight(5);
  // line(preyX+preyRadius-2.5,preyY,preyX+preyRadius,preyY-80);
  // pop();
}
///////////MOD/////////////

// drawPlayer()
//
// Draw the player as an ellipse with alpha based on health
function drawPlayer() {
  fill(playerFill,playerHealth);
  // push();
  ellipse(playerX,playerY,playerRadius*2);
  // while (preyEaten <= numSegments) {
  //     ellipse(segmentsX,segmentsY,preyRadius,preyRadius*0.6);
  //     segmentsX += preyRadius;
  //     segmentsY = playerY + (sin(theta) * noteRange);
  //     theta++;
  //     notesDrawn++;
  // }
  // segmentsX -= preyRadius;
  // pop();
}

//////////////////
function preyPlayful() {
  if (preyEaten >= 2) {
    preyMaxSpeed = preyMaxSpeedDouble;
  }
}
//////////////////

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  textSize(32);
  textAlign(CENTER,CENTER);
  fill(0);
  var gameOverText = "GAME OVER\n";
  gameOverText += "You ate " + preyEaten + " prey\n";
  gameOverText += "before you died."
  text(gameOverText,width/2,height/2);
}
