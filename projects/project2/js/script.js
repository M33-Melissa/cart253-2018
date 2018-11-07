// OO Pong Derivative, Snowfight themed
// by Melissa Lim
//
// An implementation of Pong with a scoring system
// Ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

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
var bgRed = 135;
var bgGreen = 206;
var bgBlue = 250;
var collectables = [];

// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(windowWidth-3,windowHeight-3);
  rectMode(CENTER);
  ellipseMode(CENTER);
  imageMode(CENTER);
  // Create a ball
  ball = new Ball(width/2,height/2,7,7,20,7);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-paddleInset,height/2,20,60,10,DOWN_ARROW,UP_ARROW);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(paddleInset,height/2,20,60,10,83,87);

  projectile = new Projectile(width/2,height/2,5,5,20,5);

  for (var i = 0; i < 5; i++) {
    collectables.push(new Collectable(random(50,width-50),0,3,3,random(15,40),3));
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
// Sets up play screen, set background, update objects positions, displays and collisions.
// Checks score conditions, determine winner/game over conditions, and handles input
function play() {
  background(bgRed,bgGreen,bgBlue);

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

  // Set up loop to handle array of collectible objects
  for (var i = 0; i < 5; i++) {
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
  if (ball.size >= windowWidth) {
    gameOverScreen();
  }
  // Calls function to determine winner at endgame
  determineWinner();
}

// scoreLeft()
//
// Sets background to red because the left paddle got the point
// Updates and display scores, resets the ball to the center
function scoreLeft() {
  ball.reset();
  leftPaddle.updateScore();
  console.log("L: " + leftPaddle.score);
}

// scoreRight()
//
// Sets background to blue because the right paddle got the point
// Updates and display scores, resets the ball to the center
function scoreRight() {
  ball.reset();
  rightPaddle.updateScore();
  console.log("R: " + rightPaddle.score);
}

// determineWinner()
//
// Verifies scores to determine winner and calls the game over screen
function determineWinner() {
  if (leftPaddle.score === winningScore && rightPaddle.score < winningScore) {
    winner = "Left";
    gameOverScreen();
  } else if (rightPaddle.score === winningScore && leftPaddle.score < winningScore) {
    winner = "Right";
    gameOverScreen();
  } else {
    winner = "Default";
  }
}
// titleScreen()
//
// Sets up title screen, prompt text
function titleScreen() {
  // Style set up
  background(bgRed,bgGreen,bgBlue);
  textFont("Helvetica");
  textSize(width/15);
  textAlign(CENTER,CENTER);
  noStroke();
  fill(255);

  // Title screen text
  text("Welcome to the Snowfight!", width/2, height/2);
  textSize(width/30);
  text("Press ENTER to play", width/2, height*3/4);
}

// gameOverScreen()
//
// Sets up game over screen, display winner
function gameOverScreen() {
  background(bgRed,bgGreen,bgBlue);
  textFont("Helvetica");
  textSize(width/15);
  textAlign(CENTER,CENTER);
  noStroke();
  fill(255);

  // Uses text according to game over condition
  if (ball.size >= windowWidth) {
    textSize(width/22);
    text("THE SNOWBALL TOOK OVER THE WORLD\nNO ONE WINS!", width/2, height/2);
  } else {
    text(winner + " WINS!", width/2, height/2);
  }
  textSize(width/30);
  text("Press SHIFT to play again!", width/2, height*3/4);

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

  // Resets game values for new game
  ball.reset();
  projectile.reset();
  rightPaddle.x = width-paddleInset;
  rightPaddle.y = height/2;
  leftPaddle.x = paddleInset;
  leftPaddle.y = height/2;
  ball.gameOver();
  leftPaddle.gameOver();
  rightPaddle.gameOver();

  // Calls title screen function to be displayed
  titleScreen();
}

// keyPressed()
//
// Changes display depending on which key is pressed
// Reset game values for a new game
function keyPressed() {
  // Title screen prompts for ENTER key to begin play
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
    resetGame();
  }
  return false;
}
