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
var endGame = false;

// Variables for sound and music
var bgMusic;
var shieldSFX;
var endMusic;

function preload() {
  bgMusic = new Audio("assets/sounds/");
  shieldSFX = new Audio("assets/sounds/");
  endMusic = new Audio("assets/sounds/");
}

// setup()
//
// Create player object and collectable objects
function setup() {
  createCanvas(windowWidth,windowHeight);
  ellipseMode(CENTER);
  rectMode(CORNER);
  noStroke();

  player1 = new Player(width/2,height-50,5,20,LEFT_ARROW,RIGHT_ARROW,DOWN_ARROW,UP_ARROW);

  // Blue Umbrella-shaped particle
  shield = new Shield(random(0,width),random(-5*height,0),0,2,15);
  // Yellow Circle, sun particle that grants a power-up
  powerup = new Powerup(random(0,width),random(-2*height,0),0,3,15);
  // Grey set of circles, cloud enemy that damages player
  enemy = new Enemy(random(-width/2,0),random(0, height/4),random(1,3),0,width/8);
  // enemy2 = new Enemy(random(width,width+width/2),random(0, height/4),random(-3,-1),0,width/7);
}

// draw()
//
// Sets up scene and calls appropriate screen methods according to game state
function draw() {
  push();
  // Colors used for gradient background
  var startingColor = color(bgRed,bgGreen,bgBlue);
  var endingColor = color(endRed,endGreen,endBlue);
  for (let i = 0; i <= height; i++) {
    var intermediateColors = map(i, 0, height, 0, 1);
    var strokeColor = lerpColor(startingColor, endingColor, intermediateColors);
    stroke(strokeColor);
    line(0, i, width, i);
  }
  // On-screen Instructions
  fill(255,150);
  noStroke();
  textSize(width/70);
  textAlign(RIGHT,CENTER);
  text("Press SPACE to shoot sunrays!",width-10,height-20);
  textAlign(LEFT,CENTER);
  text("WASD or ARROW KEYS to move",15,30);
  pop();
  // Rain Visuals
  makeItRain();
  // Game Scene
  play();
}

// play()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything (player, shields, arrows, and power-ups).
function play() {
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
}

// keyPressed()
//
// Creates arrow when space is pressed.
// If the player obtained a power-up, shoots 3 arrows in different directions.
function keyPressed() {
  // Pressing Space shoots arrows off the player
  if (keyCode === 32) {
    createArrow(0);
    if (powerup.collided) {
      createArrow(3);
      createArrow(-3);
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
