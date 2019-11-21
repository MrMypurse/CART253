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

// The health bar and the battery bar
let healthBar;
let batteryBar;

// Array for supply
let supply = [];

//set up game state
let state = "INSTRUCTION";

//menu images and end game images
let backgroundImg;


// preload()
//
//Preload sounds and images
function preload() {
  backgroundImg = loadImage("assets/images/background.png");
}
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
  //create the health bar
  healthBar = new HealthBar(1020, 50, color(252, 215, 3), 30);
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
  player.health = 40;
  for (let i = 0; i < supply.length; i++) {
    supply[i]. reset();
  }
}


//displayInstruction()
//display instruction screen
function displayInstruction() {
  background(255, 0, 0);
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
  image(backgroundImg, 0, 0, 1050, 700);
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
  //Player's health reduces when eating toxic wastes

  //toxicWaste.handleAttacking(player);

  //Check if the player is dead and to end game
  player.endGame();
  // Display the player
  player.display();
  console.log(player.health);

  // display health (health bar)
  healthBar.updateHealth(player.health);
  healthBar.display();
}
