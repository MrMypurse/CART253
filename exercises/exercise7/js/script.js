// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predator
let tiger;

// The three prey
let antelope;
let zebra;
let bee;

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(1050, 700);
  tiger = new Predator(width/2, height - 100, 5, color(200, 200, 0), 40);
  antelope = new Prey(random(0, width), 10, 3, color(255, 100, 10), 50);
  zebra = new Prey(random(0, width), 10, 3, color(255, 255, 255), 60);
  bee = new Prey(random(0, width), 10, 3, color(255, 255, 0), 10);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(0);

  // Handle input for the tiger
  tiger.handleInput();

  // Move all the "animals"
  tiger.move();
  antelope.move();
  zebra.move();
  bee.move();

  // Handle the tiger eating any of the prey
  tiger.handleEating(antelope);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);

  // Display all the "animals"
  tiger.display();
  antelope.display();
  zebra.display();
  bee.display();
}
