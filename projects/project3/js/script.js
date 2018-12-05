// Bullet Hell game (Avoid the particles)
// by Melissa Lim
//
// Arrow keys or WASD to move the player.
// Adding collectables to modify gameplay.
// This prototype focuses on theme, appearance and collectables (power-ups).
// The player represents a "teru teru bozu", a traditional doll that is thought
// to be able to stop or prevent rain.
// Collecting blue umbrellas (Shield object) grants an umbrella shield
// that will protect the player against rain particles.
// In this prototype, there is no negative consequences to collisions.
//
// Written with JavaScript OOP.

// Variables to contain player and array objects.
var player1;
var arrows = [];
var shield;
var powerup;
var raining = [];
var enemy;

// Variables for default bg colors, arrow directions and arrow heights
var bgRed = 35;
var bgGreen = 106;
var bgBlue = 135;
var endRed = 0;
var endGreen = 32;
var endBlue = 62;
var arrowVX;
var arrowHeight = 20;
var numDrops = 100;
var numArrow = 0;
var gameWon = false;
var gameLost = false;
var gameOver = false;
var start = false;

// Variables for sound and music
var bgMusic;
var shieldSFX;
var endMusic;
var arrowSFX;

function preload() {
  bgMusic = loadSound("assets/sounds/rain_song.mp3");
  shieldSFX = loadSound("assets/sounds/ding.wav");
  arrowSFX = loadSound("assets/sounds/lazer.wav");
  myFont = loadFont('assets/fonts/Kalam-Regular.ttf');
}

// setup()
//
// Create player object and collectable objects
function setup() {
  createCanvas(windowWidth,windowHeight);
  ellipseMode(CENTER);
  rectMode(CORNER);
  noStroke();
  textFont(myFont);

  numDrops = windowWidth/10;
  bgMusic.amp(0.5);
  shieldSFX.amp(0.3);
  arrowSFX.amp(0.3);

  player1 = new Player(width/2,height-50,5,20,LEFT_ARROW,RIGHT_ARROW,DOWN_ARROW,UP_ARROW);

  // Blue Umbrella-shaped particle
  shield = new Shield(random(0,width),random(-5*height,0),0,2,15);
  // Yellow Circle, sun particle that grants a power-up
  powerup = new Powerup(random(0,width),random(-3*height,0),0,3,15);
  // Grey set of circles, cloud enemy that damages player
  enemy = new Enemy(random(-width/2,0),random(0, height/4),random(1,3),0,width/8);
  // enemy2 = new Enemy(random(width,width+width/2),random(0, height/4),random(-3,-1),0,width/7);
}

// draw()
//
// Sets up scene and calls appropriate screen methods according to game state
function draw() {
  if (start === false) {
    titleScreen();
  } else {
    // Game Scene
    play();
  }
  if (gameOver === true) {
    gameOverScreen();
  }
}

function titleScreen() {
  push();
  bgGradient();
  // On-screen Instructions
  fill(255,150);
  noStroke();
  textSize(width/70);
  textAlign(RIGHT,CENTER);
  text("Press SPACE to shoot sunrays!",width-10,height-20);
  textAlign(LEFT,CENTER);
  text("WASD or ARROW KEYS to move",15,30);

  // Style set up, decorative elements
  textSize(width/15);
  textAlign(CENTER,CENTER);

  // Title screen text and prompt to begin game
  text("Please Stop the Rain!", width/2, height/3);
  textSize(width/40);
  text("I made a rain charm to stop the rain,", width/2, height*0.9/2);
  text("I wish that it would work...", width/2, height*1.05/2);
  textSize(width/30);
  text("Press ENTER to make my wish come true!", width/2, height*3/4);
  pop();
}

