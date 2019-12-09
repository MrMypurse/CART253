// Post-Apocalypse Adventure
//Coding by Janet Sun
//Art by Janet Sun
//Sounds by freesound.org
// In this mini web game, player plays as a super cat who much collect
// supplies, while avoiding toxic wastes in order to sruvive.
// The game uses both keys and mouse to play.

// Our player
let player;

// The supplies, including enemies
let water;
let food;
let battery;
let firstAid;
let toxicWaste;

//The Flashlight
let flashlight;
let flashOn = true;

// The health bar and the battery bar
let healthBar;
let batteryBar;

// Array for supply
let supply = [];

//set up game state
let state = "TITLE";

//set up all images
let waterImg;
let foodImg;
let batteryImg;
let firstAidImg;
let toxicWasteImg;
let backgroundImg;
let titleImg;
let instructionImg;
let winImg;
let loseImg;
let playerImg;
let flashImg;
let batteryLogo;
let heartLogo;
//set up all sounds
let backgroundMusic;
let beepSound;
let clickSound;

// preload()
//
//Preload images
function preload() {
  titleImg = loadImage("assets/images/title.gif");
  instructionImg = loadImage("assets/images/instruction.gif");
  winImg = loadImage("assets/images/win.gif");
  loseImg = loadImage("assets/images/lose.gif");
  backgroundImg = loadImage("assets/images/background.png");
  waterImg = loadImage("assets/images/water.png");
  foodImg = loadImage("assets/images/meat.png");
  batteryImg = loadImage("assets/images/battery.png");
  firstAidImg = loadImage("assets/images/firstaid.png");
  toxicWasteImg = loadImage("assets/images/badMeat.png");
  playerImg = loadImage("assets/images/cat.png");
  flashImg = loadImage("assets/images/flashlightOn.png");
  batteryLogo = loadImage("assets/images/batteryLogo.png");
  healthLogo = loadImage("assets/images/heartLogo.png");
  //Preload sounds
  backgroundMusic = loadSound("assets/sounds/loop.wav");
  beepSound = loadSound("assets/sounds/beep.wav");
  clickSound = loadSound("assets/sounds/click.wav");
  chargeSound = loadSound("assets/sounds/space.wav");
  failSound = loadSound("assets/sounds/fail.wav");

}

// setup()
//
// Sets up a canvas
// Creates objects for the player and three supply
function setup() {
  backgroundMusic.loop();
  createCanvas(1500, 800);

  player = new Player(width / 2, height - 120, 5, 60, 60, playerImg);
  firstAid = new FirstAid(random(0, width), random(0, 30), random(3, 6), 30, firstAidImg);
  battery = new Battery(random(0, width), random(0, 30), random(3, 6), 25, batteryImg);
  flashlight = new Flashlight(0, 0, flashImg);
  //create the health bar
  healthBar = new HealthBar(1420, 50, color(179, 0, 0), 20, healthLogo);
  //create the battery bar
  batteryBar = new BatteryBar(1420, 80, color(0, 8, 255), 20, batteryLogo);

  //create supplies using array
  for (let i = 0; i < 5; i++) {
    water = new Supply(random(0, width), random(0, 30), random(2, 5), 35, waterImg);
    supply.push(water);
  }
  for (let i = 0; i < 5; i++) {
    food = new Supply(random(0, width), random(0, 30), random(2, 5), 30, foodImg);
    supply.push(food);
  }
  for (let i = 0; i < 4; i++) {
    toxicWaste = new Waste(random(0, width), random(0, 30), random(2, 6), 40, toxicWasteImg);
    supply.push(toxicWaste);
  }
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects

function draw() {
  // Clear the background to black
  background(0);
  if (state === "TITLE") {
    displayTitle();
  } else if (state === "INSTRUCTION") {
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
  clickSound.play();
  if (state === "TITLE") {
    state = "INSTRUCTION";
  } else if (state === "INSTRUCTION") {
    state = "GAMEPLAY";
  } else if (state === "GAMEOVER" || state === "GAMEWIN") {
    resetGame();
  }
}

//resetGame()
// restart game by resetting player and supplies
function resetGame() {
  state = "GAMEPLAY";
  backgroundMusic.stop();
  backgroundMusic.loop();
  player.x = width / 2;
  player.y = height - 120;
  player.health = 50;
  player.score = 0;
  player.batteryLevel = 50;
  for (let i = 0; i < supply.length; i++) {
    supply[i].reset();
  }
}

//displayTitle()
//display title screen
function displayTitle() {
  image(titleImg, width / 2, height / 2, 1500, 800);

}
//displayInstruction()
//display instruction screen
function displayInstruction() {
  image(instructionImg, width / 2, height / 2, 1500, 800);

}

//displayGamewin()
//tell player that they won after reaching certain score
function displayGamewin() {
  image(winImg, width / 2, height / 2, 1500, 800);
}


//displayGameover()
//display gameover screen when player dies
function displayGameover() {
  image(loseImg, width / 2, height / 2, 1500, 800);
}

//displayGameplay()
//display gameplay: player, supply , enemy
function displayGameplay() {
  image(backgroundImg, width / 2, height / 2, 1500, 800);

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

  //Display firstAid kit
  firstAid.move();
  firstAid.display();

  //Display battery
  battery.move();
  battery.display();

  // Handle the player collecting any of the supply
  player.handleEating(water);
  player.handleEating(food);
  player.handleCharging(battery);
  player.handleHealing(firstAid);

  //Check if the player is dead and to end game
  player.endGame();
  // Display the player
  player.display();

  //display the flashlight
  flashlight.display();

  // display health (health bar)
  healthBar.updateHealth(player.health);
  healthBar.display();

  //display flashlight battery (battery bar)
  batteryBar.updateBattery(player.batteryLevel);
  batteryBar.display();
}
