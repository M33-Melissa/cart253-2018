/*****************

Exercise 0 - Spiritual Self-Portrait
Melissa Lim
11 September 2018

Using p5's set of shape and colour functions
to draw a head that spiritually ressembles me.

******************/

// setup()
//
// Draws a face on a created canvas.

function setup() {
  // Setting up variables to use for the size of the canvas and colours
  var width = 500;
  var height = 545;
  var bgR = 176;
  var bgG = 126;
  var bgB = 247;
  var hairR = 47;
  var hairG = 7;
  var hairB = 76;
  var beigeR = 252;
  var beigeG = 244;
  var beigeB = 227;
  var brownR = 56;
  var brownG = 37;
  var brownB = 0;
  var shadeR = 244;
  var shadeG = 216;
  var shadeB = 171;

  // Set up the canvas with a gradient light purple background
  // In superposed rectangle frames of various sizes.
  createCanvas(width,height);
  background(bgR,bgG,bgB,20);
  noStroke();
  rectMode(CENTER);
  fill(bgR,bgG,bgB,20);
  rect(width/2,height/2,width-25,height-25);
  rect(width/2,height/2,width-25,height-25*5);
  fill(bgR,bgG,bgB,40);
  rect(width/2,height/2,width-25*2,height-25*2);
  rect(width/2,height/2,width-25*2,height-25*4);
  fill(bgR,bgG,bgB,60);
  rect(width/2,height/2,width-25*3,height-25*3);
  fill(bgR,bgG,bgB,80);
  rect(width/2,height/2,width-25*4,height-25*4);
  rect(width/2,height/2,width-25*4,height-25*2);
  fill(bgR,bgG,bgB,100);
  rect(width/2,height/2,width-25*5,height-25*5);
  rect(width/2,height/2,width-25*5,height-25);

  // Draw the head

  // Draw the dark purple hair with strands on the sides and shadings
  fill(hairR,hairG,hairB);
  arc(width/2,250,330,360,HALF_PI+QUARTER_PI,QUARTER_PI);
  fill(hairR,hairG,hairB,50);
  arc(width/2,250,335,365,HALF_PI+QUARTER_PI-0.01,QUARTER_PI+0.01);
  // Left strand of hair
  fill(hairR,hairG,hairB);
  arc(190,350,110,250,HALF_PI,PI+HALF_PI);
  fill(hairR,hairG,hairB,50);
  arc(190,350,115,255,HALF_PI-0.01,PI+HALF_PI+0.01,OPEN);
  // Right strand of hair
  fill(hairR,hairG,hairB);
  arc(310,350,110,250,PI+HALF_PI,HALF_PI);
  fill(hairR,hairG,hairB,50);
  arc(310,350,115,255,PI+HALF_PI-0.01,HALF_PI+0.01,OPEN);

  // Draws the ear beige and shading
  fill(beigeR,beigeG,beigeB);
  ellipse(136,258,50,65);
  // Shading in ear
  stroke(shadeR,shadeG,shadeB,90);
  fill(shadeR,shadeG,shadeB,160);
  ellipse(136,258,35,45);

  // Draws the shape of the face in a beige colour with shadings
  //shadings
  ellipse(253,251,241,281);
  fill(beigeR, beigeG, beigeB);
  ellipse(252,250,240,280);

  // Draws her right eye
  // White of the eye (lower part)
  fill(250);
  noStroke();
  arc(192,194,100,100,QUARTER_PI,QUARTER_PI+HALF_PI,OPEN);
  // Eyeliner, black outline to the (upper) white of the eye
  stroke(0);
  strokeWeight(3);
  strokeCap(PROJECT);
  arc(192,265,100,100,PI+QUARTER_PI,PI+QUARTER_PI+HALF_PI,OPEN);
  // Iris, dark brown
  stroke(0);
  fill(brownR,brownG,brownB);
  ellipse(192,230,27,27);
  // Pupil, black
  fill(0);
  ellipse(192,230,5,5);
  // Highlight, white
  fill(250);
  noStroke();
  ellipse(182,224,10,10);

  // Draws her left eye
  // White of the eye (lower part)
  noStroke();
  arc(310,194,100,100,QUARTER_PI,QUARTER_PI+HALF_PI,OPEN);
  // Eyeliner, black outline to the (upper) white of the eye
  stroke(0);
  strokeWeight(3);
  strokeCap(PROJECT);
  arc(310,265,100,100,PI+QUARTER_PI,PI+QUARTER_PI+HALF_PI,OPEN);
  // Iris, dark brown
  stroke(0);
  fill(brownR, brownG, brownB);
  ellipse(310,230,27,27);
  // Pupil, black
  fill(0);
  ellipse(310,230,5,5);
  // Highlight, white
  fill(250);
  noStroke();
  ellipse(300,224,10,10);

  // Draws her dark brown eyebrows
  // Her left eyebrow
  noFill();
  stroke(brownR,brownG,brownB,230);
  strokeWeight(4);
  strokeCap(SQUARE);
  arc(303,260,150,150,PI+QUARTER_PI+0.35,PI+QUARTER_PI+HALF_PI);
  // Her right eyebrow
  arc(199,260,150,150,PI+QUARTER_PI,PI+QUARTER_PI+HALF_PI-0.35);

  // Draws dark purple colored hair on top of face (bangs) and shadings
  // Shadings
  noStroke();
  fill(hairR, hairG, hairB,120);
  // Right part shadow
  arc(width/2,251,236,300,PI+0.23,0-QUARTER_PI+0.1,OPEN);
  // Left part shadow
  arc(width/2,251,250,300,PI+HALF_PI+0.3,0-0.24,OPEN);
  fill(hairR, hairG, hairB);
  // Right part hair
  arc(width/2,250,280,320,PI+0.15,0-QUARTER_PI+0.1,OPEN);
  // Left part hair
  arc(width/2,250,280,320,PI+HALF_PI+0.2,0-0.1,OPEN);

  // Draws a nose by shadow outline
  fill(shadeR, shadeG, shadeB);
  // Top shadow
  triangle(267,299,253,252,271,292);
  // Bottom shadow
  triangle(247,303,270,290,266,300);

  // Draws a dark brown beauty mark
  noStroke();
  fill(brownR, brownG, brownB);
  ellipse(330,330,5,5);

  // Draws a mouth
  // Inside of mouth, dark pink
  fill(221, 108, 108);
  arc(width/2,330,65,60,0-0.2,PI+0.2,CHORD);
  // Tongue, light pink
  fill(255, 183, 183);
  arc(229,389,100,100,PI+QUARTER_PI+0.2,0-QUARTER_PI+0.4,OPEN);
  // Teeth, white
  fill(250);
  arc(width/2,271,132,132,QUARTER_PI+0.15,HALF_PI+QUARTER_PI-0.15,OPEN);
  // Shape corretion, beige
  strokeWeight(20);
  stroke(beigeR, beigeG, beigeB);
  noFill();
  arc(width/2,324,86,94,0-0.2,PI+0.2,CHORD);

  // Draws lips with red lipstick
  strokeWeight(2);
  stroke(221, 79, 79);
  noFill();
  arc(width/2,330,65,60,0-0.2,PI+0.2,CHORD);
}


// draw()
//
// Empty and is not used for the moment.

function draw() {

}
