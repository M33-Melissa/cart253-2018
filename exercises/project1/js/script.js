/******************************************************

Game - Chaser
Melissa Lim
2715842

A simple game of cat and mouse, music edition.

Physics-based movement, keyboard controls, health/stamina,
sprinting, random movement (random function and Perlin noise function),
audio implementation, screen wrap.

Catch the notes before they fade away!
Attempt at replicating an excerpt from the Lost Woods song (Legend of Zelda).
Catching notes put them in the sheet music in the background.

******************************************************/

// Track whether the game is over
var gameOver = false;

// Player position, size, velocity
var playerX;
var playerY;
var playerRadius = 25;
var playerVX = 0;
var playerVY = 0;
var playerMaxSpeed = 4;
// Player health
var playerHealth;
var playerMaxHealth = 255;
// Player fill color
var playerFill = (245,245,220);

///////////////NEW//////////////
// Acceleration variables
// Health variables
var playerMaxSpeedDouble;
var playerHealthDecrease = 0.4;
var playerHealthDecreaseFast;
var preyMaxSpeedDouble;
///////////////NEW//////////////

// Prey position, size, velocity
var preyX;
var preyY;
var preyRadius = 25;
var preyVX;
var preyVY;
var preyMaxSpeed = 7;
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

///////////////NEW//////////////
// Default background values
var bgRed = 255;
var bgGreen = 255;
var bgBlue = 255;
// Sound variables
var note1;
var note2;
var note3;
var note4;
var note5;
var note6;
var note7;
var gameOverSound;
// Array with the height of the notes on the sheet music
var noteHeights = [6.5, 5.5, 5, 3.5, 4, 5, 4.5, 5, 6, 7, 7.5, 7, 6, 7];

// preload()
//
// Preload sound files
function preload() {
  gameOverSound = new Audio("assets/sounds/piano_slam.mp3");
  note1 = new Audio("assets/sounds/fa.wav");
  note2 = new Audio("assets/sounds/do.wav");
  note3 = new Audio("assets/sounds/re.wav");
  note4 = new Audio("assets/sounds/mi.wav");
  note5 = new Audio("assets/sounds/sol.wav");
  note6 = new Audio("assets/sounds/la.wav");
  note7 = new Audio("assets/sounds/si.mp3");
}
///////////////NEW//////////////

// setup()
//
// Sets up the basic elements of the game
// Sets canvas to width of window
function setup() {
  createCanvas(windowWidth,windowHeight);

  noStroke();

  setupPrey();
  setupPlayer();

  ///////////////NEW//////////////
  // Random time values for noise functions
  tx = random(0,1000);
  ty = random(0,1000);
  ///////////////NEW//////////////
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
  ///////////////NEW//////////////
  // Added max prey speed
  preyMaxSpeedDouble = preyMaxSpeed*1.5;
  ///////////////NEW//////////////
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4*width/5;
  playerY = height/2;
  playerHealth = playerMaxHealth;
  ///////////////NEW//////////////
  // When player speed increase(sprinting), player health decrease
  playerHealthDecreaseFast = playerHealthDecrease*3;
  playerMaxSpeedDouble = playerMaxSpeed*2;
  ///////////////NEW//////////////
}

