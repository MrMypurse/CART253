// Exercise 1 - Movement
// Pippin Barr
//
// Starter code for exercise 1.
// Draws a moving square and circle that intersect
// in the middle of the canvas.

// The current position and size of the circle
let circleX;
let circleY;
let circleSize = 100;

// The current position and size of the square
let squareX;
let squareY;
let squareSize = 100;

//the current position and size of the text
let textX;
let textY;

// preload()
//
// Nothing here

function preload() {

}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);

  // Start the circle off screen to the bottom left
  // We divide the size by two because we're drawing from the center
  circleX = -circleSize/2;
  circleY = height + circleSize/2;

  // Start the square off screen to the bottom right
  // We divide the size by two because we're drawing from the center
  squareX = width + squareSize/2;
  squareY = height + squareSize/2;

  //Start the text off screen to the middle right
  textX = 0;
  textY = 0;

  // We'll draw rectangles from the center
  rectMode(CENTER);

}


// draw()
//
// Change the circle and square's positions so they move
// Draw the circle and square on screen

function draw() {
  // We don't fill the background so we get a drawing effect

  // Move circle up and to the right
  circleX += 1;
  circleY -= 1;
  // Make the circle transparent green
  noStroke();
  fill(77, 255, 77,10);
  // Display the circle
  ellipse(circleX,circleY,circleSize,circleSize);

  // Move square up and to the left
  squareX -= 1;
  squareY -= 1;
  // Make the square transparent yellow
  noStroke();
  fill(255, 255, 0, 20);
  // Display the square
  rect(squareX,squareY,squareSize,squareSize);

  //Add text
  textX += 1;
  textSize(80);
  stroke(255);
  fill(255, 102, 102, 70);
  text('BeepBeep', textX, height/2);

  //Add another text
  textY +=1;
  textSize(90);
  stroke(255);
  fill(51, 204, 255,70);
  text('lettuce', width/2, textY);

  //load image



}
