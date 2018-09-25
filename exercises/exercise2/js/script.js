/*******************************************************************

Exercise 2 - The Artful Dodger
Melissa Lim

Code for exercise 2.
Reverse Bowling Game.
You're a bowling pin that tries to avoid incoming bowling balls.
The last pin standing, avoiding the SPARE score.

*******************************************************************/

// The position and size of our avatar circle
var avatarX;
var avatarY;
var avatarSize = 50;

var avatarSizeIncrease = 0;

// The speed and velocity of our avatar circle
var avatarSpeed = 10;
var avatarVX = 0;
var avatarVY = 0;

var avatarSpeedIncrease = 0;

// The position and size of the enemy circle
var enemyX;
var enemyY;
var enemySize = 50;
// How much bigger the enemy circle gets with each successful dodge
var enemySizeIncrease = 5;

// The speed and velocity of our enemy circle
var enemySpeed = 5;
var enemyVX = 5;
// How much bigger the enemy circle gets with each successful dodge
var enemySpeedIncrease = 0.5;

// How many dodges the player has made
var dodges = 0;

// Background RGB
var bgR = 33;
var bgG = 17;
var bgB = 99;

// Enemy default color is grey
var randR = 50;
var randG = 50;
var randB = 50;


// setup()
//
// Make the canvas, position the avatar and anemy
function setup() {
  // Create our playing area
  createCanvas(windowWidth-3.5, windowHeight-3.5);

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);

  // Default typography settings
  textSize(60);
  textAlign(CENTER,CENTER);
  textFont('Courier New');
  textStyle(BOLD);

  // No stroke so it looks cleaner
  noStroke();
}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {
  // A magenta background with darker lane borders
  background(bgR,bgG,bgB);
  fill(bgR-20,bgG-20,bgB-20);
  rect(0,height-height/15,width,height/15);
  rect(0,0,width,height/15);

  // Displays a rectangle background for the Score
  // On the upper center of the canvas
  fill(bgR*2,bgG*2,bgB*2,80);
  rect(width/2-70,0,140,75);
  fill(bgR*2,bgG*2,bgB*2,200);
  rect(width/2-60,0,120,65);
  // Display number of dodges in white
  textSize(60);
  textAlign(CENTER,CENTER);
  fill(240);
  text(dodges,width/2,35);

  // Display Disco Mode prompt
  textSize(16);
  textAlign(RIGHT,CENTER);
  text('Press \'D\' for Disco Mode',width-10,height-10);

  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

  // Move the avatar according to its calculated velocity
  avatarX += avatarVX;
  avatarY += avatarVY;

  // The enemy always moves at enemySpeed (which increases)
  enemyVX = enemySpeed;
  // Update the enemy's position based on its velocity
  enemyX += enemyVX;

  for(var x = 0; x < touches.length; x++) {
    avatarX = mouseX;
    avatarY = mouseY;
  }

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");
    // Resets scene
    reset();
    // Resets to a random color
    randColor();

  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    fill(250,0,0);
    for (var x = 0; x <= height; x++) {
      text("SPARE!",width/2,0);
    }
    // Resets scene
    reset();
    // Resets to a random color
    randColor();
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    dodges += 1;
    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0,height);
    // Increase the enemy's speed and size to make the game harder
    randSpeedSize();
    enemySpeed += enemySpeedIncrease;
    avatarSpeed += avatarSpeedIncrease;
    enemySize += enemySizeIncrease;
    avatarSize += avatarSizeIncrease;
    // Resets to a random color
    randColor();
  }

  // Display the current number of successful in the console
  console.log(dodges);

  // The player has a red border
  fill(255,0,0);
  // Draw the border as a circle
  ellipse(avatarX,avatarY,avatarSize,avatarSize);
  // The player is a white pin seen from the top view
  fill(230);
  // Draw the player as a circle
  ellipse(avatarX,avatarY-avatarSize/12,avatarSize/1.3,avatarSize/1.3);

  // The enemy starts off grey
  fill(randR,randG,randB);
  // Draw the enemy as a circle bowling ball
  ellipse(enemyX,enemyY,enemySize,enemySize);
  // Adds bowling ball details as 3 darker circles on the top
  fill(randR-50,randG-50,randB-50);
  ellipse(enemyX+enemySize/3.5,enemyY-enemySize/4,enemySize/5,enemySize/5);
  ellipse(enemyX+enemySize/11,enemyY-enemySize/9,enemySize/5,enemySize/5);
  ellipse(enemyX,enemyY-enemySize/3,enemySize/5,enemySize/5);

}

// reset()
//
// Resets sizes, speeds and positions for new scene
function reset() {
  // Reset the enemy's position
  enemyX = 0;
  enemyY = random(0,height);
  // Reset the avatar and enemy's sizes and speeds
  enemySize = 50;
  avatarSize = 50;
  enemySpeed = 5;
  avatarSpeed = 5;
  // Reset the avatar's position
  avatarX = width/2;
  avatarY = height/2;
  // Reset the dodge counter
  dodges = 0;
}

// randColor()
//
// Creates random RGB values to generate random colors.
function randColor() {
      randR = random(50,200);
      randG = random(50,200);
      randB = random(50,200);
}

// randSpeed()
//
// Creates a random number to generate random speed increments
function randSpeedSize() {
  // Enemy speed and size randomized increments
  if (enemySpeed < 4) {
    enemySpeedIncrease = random(0,3);
  } else {
    enemySpeedIncrease = random(-3,3);
  }
  if (enemySize < 50) {
    enemySizeIncrease = random(0,20);
  } else {
  enemySizeIncrease = random(-15,20);
  }
  // Avatar speed and size randomized increments
  if (avatarSpeed < 5) {
    avatarSpeedIncrease = random(0,4);
  } else {
    avatarSpeedIncrease = random(-4,4);
  }
  if (avatarSize < 50) {
    avatarSizeIncrease = random(0,20);
    } else {
    avatarSizeIncrease = random(-15,20);
  }
}
// keyPressed()
//
// Activates Disco Mode, changing background colors and speeds up
function keyPressed() {
  if (key === 'd') {
    avatarSpeed++;
    enemySpeed++;
    bgR = random(10,150);
    bgG = random(10,150);
    bgB = random(10,150);
  }
  return false;
}

// function touchMoved() {
//   avatarX = mouseX;
//   avatarY = mouseY;
//   return false;
// }

function mouseDragged() {
  return false;
}

// function windowResized() {
//   resizeCanvas(windowWidth-3.5, windowHeight-3.5);
// }
