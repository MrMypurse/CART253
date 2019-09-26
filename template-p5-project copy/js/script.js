/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// preload()
//
// Description of preload

let numStars = 1000;
function setup() {
  createCanvas(500,500);
  background(0);
  let starsDrawn = 0;
  while (starsDrawn < numStars) {
    let x = random(0,width);
    let y = random(0,height);
    let starSize = random(1,2);
    let shade = random(100,255);
    stroke(shade);
    rect(x,y,starSize,starSize);
    starsDrawn += 1;
  }
}
function draw() {
}
