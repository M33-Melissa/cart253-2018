// Basic OO Pong
// by Pippin Barr
//
// A primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
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
var winningScore = 2;

// How far in from the walls the paddles should be drawn on x
var paddleInset = 20;

// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(windowWidth-3,windowHeight-3);
  rectMode(CENTER);
  ellipseMode(CENTER);
  // Create a ball
  ball = new Ball(width/2,height/2,7,7,20,7);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-paddleInset,height/2,20,60,10,DOWN_ARROW,UP_ARROW);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(paddleInset,height/2,20,60,10,83,87);

  projectile = new Projectile(width/2,height/2,5,5,20,5);
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
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
// Sets up play screen
function play() {
  background(0);

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

  if (ball.isOffScreen() === 1) {
    scoreRight();
  } else if (ball.isOffScreen() === 2) {
    scoreLeft();
  }

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
// Sets up title screen
function titleScreen() {
  background(255);
  textFont("Helvetica");
  textSize(width/15);
  textAlign(CENTER,CENTER);

  noStroke();
  fill(0);
  text("Welcome to PONG", width/2, height/2);
  textSize(width/20);
  text("Press ENTER to play", width/2, height*3/4);
}

// gameOverScreen()
//
// Sets up game over screen, display winner
function gameOverScreen() {
  background(255);
  textFont("Helvetica");
  textSize(width/15);
  textAlign(CENTER,CENTER);

  noStroke();
  fill(0);
  text(winner + " WINS!", width/2, height/2);
  textSize(width/20);
  text("Press SHIFT to play again!", width/2, height*3/4);
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
function keyPressed() {
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

  if (keyCode === SHIFT) {
    gameOver = false;
    start = false;
    resetGame();
  }
  return false;
}
