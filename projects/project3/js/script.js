// Stop the Rain! (Shoot and avoid the particles)
// by Melissa Lim
//
// Arrow keys or WASD to move the player.
// The player represents a "teru teru bozu", a traditional doll that is thought
// to be able to stop or prevent rain.
// Defeating the clouds makes the sky brighter.
// To win the game, defeat 8 clouds using sunrays (SPACEBAR).
// Collecting blue umbrellas (Shield object) grants an umbrella shield
// that will protect the player against (10) rain particles.
// Collecting sun particles (Powerup object)
// grants a 3-shooter sunray (Arrow object) that has 10 uses;
// Collision with enemies and raindrops darkends and reduces player's size.
// Which results, at a certain point, in the player being defeated.
//
// Uses p5.collide2D.js library for collisions
// Background music from: https://www.youtube.com/watch?v=CpghoNAz9Y4
// Menu music is made by my friend!
// SFX taken from https://freesound.org
//
// Written with JavaScript OOP.

// Variables to contain player, powerup, arrow, shield, rain, and enemy objects.
var player1;
var arrows = [];
var shield;
var powerup;
var raining = [];
var numDrops;
var enemy;
var arrowVX;

// Variables to initialize arrow and rain values.
var arrowHeight = 20;
var numArrow = 0;

// Variables for default bg colors for gradient
var bgRed = 35;
var bgGreen = 106;
var bgBlue = 135;
var endRed = 0;
var endGreen = 32;
var endBlue = 62;

// Default game values
var gameWon = false;
var gameLost = false;
var gameOver = false;
var start = false;

// Variables for sound and music
var bgMusic;
var shieldSFX;
var endMusic;
var arrowSFX;
var powerupSFX;
var obtainedShieldSFX;
var menuMusic;
var obtainedShieldSFX;

// preload()
//
// Preloads sound effects, background music, and fonts
function preload() {
  bgMusic = loadSound("assets/sounds/rain_song.mp3");
  menuMusic = loadSound("assets/sounds/Sweet_Dream.mp3");
  powerupSFX = loadSound("assets/sounds/warp.wav");
  obtainedShieldSFX = loadSound("assets/sounds/obtained.wav");
  wonSFX = loadSound("assets/sounds/finished.wav");
  shieldSFX = loadSound("assets/sounds/ding.wav");
  arrowSFX = loadSound("assets/sounds/lazer.wav");
  myFont = loadFont('assets/fonts/Kalam-Regular.ttf');
}

// setup()
//
// Create player, enemy, and collectable objects
function setup() {
  createCanvas(windowWidth,windowHeight);
  ellipseMode(CENTER);
  rectMode(CORNER);
  noStroke();
  textFont(myFont);

  // Initialize music and number of raindrops on the page
  numDrops = windowWidth/12;
  bgMusic.amp(0.5);
  menuMusic.amp(0.3);
  shieldSFX.amp(0.3);
  arrowSFX.amp(0.3);
  powerupSFX.amp(0.3);
  obtainedShieldSFX.amp(0.3);
  wonSFX.amp(0.5);

  // Charm, ghost-shaped player
  player1 = new Player(width/2,height-50,5,20,LEFT_ARROW,RIGHT_ARROW,DOWN_ARROW,UP_ARROW);
  // Blue Umbrella-shaped particle
  shield = new Shield(random(0,width),random(-5*height,0),0,2,15);
  // Yellow Circle, sun particle that grants a power-up
  powerup = new Powerup(random(0,width),random(-3*height,0),0,3,15);
  // Grey set of circles, cloud enemy that damages player
  enemy = new Enemy(random(-width/2,-width/6),random(width/8, height/3),random(1,3),0.02,width/8);
}

// draw()
//
// Sets up scene and calls appropriate screen methods according to game state
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

// titleScreen()
//
//
function titleScreen() {
  if (menuMusic.isPlaying() === false) {
    menuMusic.play();
  }
  push();
  bgGradient();

  // On-screen Instructions
  fill(255,150);
  noStroke();
  textSize(width/70);
  textAlign(RIGHT,CENTER);
  text("Press SPACE to shoot sunrays!",width-15,height-30);
  textAlign(LEFT,CENTER);
  text("WASD or ARROW KEYS to move",15,25);

  // Style set up, decorative elements
  textSize(width/15);
  textAlign(CENTER,CENTER);

  // Title screen text and prompt to begin game
  text("Please Stop the Rain!", width/2, height/4);
  textSize(width/40);
  text("I made a rain charm to stop the rain,", width/2, height/2);
  text("I wish it would work...", width/2, height*2.5/4);
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
  text("Press SPACE to shoot sunrays!",width-15,height-30);
  textAlign(LEFT,CENTER);
  text("WASD or ARROW KEYS to move",15,25);

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

  // Verifies end game conditions
  if (player1.color <= 10 || player1.size <= 5) {
    gameLost = true;
    gameOver = true;

  } else if (enemy.enemyCleared > 7) {
    gameWon = true;
    gameOver = true;
    wonSFX.currentTime = 0;
    wonSFX.play();
  }
}

