// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predator
let bee;

// The three prey
let lavender;
let poppie;
let sunflower;


// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  bee = new Predator(100, 100, 5, color(252, 215, 3), 80);
  lavender = new Prey(100, 100, 10, color(157, 94, 230), 30);
  poppie = new Prey(100,100,10, color(255, 0, 0), 20);
  sunflower = new Prey(100,100,10, color(237, 155, 47), 40);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(0);

  // Handle input for the
  bee.handleInput();

  // Move all the "animals"
  bee.move();
  lavender.move();
  poppie.move();
  sunflower.move();

  // Handle the bee eating any of the prey
  bee.handleEating(lavender);
  bee.handleEating(poppie);
  bee.handleEating(sunflower);


  // Display all the "animals"
  bee.display();
  lavender.display();
  poppie.display();
  sunflower.display();
}
