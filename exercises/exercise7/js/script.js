// player-supply Simulation
// by Pippin Barr
//
// Creates a player and three supply (of different sizes and speeds)
// The player chases the supply using the arrow keys and consumes them.
// The player loses health over time, so must keep eating to survive.

// Our player
let player;

// The four supply
let water;
let food;
let battery;
let firstAid;
let toxicWaste;

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
  player = new Player(width / 2, height - 100, 5, color(255, 255, 255), 40);
  for (let i = 0; i < 5; i++) {
    water = new Supply(random(0, width), random(0, 30), random(2, 5), color(166, 236, 255), 30);
    supply.push(water);
  }
  for (let i = 0; i < 5; i++) {
    food = new Supply(random(0, width), random(0, 30), random(2, 5), color(242, 177, 65), 30);
    supply.push(food);
  }
  for (let i = 0; i < 2; i++) {
    battery = new Supply(random(0, width), random(0, 30), random(2, 5), color(66, 48, 255), 20);
    supply.push(battery);
  }
  for (let i = 0; i < 2; i++) {
    firstAid = new Supply(random(0, width), random(0, 30), random(2, 5), color(48, 255, 55), 20);
    supply.push(firstAid);
  }
  for (let i = 0; i < 2; i++) {
    toxicWaste = new Waste(random(0, width), random(0, 30), random(2, 5), color(196, 48, 255), 20);
    supply.push(toxicWaste);
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
  // Handle input for the player
  player.handleInput();

  // Move all the supplies
  player.move();
  for (let i = 0; i < supply.length; i++) {
    supply[i].move();
    // Handle the bee eating any of the supply
    player.handleEating(supply[i]);
    supply[i].display();
  }

  // Handle the player collecting any of the supply
  player.handleEating(water);
  player.handleEating(food);
  player.handleEating(battery);
  player.handleEating(firstAid);
  // Nuclear waste and monster attack the Player
  toxicWaste.handleAttack(player);


  // Display all the "animals"
  player.display();
}
