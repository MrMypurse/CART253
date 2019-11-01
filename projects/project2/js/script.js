// HoneyBee Simulator
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

//Array for Prey and enemy
let prey = [ ];
let enemy = [ ];

//The 2 enemy
let bugSpray;
let bear;

// keep score of how many flower the player has collected
let score;

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);

  //create 1 bee(predator)
  bee = new Predator(windowWidth/2, windowHeight/2, 3, color(252, 215, 3), 30);

  //create 2 natural enemies
  bear = new NaturalEnemy (random(0,width), random(0, height), 10 , color(0), 30);
  bugSpray = new AltimateEnemy (random(0,width), random(0, height), 20 , color(105,105,105), 30);

  //create 30 preys
  for (let i = 0; i < 10; i++){
      lavender = new Prey(random(0,width), random(0, height), 8, color(157, 94, 230), 15);
      prey.push(lavender);
  }
  for (let i = 0; i < 10; i++){
      poppie = new Prey(random(0,width), random(0, height), 8, color(255, 0, 0), 10);
      prey.push(poppie);
  }
  for (let i = 0; i < 10; i++){
      sunflower = new Prey(random(0,width), random(0, height), 8, color(237, 155, 47), 20);
      prey.push(sunflower);
  }

}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(255);

  //End game when predator is dead
  //if (predator.death() === true){
  //  image(backgroundImg, 0, 0, windowWidth, windowHeight);
  //  return;
  //  else{}

  // Handle input for the bee
  bee.handleInput();


  // Move the bee
  bee.display();
  bee.move();

  //Move all enemies
  bear.display();
  bear.move();
  bear.handleAttack(bee);
  bugSpray.display();
  bugSpray.move();
  bugSpray.handleAttack(bee);

  //Move all preys
  for (let i = 0; i < prey.length; i++){
    prey[i].move();
  // Handle the bee eating any of the prey
    bee.handleEating(prey[i]);
    prey[i].display();
  }



}
