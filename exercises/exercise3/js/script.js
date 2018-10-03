/******************************************************************************
Where's Sausage Dog? Plus!
by Melissa Lim

An algorithmic version of a Where's Wally searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals.
Added instructional UI, and added stimulating visuals to ending screen.
With randomized sizes and numbers of decoys for added difficulty.
While using do/while loops, and random() and noise() functions.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/

// Position and image of the target we're searching for
var targetX;
var targetY;
var targetImage;
// Velocity and speed of the target we're searching for
var targetVX;
var targetVY;
var targetSpeed = 0;
// Size and proportions of the target we're searching for
var targetSize;
var targetW;
var targetH;

// Time variables for noise function
var timeX;
var timeY;

// The ten decoy images
var decoyImage1;
var decoyImage2;
var decoyImage3;
var decoyImage4;
var decoyImage5;
var decoyImage6;
var decoyImage7;
var decoyImage8;
var decoyImage9;
var decoyImage10;

// The number of decoys to show on the screen, randomly
// chosen from the decoy images
var numDecoys = 200;
// The size of decoys and target
var s;
// Keep track of whether they've won
var gameOver = false;

// preload()
//
// Loads the target and decoy images before the program starts
function preload() {
  targetImage = loadImage("assets/images/animals-target.png");

  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");
}

// setup()
//
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {
  createCanvas(windowWidth,windowHeight);
  background("#ffff00");
  imageMode(CENTER);

  // Setting up variables for target width, height and number of decoys
  targetW = targetImage.width;
  targetH = targetImage.height;
  numDecoys = random(100,200);
  // Randomized variable used for target and decoy sizes
  s = random(0.5,1.5);

  // Use a for loop to draw as many decoys as we need
  for (var i = 0; i < numDecoys; i++) {
    // Choose a random location for this decoy
    var x = random(0,width);
    var y = random(0,height);
    // Generate a random number we can use for probability
    var r = random();
    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    // with randomized sizing to the decoys
    if (r < 0.1) {
      image(decoyImage1,x,y,decoyImage1.width*s,decoyImage1.height*s);
    }
    else if (r < 0.2) {
      image(decoyImage2,x,y,decoyImage2.width*s,decoyImage2.height*s);
    }
    else if (r < 0.3) {
      image(decoyImage3,x,y,decoyImage3.width*s,decoyImage3.height*s);
    }
    else if (r < 0.4) {
      image(decoyImage4,x,y,decoyImage4.width*s,decoyImage4.height*s);
    }
    else if (r < 0.5) {
      image(decoyImage5,x,y,decoyImage5.width*s,decoyImage5.height*s);
    }
    else if (r < 0.6) {
      image(decoyImage6,x,y,decoyImage6.width*s,decoyImage6.height*s);
    }
    else if (r < 0.7) {
      image(decoyImage7,x,y,decoyImage7.width*s,decoyImage7.height*s);
    }
    else if (r < 0.8) {
      image(decoyImage8,x,y,decoyImage8.width*s,decoyImage8.height*s);
    }
    else if (r < 0.9) {
      image(decoyImage9,x,y,decoyImage9.width*s,decoyImage9.height*s);
    }
    else if (r < 1.0) {
      image(decoyImage10,x,y,decoyImage10.width*s,decoyImage10.height*s);
    }
  }

  // Once we've displayed all decoys, we choose a location for the target
  // Doesn't appear underneath the wanted poster UI
  do {
    targetX = random(0,width);
    targetY = random(0,height);
  }
  while (targetX > (width-targetW*1.17-3) && targetY < targetH*0.8+2);

  // And draw it (this means it will always be on top)
  image(targetImage,targetX,targetY,targetW*s,targetH*s);
  console.log("X = " + targetX,"; Y = " + targetY);

  // Wanted Poster (target indication)
  strokeWeight(5);
  stroke(100);
  fill(255);
  rect(width-targetW*1.17-3,2,targetW*1.17,targetH*0.8);
  image(targetImage,width-targetW/2-10,targetH/2.5);
  textSize(25);
  text("WANTED",width-targetW,targetH/2);

  // Setting up target random movement at game over screen
  timeX = random(0,1000);
  timeY = random(0,1000);
}

// draw()
//
// displays screens according to actions took
function draw() {
  if (gameOver) {
    gameOverScreen();
  }
}

// gameOverScreen()
//
// displays winning/game over screen, "YOU WINNED!" text with moving target
function gameOverScreen() {
  // Prepare our typography
  textFont("Helvetica");
  textSize(width/7.5);
  textAlign(CENTER,CENTER);

  // Circle Around Target
  noFill();
  stroke(random(255));
  strokeWeight(width/130);
  ellipse(targetX,targetY,targetW,targetH);

  // Target movement settings
  targetSpeed += random(-1,1);
  targetVX = random(-20,20);
  targetVY = random(-20,20);
  targetX += targetVX*noise(timeX)*targetSpeed;
  targetY += targetVY*noise(timeY)*targetSpeed;
  timeX += 0.01;
  timeY += 0.01;

  // Randomize size
  targetSize = random(-10,10);
  targetW += targetSize;
  targetH += targetSize;

  // Moving target at the game over screen
  image(targetImage,targetX,targetY,targetW,targetH);

  // Screen wrapping
  if (targetX + targetW/2 < 0) {
    targetX += width;
  } else if (targetX - targetW/2 > width) {
    targetX -= width;
  }
  if (targetY + targetH/2 < 0) {
    targetY += height;
  } else if (targetY - targetH/2 > height) {
    targetY -= height;
  }

  // Tell them they won!
  text("YOU WINNED!",width/2,height/2);
}

// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // Check if the mouse is in the x range of the target
  if (mouseX > targetX - targetImage.width/2 && mouseX < targetX + targetImage.width/2) {
    // Check if the mouse is also in the y range of the target
    if (mouseY > targetY - targetImage.height/2 && mouseY < targetY + targetImage.height/2) {
      gameOver = true;
    }
  }
}
