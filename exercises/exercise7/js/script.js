// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predator
let player;

// The three prey
let antelope;
let zebra;
let bee;

// Array for prey
let prey = [];

//set up game state
let state = "INSTRUCTION";
// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(1050, 700);
  player = new Predator(width/2, height - 100, 5, color(200, 200, 0), 40);
  for (let i = 0; i < 5; i++) {
  antelope = new Prey(random(0, width), random(0, 30), random(3, 5), color(255, 100, 10), 30);
  prey.push(antelope);
  }
  for (let i = 0; i < 5; i++) {
  zebra = new Prey(random(0, width), random(0, 30), random(3, 5), color(255, 255, 255), 30);
  prey.push(zebra);
  }
  for (let i = 0; i < 5; i++) {
  bee = new Prey(random(0, width), random(0, 30), random(3, 5), color(255, 255, 0), 20);
  prey.push(bee);
  }
}



// draw()
//
// Handles input, movement, eating, and displaying for the system's objects

function draw() {
  // Clear the background to black
  background(0);
  if (state === "INSTRUCTION") {
    displayInstruction();

  } else if (state === "GAMEPLAY") {
    displayGameplay();

  } else if (state === "GAMEOVER") {
    displayGameover();
    return;

  } else if (state === "GAMEWIN") {
    displayGamewin();
    return;
  }
}

//mousePressed()
// start game when mouse is pressed
function mousePressed() {
  if (state === "INSTRUCTION") {
    state = "GAMEPLAY";
  } else if (state === "GAMEOVER" || state === "GAMEWIN") {
    resetGame();
  }
}

function resetGame() {
    state = "GAMEPLAY";
  }


//displayInstruction()
//display instruction screen
function displayInstruction() {
    background(255, 0 , 0);
  }


  //displayGameover()
  //display gameover screen when predator dies
  function displayGameover() {
    image(failImg, 0, 0, 1000, 700);
  }

//displayGamewin()
//tell player that they won after reaching certain score
function displayGamewin() {
    background(0, 255, 0);
  }


//displayGameover()
//display gameover screen when predator dies
function displayGameover() {
    background(0, 0 , 255);
}

//displayGameplay()
//display gameplay: predator, prey , enemy
function displayGameplay() {
  // Handle input for the tiger
  player.handleInput();

  // Move all the "animals"
  player.move();
  for (let i = 0; i < prey.length; i++) {
    prey[i].move();
    // Handle the bee eating any of the prey
    player.handleEating(prey[i]);
    prey[i].display();
  }

  // Handle the tiger eating any of the prey
  player.handleEating(antelope);
  player.handleEating(zebra);
  player.handleEating(bee);

  // Display all the "animals"
  player.display();
}