///////////////MODIFIED//////////////
// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
// Draws sheet music in the background and adds notes accordingly
function draw() {
  background(bgRed,bgGreen,bgBlue);

  if (!gameOver) {
    sheetMusic();
    handleInput();
    movePlayer();
    movePrey();

    updateHealth();
    checkEating();
    addNote();

    drawPrey();
    drawPlayer();
  }
  else {
    showGameOver();
  }
}
///////////////MODIFIED//////////////

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
// Also checks if SHIFT pressed and adds sprinting accordingly
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

  ///////////////NEW//////////////
  // Sprint Ability
  if (keyIsDown(SHIFT)) {
    playerMaxSpeed = playerMaxSpeedDouble;
    playerHealthDecrease = playerHealthDecreaseFast;
    // Randomizes background color when sprinting
    bgRed = constrain(bgRed+random(-10,10),100,250);
    bgGreen = constrain(bgGreen+random(-10,10),100,250);
    bgBlue = constrain(bgBlue+random(-10,10),100,250);
  }
  else {
    playerMaxSpeed = playerMaxSpeedDouble/2;
    playerHealthDecrease = playerHealthDecreaseFast/2;
  }
  ///////////////NEW//////////////
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
// Also updates sound effects and appearance
// Plays note when prey eaten, changes background and prey radius
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

      ///////////////NEW//////////////
      // Play note when prey eaten
      playNote();
      // Changes background color to a random color when prey eaten
      bgRed = random(150,200);
      bgGreen = random(150,200);
      bgBlue = random(150,200);
      // Increment randomly prey radius when prey eaten
      preyRadius = constrain(preyRadius+random(-5,5), 20, width/5);
      ///////////////NEW//////////////
    }
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes using Perlin noise function
// Acceleration after 2 prey eaten
function movePrey() {
  ///////////////NEW//////////////
  // Change the prey's velocity at random intervals according to noise()

  // Set velocity based on random values to get a new direction
  // and speed of movement
  // Use map() to convert from the 0-1 range of the noise() function
  // to the appropriate range of velocities for the prey
  preyVX = map(noise(tx),0,1,-preyMaxSpeed,preyMaxSpeed);
  preyVY = map(noise(ty),0,1,-preyMaxSpeed,preyMaxSpeed);

  preyX += preyVX;
  preyY += preyVY;
  ///////////////NEW//////////////

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

  ///////////////NEW//////////////
  // Increasing time for noise functions
  tx += 0.02;
  ty += 0.02;

  // Adds speed to prey after 2 notes
  if (preyEaten >= 2) {
    preyMaxSpeed = preyMaxSpeedDouble;
  }
  ///////////////NEW//////////////
}

///////////MODIFIED//////////////
// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
// Adds music note appearance
function drawPrey() {
  fill(preyFill,preyHealth*2);
  ellipse(preyX,preyY,preyRadius*2,preyRadius*1.6);
  push();
  stroke(preyFill,preyHealth*2);
  strokeWeight(5);
  line(preyX+preyRadius-2.5,preyY,preyX+preyRadius,preyY-80);
  pop();
}
///////////MODIFIED/////////////

// drawPlayer()
//
// Draw the player as an ellipse with alpha based on health
function drawPlayer() {
  fill(playerFill,playerHealth*2);
  ellipse(playerX,playerY,playerRadius*2);
}

///////////////NEW//////////////

// sheetMusic()
//
// Draws a sheet music in the background
function sheetMusic() {
  push();
  stroke(0,100);
  strokeWeight(3);
  for (var i = 3; i <= 7; i++) {
    line(0,height*i/10,width,height*i/10);
  }
  pop();
}

// addNote()
//
// Adds a note to the sheet music in the background
// According to the prey number
function addNote() {
  push();
  stroke(0,100);
  strokeWeight(3);
  fill(0,150);
  for (var i = 0; i < preyEaten; i++) {
    ellipse(width*(i+1)/15,height*(noteHeights[i])/10,preyRadius*2,preyRadius*1.6);
    line(width*(i+1)/15+preyRadius-1.5,height*(noteHeights[i])/10,width*(i+1)/15+preyRadius-1.5,height*(noteHeights[i])/10-100);
  }
  pop();
}

// playNote()
//
// Play sound according to prey number,
// Inspired by The Legend of Zelda: Lost Woods song
// 14 notes in total, else repeat the last note
function playNote() {
  switch(preyEaten) {
    case 1:
      note1.play();
      break;
    case 2:
      note6.play();
      break;
    case 3:
      note7.play();
      break;
    case 4:
      note4.play();
      break;
    case 5:
      note3.play();
      break;
    case 6:
      note7.play();
      break;
    case 7:
      note2.play();
      break;
    case 8:
      note7.play();
      break;
    case 9:
      note5.play();
      break;
    case 10:
      note4.play();
      break;
    case 11:
      note3.play();
      break;
    case 12:
      note4.play();
      break;
    case 13:
      note5.play();
      break;
    case 14:
      note4.play();
      break;
    default:
      note4.play();
      break;
  }
}
///////////////NEW//////////////


// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  textSize(32);
  textAlign(CENTER,CENTER);
  fill(0);
  var gameOverText = "GAME OVER\n";
  gameOverText += "You played " + preyEaten + " notes\n";
  gameOverText += "before you got tired"
  text(gameOverText,width/2,height/2);

  ///////////////NEW//////////////
  // Added Game Over Sound
  gameOverSound.play();
  gameOverSound.stop();
  ///////////////NEW//////////////
}
