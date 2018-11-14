// Bullet Hell game (Avoid the particles)
// by Melissa Lim
//
// Arrow keys to move the players

var player1;
var numEnemies = 5;
var enemies = [];

function setup() {
  createCanvas(windowWidth-3,windowHeight-3);
  ellipseMode(CENTER);
  player1 = new Player(width/2,height-50,5,20,LEFT_ARROW,RIGHT_ARROW,DOWN_ARROW,UP_ARROW);

  for (var i = 0; i < numEnemies; i++) {
    enemies.push(new Enemy(random(0,width),random(-height,0),0,2,20));
  }
}

function draw() {
  background(0);
  player1.handleInput();
  player1.update();
  player1.display();

  for (var i = 0; i < numEnemies; i++) {
    enemies[i].update();
    enemies[i].display();
    enemies[i].handleCollision(player1);
  }
}
