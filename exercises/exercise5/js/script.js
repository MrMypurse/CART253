// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predator
let creeper;
let zombie;
let skeleton;


// The three prey
let sheep;
let sheepImg;
let cow;
let cowImg;
let pig;
let pigImg;

//background
let backgroundImg;

//To end/ start the game
let gameOver;

// preload()
//
//Preload sounds and images
function preload(){
  creeperImg = loadImage("assets/images/creeper.png");
  zombieImg = loadImage("assets/images/zombie.png");
  skeletonImg = loadImage("assets/images/skeleton.png");
  sheepImg = loadImage("assets/images/sheep.png");
  cowImg = loadImage("assets/images/cow.png");
  pigImg = loadImage("assets/images/pig.png");
  backgroundImg = loadImage("assets/images/sky.png");

}
// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  endGame = false;
  creeper = new Predator(100, 100, 5, color(0, 128, 0), 40);
  zombie = new Predator(300, 100, 5, color(0, 128, 0), 40);
  skeleton = new Predator(500, 100, 5, color(0, 128, 0), 40);
  sheep= new Prey(100, 100, 10, color(255,255,255), 30);
  cow = new Prey(100, 100, 8, color(105, 105, 105), 30);
  pig = new Prey(100, 100, 20, color(255, 182, 193), 30);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background
  background(backgroundImg);

  // clear game if game is over
  if (gameOver === true){
    return;
  }

  // Handle input for the tiger
  creeper.directionKeycode1();
  creeper.handleInput();
  zombie.directionKeycode2();
  zombie.handleInput();
  skeleton.directionKeycode3();
  skeleton.handleInput();

  // Move all the "animals"
  creeper.move();
  zombie.move();
  skeleton.move();
  sheep.move();
  cow.move();
  pig.move();

  // Handle the tiger eating any of the prey
  creeper.handleEating(sheep);
  creeper.handleEating(cow);
  creeper.handleEating(pig);

  zombie.handleEating(sheep);
  zombie.handleEating(cow);
  zombie.handleEating(pig);

  skeleton.handleEating(sheep);
  skeleton.handleEating(cow);
  skeleton.handleEating(pig);

  // Display all the "animals"
  creeper.displayCreeper();
  zombie.displayZombie();
  skeleton.displaySkeleton();
  sheep.displaySheep();
  cow.displayCow();
  pig.displayPig();

 // End the game when predator dies
 creeper.endGame();
 zombie.endGame();
 skeleton.endGame();

}
