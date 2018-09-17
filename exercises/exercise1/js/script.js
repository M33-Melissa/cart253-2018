// Exercise 1 - Moving pictures
// Pippin Barr
//
// Starter code for exercise 1.
// It moves two pictures around on the canvas.
// One moves linearly down the screen.
// One moves toward the mouse cursor.


// The image of a clown face
var clownImage;
// The current position of the clown face
var clownImageX;
var clownImageY;

// The transparent image of "felt" that wipes down the canvas
var feltTextureImage;
// The current position of the transparent image of "felt"
var feltTextureImageX;
var feltTextureImageY;

// Image of a balloon going across the canvas
var balloonImage;
// The current position of the balloon image
var balloonImageX;
var balloonImageY;

// The image of a bowtie
var bowtieImage;
// The current position of the bowtie image
var bowtieImageX;
var bowtieImageY;

// preload()
//
// Load the three images we're using before the program starts

function preload() {
  clownImage = loadImage("assets/images/clown.png");
  feltTextureImage = loadImage("assets/images/black-felt-texture.png");
  balloonImage = loadImage("assets/images/balloon.png");
  scaredImage = loadImage("assets/images/scared.png");
  bowtieImage = loadImage("assets/images/bowtie.png");
}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);

  // Start the clown image at the centre of the canvas
  clownImageX = width/2;
  clownImageY = height/2;

  // Start the felt image perfectly off screen above the canvas
  feltTextureImageX = width/2;
  feltTextureImageY = 0 - feltTextureImage.height/2;

  // Start the across image on the left of the screen
  balloonImageX = 0 - balloonImage.height/2;
  balloonImageY = width/2;

  // Start the scared image at the center of the canvas
  scaredImageX = width/2;
  scaredImageY = height/2;

  // Start the bowtie image at the center of the canvas, below the clown
  bowtieImageX = width/2;
  bowtieImageY = height/2 + clownImage.height/2;

  // We'll use imageMode CENTER for this script
  imageMode(CENTER);
}


// draw()
//
// Moves the felt image linearly
// Moves the clown face toward the current mouse location

function draw() {

  // Move the felt image down by increasing its y position
  feltTextureImageY += 1;

  // Display the felt image
  image(feltTextureImage,feltTextureImageX,feltTextureImageY);

  // Move the across image from left to right on its x position
  balloonImageX += 1;

  // Display across image
  image(balloonImage,balloonImageX,balloonImageY);

  // Move the bowtie by moving it 1/30th of its current distance from the mouse
  // While keeping the bowtie below the clown

  // Calculate the distance between the mouse and the bowtie in X and in Y
  var xDistanceBowtie = mouseX - bowtieImageX;
  var yDistanceBowtie = mouseY - bowtieImageY + clownImage.height/2;
  // Add 1/30th of the X and Y distance to the bowtie's current (x,y) location
  bowtieImageX += xDistanceBowtie/30;
  bowtieImageY += yDistanceBowtie/30;

  // Place scared image on the x and y positions of the mouse
  scaredImageX = mouseX;
  scaredImageY = mouseY;

  // Display the bowtie image
  image(bowtieImage,bowtieImageX,bowtieImageY);

  // Move the clown by moving it 1/10th of its current distance from the mouse

  // Calculate the distance in X and in Y
  var xDistance = mouseX - clownImageX;
  var yDistance = mouseY - clownImageY;
  // Add 1/10th of the x and y distance to the clown's current (x,y) location
  clownImageX = clownImageX + xDistance/10;
  clownImageY = clownImageY + yDistance/10;

  // Display the clown image
  image(clownImage,clownImageX,clownImageY);

  // Place scared image on the x and y positions of the mouse
  scaredImageX = mouseX;
  scaredImageY = mouseY;

  // Display the scared image
  image(scaredImage,scaredImageX,scaredImageY);
}
