// player-supply Simulation
// by Pippin Barr
//
// Creates a player and three supply (of different sizes and speeds)
// The player chases the supply using the arrow keys and consumes them.
// The player loses health over time, so must keep eating to survive.

// Our player
let player;

// The three supply
let antelope;
let zebra;
let bee;

// Array for supply
let supply = [];

//set up game state
let state = "INSTRUCTION";
// setup()
//
// Sets up a canvas
// Creates objects for the player and three supply
function setup() {
  createCanvas(1050, 700);
  player = new Player(width / 2, height - 100, 5, color(200, 200, 0), 40);
  for (let i = 0; i < 5; i++) {
    antelope = new Supply(random(0, width), random(0, 30), random(3, 5), color(255, 100, 10), 30);
    supply.push(antelope);
  }
  for (let i = 0; i < 5; i++) {
    zebra = new Supply(random(0, width), random(0, 30), random(3, 5), color(255, 255, 255), 30);
    supply.push(zebra);
  }
  for (let i = 0; i < 5; i++) {
    bee = new Supply(random(0, width), random(0, 30), random(3, 5), color(255, 255, 0), 20);
    supply.push(bee);
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
  background(255, 0, 0);
}


//displayGameover()
//display gameover screen when player dies
function displayGameover() {
  image(failImg, 0, 0, 1000, 700);
}

//displayGamewin()
//tell player that they won after reaching certain score
function displayGamewin() {
  background(0, 255, 0);
}


//displayGameover()
//display gameover screen when player dies
function displayGameover() {
  background(0, 0, 255);
}

//displayGameplay()
//display gameplay: player, supply , enemy
function displayGameplay() {
  // Handle input for the tiger
  player.handleInput();

  // Move all the "animals"
  player.move();
  for (let i = 0; i < supply.length; i++) {
    supply[i].move();
    // Handle the bee eating any of the supply
    player.handleEating(supply[i]);
    supply[i].display();
  }

  // Handle the tiger eating any of the supply
  player.handleEating(antelope);
  player.handleEating(zebra);
  player.handleEating(bee);

  // Display all the "animals"
  player.display();
}