// play()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything (player, shields, arrows, and power-ups).
function play() {
  push();
  bgGradient();

  // On-screen Instructions
  fill(255,150);
  noStroke();
  textSize(width/70);
  textAlign(RIGHT,CENTER);
  text("Press SPACE to shoot sunrays!",width-10,height-20);
  textAlign(LEFT,CENTER);
  text("WASD or ARROW KEYS to move",15,30);

  // Rain Visuals
  makeItRain();

  pop();

  // Update and display player values
  player1.handleInput();
  player1.update();
  player1.display();

  // Update and display enemy values
  enemy.update();
  enemy.display();
  enemy.handleCollision(player1);

  // // Update and display enemy values
  // enemy2.update();
  // enemy2.display();
  // enemy2.handleCollision(player1);

  // Update and display shield values
  shield.update();
  shield.display(player1);
  shield.handleCollision(player1);

  // Update and display power-up values
  powerup.update();
  powerup.display();
  powerup.handleCollision(player1);

  // Update and display arrow values
  for (var i = 0; i < arrows.length; i++) {
    arrows[i].update();
    if (arrows.length > 0) {
      arrows[i].display();
      arrows[i].handleCollision(enemy);
    }
  }

  if (player1.color <= 10 || player1.size <= 5) {
    gameLost = true;
    gameOver = true;
  } else if (enemy.enemyCleared > 6) {
    gameWon = true;
    gameOver = true;
  } else {
    gameOver = false;
  }
}

// gameOverScreen()
//
// Displays text of a game over and prompts to restart
function gameOverScreen() {
  bgGradient();
  // Setting up style
  textSize(width/15);
  textAlign(CENTER,CENTER);
  noStroke();
  fill(255,150);
  bgMusic.stop();

  // Uses text and styling according to game over condition and prompts for new game
  if (gameLost) {
    push();
    textSize(width/19);
    text("Aww, the charm didn't stop the rain...", width/2, height*1/4);
    textSize(width/25);
    text("Maybe they don't work after all...", width/2, height/2);
    textSize(width/35);
    text("Press SHIFT and maybe I should try again with another charm!", width/2, height*3/4);
    pop();

    // winning condition: one of the two players get 11 points
  } else if (gameWon) {
    push();
    textSize(width/15);
    text("Yay! It stopped raining!", width/2, height/2);
    textSize(width/30);
    text("Press SHIFT to help someone else stop the rain!", width/2, height*3/4);
    pop();
  }
}

// bgGradient()
//
// Uses given values to make a gradient background
function bgGradient() {
  // Colors used for gradient background
  var startingColor = color(bgRed,bgGreen,bgBlue);
  var endingColor = color(endRed,endGreen,endBlue);
  for (let i = 0; i <= height; i++) {
    var intermediateColors = map(i, 0, height, 0, 1);
    var strokeColor = lerpColor(startingColor, endingColor, intermediateColors);
    stroke(strokeColor);
    line(0, i, width, i);
  }
}

// keyPressed()
//
// Creates arrow when space is pressed.
// If the player obtained a power-up, shoots 3 arrows in different directions.
function keyPressed() {
  // Title screen prompts for ENTER key to begin play
  if (keyCode === ENTER && start === false) {
    start = true;
    bgMusic.loop();
    enemy.reset();
    shield.reset();
    powerup.reset();
    play();
  }

  // Game Over screen prompts for SHIFT key to reset game
  if (keyCode === SHIFT && gameOver === true) {
    gameOver = false;
    gameWon = false;
    gameLost = false;
    start = false;
    player1.reset();
    titleScreen();
  }

  // Pressing Space shoots arrows off the player
  if (keyCode === 32 && start === true) {
    arrowSFX.currentTime = 0;
    arrowSFX.play();
    createArrow(0);
    if (powerup.collided) {
      createArrow(3);
      createArrow(-3);
      numArrow++;
    }
  }
  return false;
}

// createArrow()
//
// Creates arrows shooting up when spacebar is pressed in keyPressed()
// Arrow direction can change upon argument
function createArrow(arrowVX) {
  arrows.push(new Arrow(player1.x,player1.y-player1.size*1.5,arrowVX,-10,player1.size*0.5,arrowHeight));
}

// makeItRain()
//
// creates rainfall visuals
function makeItRain() {
  push();
  ellipseMode(RADIUS);
  noFill();
  if (raining.length < numDrops) {
    raining.push(new Rain());
  }
  for (var i = 0; i < raining.length; i++) {
    raining[i].update();
    raining[i].display();
    raining[i].handleCollision(shield,player1);
  }
  pop();
}
