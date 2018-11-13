// Bullet Hell game (Avoid the particles)
// by Melissa Lim
//
// Arrow keys to move the players

var player1;


function setup() {
  createCanvas(windowWidth-3,windowHeight-3);
  ellipseMode(CENTER);
  player1 = new Player(width/2,height-50,5,20,LEFT_ARROW,RIGHT_ARROW,DOWN_ARROW,UP_ARROW);


}

function draw() {
  background(0);
  player1.handleInput();
  player1.update();
  player1.display();
}
