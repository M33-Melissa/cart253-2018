// Bullet Hell game (Avoid the particles)
// by Melissa Lim
//
// Arrow keys to move the player.
// Avoid red circles (enemies) or else player reduced size and dies.
// Written with JavaScript OOP.

// Variables to contain objects
var player1;
var enemies = [];
var projectiles = [];

// Default number of enemies and projectiles
var numEnemies = 5;
var numProjectiles = 20;

// setup()
//
// Create player object and array of enemies objects
function setup() {
  createCanvas(windowWidth-3,windowHeight-3);
  ellipseMode(CENTER);
  rectMode(CENTER);
  noStroke();

  player1 = new Player(width/2,height-50,5,20,LEFT_ARROW,RIGHT_ARROW,DOWN_ARROW,UP_ARROW);

  for (var j = 0; j < numEnemies; j++) {
    enemies.push(new Enemy(random(0,width),random(-height,0),0,2,20));

    for (var i = 0; i < numProjectiles; i++) {
      projectiles.push(new Projectile(enemies[j].x,enemies[j].y,random(-1,1),random(1,2),5));
    }
  }
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);
  player1.handleInput();
  player1.update();
  player1.display();

  for (var j = 0; j < numEnemies; j++) {
    enemies[j].update();
    enemies[j].display();
    enemies[j].handleCollision(player1);
  }
  
  for (var i = 0; i < projectiles.length; i++) {
    projectiles[i].handleCollision(player1);
    projectiles[i].update();
    projectiles[i].display();
  }

}
