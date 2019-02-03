// OO Pong Derivative, Snowfight themed
// by Melissa Lim
//
// An implementation of Pong where scoring elongates paddle size.
// Game ends at 11 points, or when the snowball becomes uncontrollably huge.
//
// Ability to play the game with the keyboard.
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Gameplay altered by visual elements, snowflake collectable objects,
// rock projectiles and snow fort paddles in a snowstorm.
//
// Written with JavaScript OOP.
//
// White snowstorm code taken and modified from:
// https://p5js.org/examples/simulate-snowflakes.html
// see function makeItSnow();

// Variable to contain the objects representing our ball and paddles
var ball;
var leftPaddle;
var rightPaddle;

// Game State variables
var start = false;
var gameOver = false;
var winner = "Default";
var winningScore = 11;

// How far in from the walls the paddles should be drawn on x
var paddleInset = 50;

// Default background color variables
var bgRed = 135;
var bgGreen = 206;
var bgBlue = 250;

// Collectable variables and array creation
var numCollect = 10;
var collectables = [];

// Snowflakes variables and array creation
var snowSpeed;
var snowflakes = [];

// preload()
//
// Load image for icy snowflake collectables
function preload() {
  snowflake = loadImage("assets/images/snowflake.png");
}

// setup()
//
// Creates the ball, paddles, projectiles and collectibles
function setup() {
  createCanvas(windowWidth,windowHeight);
  rectMode(CENTER);
  ellipseMode(CENTER);
  imageMode(CENTER);

  // Create a ball (snowball)
  ball = new Ball(width/2,height/2,7,7,30,7);

  // Create Paddles (snow forts)
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-paddleInset,height/2,20,60,15,DOWN_ARROW,UP_ARROW);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(paddleInset,height/2,20,60,15,83,87);

  // Create projectile object, rocks that slowly destroy the snow fort
  projectile = new Projectile(width/2,height/2,5,5,20,5);

  // Creating collectable objects (snowflakes) and storing them in an array
  for (var i = 0; i < numCollect; i++) {
    collectables.push(new Collectable(random(50,width-50),random(-height,0),3,3,random(15,50),3));
  }
}

// draw()
//
// Calls appropriate screen methods according to game state
function draw() {
  if (start===false) {
    titleScreen();
  } else {
    play();
  }
  if (gameOver===true) {
    gameOverScreen();
  }
}

// play()
//
// Sets up play screen, set appearance, update objects positions, displays and collisions.
// Checks score conditions, determine winner/game over conditions, and handles input.
function play() {
  background(bgRed,bgGreen,bgBlue);
  makeItSnow();

  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  projectile.update();
  leftPaddle.update();
  rightPaddle.update();

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);
  projectile.handleCollision(leftPaddle);
  projectile.handleCollision(rightPaddle);

  ball.display();
  projectile.display();
  leftPaddle.display();
  rightPaddle.display();

  // Set up loop to handle array of collectible objects (snowflakes)
  for (var i = 0; i < numCollect; i++) {
    collectables[i].update();
    collectables[i].handleCollision(ball);
    collectables[i].display();
  }

  // Scores on appropritate side when ball is off screen
  if (ball.isOffScreen() === 1) {
    scoreRight();
  } else if (ball.isOffScreen() === 2) {
    scoreLeft();
  }

  // If size gets "too" big, game over condition reached
  if (ball.size >= windowWidth && winner!="Right" && winner!="Left") {
    gameOver = true;
  }
  // Calls function to determine winner at endgame
  determineWinner();
}

// scoreLeft()
//
// Updates and display scores, resets the ball to the center
function scoreLeft() {
  ball.reset();
  leftPaddle.updateScore();
}

// scoreRight()
//
// Updates and display scores, resets the ball to the center
function scoreRight() {
  ball.reset();
  rightPaddle.updateScore();
}

// determineWinner()
//
// Verifies scores to determine winner and calls the game over state
function determineWinner() {
  if (leftPaddle.score === winningScore && rightPaddle.score < winningScore) {
    winner = "Left";
    gameOver = true;

  } else if (rightPaddle.score === winningScore && leftPaddle.score < winningScore) {
    winner = "Right";
    gameOver = true;

  } else {
    winner = "Error";
  }
}

