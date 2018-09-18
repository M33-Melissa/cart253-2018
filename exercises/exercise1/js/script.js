// Exercise 1 - Moving pictures
// Melissa Lim
//
// Code for exercise 1.
// It moves six pictures around on the canvas.
// One moves linearly down the screen.
// One moves linearly from left to right of the canvas.
// One moves toward the mouse cursor with a slight delay.
// One moves along the mouse cursor.
// One moves toward the mouse cursor with a longer delay.
// One moves from left to right in a sine wave function.
// Sine wave function code inspired by this post:
// https://blog.kadenze.com/creative-technology/p5-js-crash-course-recreate-art-you-love/


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

// The image of a crab
var crabImage;
// The current position of the crab image
var crabImageX;
var crabImageY;

// Image of a scared face
var scaredImage;
// The current position of the scared face image
var scaredImageX;
var scaredImageY;

// The image of a bowtie
var bowtieImage;
// The current position of the bowtie image
var bowtieImageX;
var bowtieImageY;

// Image of a balloon
var balloonImage;
// The current position of the balloon image
var balloonImageX;
var balloonImageY;


// preload()
//
// Load the six images we're using before the program starts

function preload() {
  clownImage = loadImage("assets/images/clown.png");
  feltTextureImage = loadImage("assets/images/black-felt-texture.png");
  crabImage = loadImage("assets/images/crab.png");
  scaredImage = loadImage("assets/images/scared.png");
  bowtieImage = loadImage("assets/images/bowtie.png");
  balloonImage = loadImage("assets/images/balloon.png");
}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Setting up variables for weight and height of canvas
  var weight = 640;
  var height = 640;

  // Create our canvas
  createCanvas(weight,height);

  // Start the clown image at the centre of the canvas
  clownImageX = width/2;
  clownImageY = height/2;

  // Start the felt image perfectly off screen above the canvas
  feltTextureImageX = width/2;
  feltTextureImageY = 0 - feltTextureImage.height/2;

  // Start the crab image on the lower left of the canvas
  crabImageX = 0;
  crabImageY = height - crabImage.height/2;

  // Start the scared image at the center of the canvas
  scaredImageX = width/2;
  scaredImageY = height/2;

  // Start the bowtie image at the center of the canvas, below the clown
  bowtieImageX = width/2;
  bowtieImageY = height/2 + clownImage.height/2;

  // Start the across image on the left of the canvas
  balloonImageX = 0 - balloonImage.height/2;
  balloonImageY = width/2;

  // We'll use imageMode CENTER for this script
  imageMode(CENTER);
}


// draw()
//
// Moves the felt image linearly
// Moves the clown face toward the current mouse location
// Moves the crab image linearly on the bottom of the canvas
// Moves the balloon image in a sine wave function from left to right
// Moves the bowtie image toward the mouse location, below the clown
// Moves the scared face along the current mouse location

function draw() {
  // Move the felt image down by increasing its y position
  feltTextureImageY += 1;

  // Display the felt image
  image(feltTextureImage,feltTextureImageX,feltTextureImageY);

  // Move the crab image from left to right by increasing its x position
  crabImageX += 1;

  // Display the crab image going across on the bottom of the canvas
  image(crabImage,crabImageX,crabImageY);

  // Balloon image moves the across image from left to right in a sinusoid

  // Setting up variables to use in the sine wave function
  // Speed rate of the function
  var speed = 0.03;
  // Rate of change every frame count from 0 to the current frame count
  var phase = frameCount * speed;
  // Amplitude, peak deviation (height variation) of the function from 0
  var amp = 100;

  // Balloon moves by increments of 1 on its X position
  balloonImageX += 1;
  // From the middle-left of the canvas, moves on its Y in a sinusoid
  balloonImageY = height/2 + amp * sin(phase);

  // Display balloon image
  image(balloonImage,balloonImageX,balloonImageY);

  // Move the bowtie by moving it 1/30th of its current distance from the mouse
  // While keeping the bowtie below the clown

  // Calculate the distance between the mouse and the bowtie in X and in Y
  var xDistanceBowtie = mouseX - bowtieImageX;
  // Adding half of the clown image height keeps the bowtie right below
  var yDistanceBowtie = mouseY - bowtieImageY + clownImage.height/2;
  // Add 1/30th of the X and Y distance to the bowtie's current (x,y) location
  bowtieImageX += xDistanceBowtie/30;
  bowtieImageY += yDistanceBowtie/30;

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

  // Place scared face on the x and y positions of the mouse
  scaredImageX = mouseX;
  scaredImageY = mouseY;

  // Display the scared image
  image(scaredImage,scaredImageX,scaredImageY);
}
