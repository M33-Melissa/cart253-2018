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
  //Set up the canvas with a light purple background.
  createCanvas(500,550);
  background(244, 239, 249);

  //Draw the head

  //Draw the dark purple hair with strands on the sides and shadings
  noStroke();
  fill(47,7,76);
  arc(250,250,330,360,HALF_PI+QUARTER_PI,QUARTER_PI);
  fill(47,7,76,50);
  arc(250,250,335,365,HALF_PI+QUARTER_PI-0.01,QUARTER_PI+0.01);

  fill(47,7,76);
  arc(190,350,110,250,HALF_PI,PI+HALF_PI);
  fill(47,7,76,50);
  arc(190,350,115,255,HALF_PI-0.01,PI+HALF_PI+0.01,OPEN);

  fill(47,7,76);
  arc(310,350,110,250,PI+HALF_PI,HALF_PI);
  fill(47,7,76,50);
  arc(310,350,115,255,PI+HALF_PI-0.01,HALF_PI+0.01,OPEN);

  //Draws the ear and shading
  fill(252, 244, 227);
  ellipse(136,258,50,65);
  //Shading in ear
  stroke(244, 216, 171,70);
  fill(244, 216, 171,160);
  ellipse(136,258,35,45);

  //Draws the shape of the face in a beige colour with shadings
  fill(209, 187, 142,200);
  ellipse(253,251,241,281);
  fill(252, 244, 227);
  ellipse(252,250,240,280);

  //Draws her right eye
  fill(250);
  noStroke();
  arc(192,194,100,100,QUARTER_PI,QUARTER_PI+HALF_PI,OPEN);
  //Eyeliner
  stroke(0);
  strokeWeight(3);
  strokeCap(ROUND);
  arc(192,265,100,100,PI+QUARTER_PI,PI+QUARTER_PI+HALF_PI,OPEN);
  //Iris
  stroke(0);
  fill(56, 37, 0);
  ellipse(192,230,27,27);
  //Pupil
  fill(0);
  ellipse(192,230,5,5);
  //Highlight
  fill(250);
  noStroke();
  ellipse(182,224,10,10);

  //Draws her left eye
  noStroke();
  arc(310,194,100,100,QUARTER_PI,QUARTER_PI+HALF_PI,OPEN);
  //Eyeliner
  stroke(0);
  strokeWeight(3);
  strokeCap(ROUND);
  arc(310,265,100,100,PI+QUARTER_PI,PI+QUARTER_PI+HALF_PI,OPEN);
  //Iris
  stroke(0);
  fill(56, 37, 0);
  ellipse(310,230,27,27);
  //Pupil
  fill(0);
  ellipse(310,230,5,5);
  //Highlight
  fill(250);
  noStroke();
  ellipse(300,224,10,10);

  //Draws her eyebrows
  //Her left eyebrow
  noFill();
  stroke(56,37,0,230);
  strokeWeight(4);
  strokeCap(SQUARE);
  arc(303,260,150,150,PI+QUARTER_PI+0.35,PI+QUARTER_PI+HALF_PI);
  //Her right eyebrow
  noFill();
  stroke(56,37,0,230);
  strokeWeight(4);
  strokeCap(SQUARE);
  arc(199,260,150,150,PI+QUARTER_PI,PI+QUARTER_PI+HALF_PI-0.35);

  //Draws hair on top of face, bangs, and shadings
  //Shadings
  noStroke();
  fill(25, 3, 40,120);
  //Right part shadow
  arc(250,251,236,300,PI+0.23,0-QUARTER_PI+0.1,OPEN);
  //Left part shadow
  arc(250,251,250,300,PI+HALF_PI+0.3,0-0.24,OPEN);
  //Dark purple colored hair
  fill(47, 7, 76);
  //Right part hair
  arc(250,250,280,320,PI+0.15,0-QUARTER_PI+0.1,OPEN);
  //Left part hair
  arc(250,250,280,320,PI+HALF_PI+0.2,0-0.1,OPEN);

  //Draws a nose by shadow outline
  fill(244, 216, 171);
  //Top shadow
  triangle(267,299,253,252,271,292);
  //Bottom shadow
  triangle(247,303,270,290,266,300);

  //Draws a beauty mark
  noStroke();
  fill(56, 37, 0);
  ellipse(330,330,5,5);

  //Draws a mouth
  //Inside of mouth
  fill(221, 108, 108);
  arc(250,330,65,60,0-0.2,PI+0.2,CHORD);
  //Tongue
  fill(255, 183, 183);
  arc(229,389,100,100,PI+QUARTER_PI+0.2,0-QUARTER_PI+0.4,OPEN);
  //Teeth
  fill(250);
  arc(250,271,132,132,QUARTER_PI+0.15,HALF_PI+QUARTER_PI-0.15,OPEN);
  //Shape corretion
  strokeWeight(20);
  stroke(252, 244, 227);
  noFill();
  arc(250,324,86,94,0-0.2,PI+0.2,CHORD);

  //Draws lips with red lipstick
  strokeWeight(2);
  stroke(221, 79, 79);
  noFill();
  arc(250,330,65,60,0-0.2,PI+0.2,CHORD);
}


// draw()
//
// Empty and is not used for the moment.

function draw() {

}
