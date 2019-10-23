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
let chicken;

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  creeper = new Predator(100, 100, 5, color(200, 200, 0), 40);
  sheep= new Prey(100, 100, 10, color(255, 100, 10), 50);
  cow = new Prey(100, 100, 8, color(255, 255, 255), 60);
  chicken = new Prey(100, 100, 20, color(255, 255, 0), 10);
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
  chicken.move();

  // Handle the tiger eating any of the prey
  creeper.handleEating(sheep);
  creeper.handleEating(cow);
  creeper.handleEating(chicken);

  // Display all the "animals"
  creeper.display();
  sheep.display();
  cow.display();
  chicken.display();
}
