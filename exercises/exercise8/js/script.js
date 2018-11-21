// Bullet Hell game (Avoid the particles)
// by Melissa Lim
//
// Arrow keys to move the player.
// Adding collectables to modify gameplay.
// This prototype focuses on theme, appearance and collectables (power-ups).
// Collecting blue umbrellas (Shield) grants an umbrella shield that will be
// useful against particles.
//
// Written with JavaScript OOP.

// Variables to contain player and arrow objects.
var player1;
var arrows = [];
var shield;
var powerup;
var raining = [];

var bgRed = 135;
var bgGreen = 206;
var bgBlue = 235;
var arrowVX;
var arrowHeight = 20;

// setup()
//
// Create player object and array of enemies objects
function setup() {
  createCanvas(windowWidth,windowHeight);
  ellipseMode(CENTER);
  rectMode(CENTER);
  noStroke();

  player1 = new Player(width/2,height-50,5,20,LEFT_ARROW,RIGHT_ARROW,DOWN_ARROW,UP_ARROW);


  shield = new Shield(random(0,width),random(-2*height,0),0,2,15);

  // for (var i = 0; i < 5; i++) {
  //   powerup.push(new Powerup(random(0,width),random(-2*height,0),0,3,20));
  // }
  powerup = new Powerup(random(0,width),random(-2*height,0),0,3,15);
}

// createArrow()
//
// Creates arrows shooting up when spacebar is pressed in keyPressed()
function createArrow(arrowVX) {
  arrows.push(new Arrow(player1.x,player1.y-player1.size*1.5,arrowVX,-10,player1.size*0.5,arrowHeight));
}

// draw()
//
// Calls appropriate screen methods according to game state
function draw() {
  push();
  var c1 = color(bgRed,bgGreen,bgBlue);
  var c2 = color(0,72,102);
  for (let i = 0; i <= height; i++) {
    var inter = map(i, 0, height, 0, 1);
    var c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, i, width, i);
  }
  pop();
  makeItRain();
  play();
}

// play()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything (player, enemies, projectiles).
// Verifies end game condition
function play() {
  player1.handleInput();
  player1.update();
  player1.display();

  // Update and display arrow values
  shield.update();
  shield.display(player1);
  shield.handleCollision(player1);

  powerup.update();
  powerup.display();
  powerup.handleCollision(player1);
  // Update and display arrow values
  for (var i = 0; i < arrows.length; i++) {
    arrows[i].update();
    if (arrows.length > 0) {
      arrows[i].display();
    }
  }
}

// keyPressed()
//
// Changes display depending on which key is pressed
function keyPressed() {

  // Pressing Space shoots arrows off the player
  if (keyCode === 32) {
    createArrow(0);
    if (powerup.collided) {
      createArrow(5);
      createArrow(-5);
    }
  }

  return false;
}

function makeItRain() {
  push();
  ellipseMode(RADIUS);
  noFill();
  if (raining.length < 100) {
    raining.push(new Rain());
  }
  for (var i = 0; i < raining.length; i++) {
    raining[i].update();
    raining[i].display();
    raining[i].handleCollision(shield,player1);
  }
  pop();
}