// titleScreen()
//
// Sets up title screen elements, prompt text, and appearance elements
function titleScreen() {
  // Style set up, decorative elements
  background(bgRed,bgGreen,bgBlue);
  textFont("Helvetica");
  textSize(width/15);
  textAlign(CENTER,CENTER);
  noStroke();
  fill(255);
  // Decorative elements
  ellipse(width/2,0,width,width/6);
  push();
  fill(0,0,200,20);
  rect(width/2,height*1.05/2,width*8.5/10,height*3.5/6);
  rect(width/2,height*1.05/2,width*8.4/10,height*3.4/6);
  pop();
  makeItSnow();

  // Title screen text, instructions, and prompt to begin game
  text("Welcome to the Snowfight!", width/2, height/3);
  textSize(width/40);
  // Instructions
  text("Scoring snowballs widens your snow fort!", width/2, height*0.9/2);
  push();
  fill(100);
  text("The rocks are sent to DESTROY your fort! Be careful!", width/2, height*1.02/2);
  pop();
  push();
  fill(0,0,139);
  text("Collecting" + " icy " + "snowflakes builds up the snowball!", width/2, height*1.15/2);
  pop();
  textSize(width/70);
  text("Try to build up the snowball as much as you can to see what happens :)", width/2, height*2.6/4);
  // Play prompt
  textSize(width/30);
  text("Press ENTER to play", width/2, height*3/4);
}

// gameOverScreen()
//
// Sets up game over screen, display winner
function gameOverScreen() {
  // Setting up style
  background(bgRed,bgGreen,bgBlue);
  textFont("Helvetica");
  textSize(width/15);
  textAlign(CENTER,CENTER);
  noStroke();
  fill(255);

  // Uses text and styling according to game over condition and prompts for new game
  // winning condition: snowball became too big and overtakes the world
  if (ball.size >= windowWidth) {
    push();
    textSize(width/19);
    background(255);
    noFill();
    stroke(random(0,200));
    strokeWeight(5);
    text("THE SNOWBALL\nTOOK\nOVER\nTHE\nWORLD!!!!\nNO ONE WINS!", width/2, height/2);
    textSize(width/35);
    fill(bgRed,bgGreen,bgBlue);
    noStroke();
    text("Press SHIFT to go back in time!", width/2, height*14/15);
    pop();

    // winning condition: one of the two players get 11 points
  } else {
    push();
    fill(255,20);
    rect(width/2,height*1.05/2,width*8.5/10,height*3.5/6);
    rect(width/2,height*1.05/2,width*8.4/10,height*3.4/6);
    pop();
    makeItSnow();
    push();
    strokeWeight(3);
    stroke(0,0,200,random(0,255));
    noFill();
    textSize(width/15);
    text(winner + " Snow fort WINS!", width/2, height/2);
    noStroke();
    fill(100,120,220);
    textSize(width/30);
    text("Press SHIFT to get your revenge!", width/2, height*3/4);
    pop();
  }

  // Sets the game values to a halt
  ball.vx = 0;
  ball.vy = 0;
  ball.speed = 0;
  projectile.vx = 0;
  projectile.vy = 0;
  projectile.speed = 0;
}

// resetGame()
//
// resets game values and goes back to the title screen
function resetGame() {

  // Resets objects values and positions for new game
  ball.reset();
  projectile.reset();
  rightPaddle.x = width-paddleInset;
  rightPaddle.y = height/2;
  leftPaddle.x = paddleInset;
  leftPaddle.y = height/2;
  ball.gameOver();
  leftPaddle.gameOver();
  rightPaddle.gameOver();

  titleScreen();
}

// keyPressed()
//
// Changes display depending on which key is pressed
// Reset game values for a new game
function keyPressed() {
  // Title screen prompts for ENTER key to begin play
  // Game values are put into movement
  if (keyCode === ENTER) {
    start = true;
    ball.vx = 7;
    ball.vy = 7;
    ball.speed = 7;
    projectile.vx = 5;
    projectile.vy = 5;
    projectile.speed = 5;
    play();
  }

  // Game Over screen prompts for SHIFT key to reset game
  if (keyCode === SHIFT) {
    gameOver = false;
    start = false;
    winner = "Default";
    resetGame();
  }
  return false;
}

// makeItSnow()
//
// Displays falling snow particles using the Snowstorm class
function makeItSnow() {
  // Uses framecount to determine the speed of the falling snowstorm
  snowSpeed = frameCount/80;

  // Create multiple instances of Snowstorm objects
  // Store them in an array
  for (var i = 0; i < random(5); i++) {
    snowflakes.push(new Snowstorm());
  }

  // Update position and display snowflakes for every snowflake within the array
  for (let snowflake of snowflakes) {
    snowflake.update(snowSpeed);
    snowflake.display();
  }
}