// gameOverScreen()
//
// Displays text of a game over and prompts to restart
// Uses end game status verified in play
function gameOverScreen() {
  // Setting up style
  bgGradient();
  textSize(width/15);
  textAlign(CENTER,CENTER);
  noStroke();
  fill(255,150);

  // Update game music
  bgMusic.stop();
  if (menuMusic.isPlaying() === false) {
    menuMusic.currentTime = 0;
    menuMusic.play();
  }

  // Uses text and styling according to game over condition and prompts for new game
  if (gameLost) {
    resetGame();
    // Replay prompt
    push();
    textSize(width/19);
    text("Aww, the charm didn't stop the rain...", width/2, height*1/4);
    textSize(width/25);
    text("Maybe they don't work after all...", width/2, height/2);
    textSize(width/35);
    text("Press SHIFT and... I will try again with another charm!", width/2, height*3/4);
    pop();

    // winning condition: one of the two players get 11 points
  } else if (gameWon) {
    resetGame();
    push();
    // Sunshine appearance from the window
    fill(255,255,0,30);
    quad(0,height/13,width+width/20,0,width+width/20,0,0,height*2/5);
    quad(0,height*2.25/5,width+width/20,0,width+width/20,0,0,height*4/5);
    quad(0,height*4.5/5,width+width/20,0,width+width/20,0,0,height+height*1.5/5);
    quad(0,height+height*2.5/5,width+width/20,0,width+width/20,0,0,height*2);

    // Window appearance
    fill(50,50);
    noStroke();
    rect(0,0,width,height/13);
    rect(0,height/13,width/25,height-height*2/13);
    rect(width-width/25,height/13,width/25,height-height*2/13);
    rect(width/2-width/25/2,height/13,width/25,height-height*2/13);
    rect(width/25,height/2-height/13/2,width-width*2/25,height/13);
    rect(0,height-height/13,width,height/13);
    pop();

    // Replay prompt
    push();
    fill(255);
    textSize(width/20);
    text("Yay! It stopped raining! It really worked!", width/2, height/4);
    textSize(width/30);
    text("Press SHIFT to help someone else stop the rain!", width/2, height*3/4);
    pop();
  }
}

// bgGradient()
//
// Uses given values to make a gradient background
// Seems to be the cause of what's making the game lagg on firefox
function bgGradient() {
  // Colors used for gradient background
  var startingColor = color(bgRed,bgGreen,bgBlue);
  var endingColor = color(endRed,endGreen,endBlue);
  for (var i = 0; i <= height; i++) {
    var intermediateColors = map(i, 0, height, 0, 1);
    var strokeColor = lerpColor(startingColor, endingColor, intermediateColors);
    stroke(strokeColor);
    line(0, i, width, i);
  }
  // Window appearance
  fill(0,80);
  noStroke();
  rect(0,0,width,height/13);
  rect(0,height/13,width/25,height-height*2/13);
  rect(width-width/25,height/13,width/25,height-height*2/13);
  rect(width/2-width/25/2,height/13,width/25,height-height*2/13);
  rect(width/25,height/2-height/13/2,width-width*2/25,height/13);
  rect(0,height-height/13,width,height/13);
}

// resetGame()
//
// Reinitialize game values for new game
function resetGame() {
  player1.color = 255;
  player1.size = 20;
  enemy.x = 0;
  powerup.y = 0;
  shield.y = 0;
  shield.trigger = false;
  enemy.enemyCleared = 0;
  numArrow = 0;
  for (var i = 0; i < raining.length; i++) {
    raining.pop();
  }
}

// keyPressed()
//
// Creates arrow when space is pressed.
// If the player obtained a power-up, shoots 3 arrows in different directions.
// Goes back to title screen if SHIFT is pressed in game over screen
// Enter play screen if ENTER pressed in title screen
function keyPressed() {
  // ENTER key to begin play, during title titleScreen
  // Music and objects are reset for a new game
  if (keyCode === ENTER && start === false) {
    start = true;
    menuMusic.stop();
    bgMusic.loop();
    enemy.reset();
    shield.reset();
    powerup.reset();
    player1.reset();
    play();
  }

  // SHIFT key to reset game, during the game over screen.
  // Fixed values to keep the game from continuing.
  if (keyCode === SHIFT && gameOver === true) {
    gameOver = false;
    gameWon = false;
    gameLost = false;
    start = false;
    bgRed = 35;
    bgGreen = 106;
    bgBlue = 135;
    endRed = 0;
    endGreen = 32;
    endBlue = 62;
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
// creates rainfall visuals and handles collision with player and shield
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
