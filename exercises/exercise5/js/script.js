// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predator
let creeper;

// The three prey
let sheep;
let cow;
let pig;

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  creeper = new Predator(100, 100, 5, color(0, 128, 0), 40);
  sheep= new Prey(100, 100, 10, color(255,255,255), 50);
  cow = new Prey(100, 100, 8, color(105, 105, 105), 60);
  pig = new Prey(100, 100, 20, color(255, 182, 193), 10);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(0);

  // Handle input for the tiger
  creeper.handleInput();

  // Move all the "animals"
  creeper.move();
  sheep.move();
  cow.move();
  pig.move();

  // Handle the tiger eating any of the prey
  creeper.handleEating(sheep);
  creeper.handleEating(cow);
  creeper.handleEating(pig);

  // Display all the "animals"
  creeper.display();
  sheep.display();
  cow.display();
  pig.display();
}
