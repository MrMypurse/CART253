// HoneyBee Simulator
// Art by Janet Sun
// Program by Janet Sun
// Sound by freesound.org
// Creates a bee and three types of flower
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predator and its image
let bee;
let beeImg;

// The three prey and their images
let lavender;
let poppie;
let sunflower;
let lavenderImg;
let poppieImg;
let sunflowerImg;

//Array for Prey and enemy
let prey = [];

//The 2 enemy and their images
let bugSpray;
let bear;
let bugSprayImg;
let bearImg;

// keep score of how many flower the player has collected
let honeyBar;

//menu images and end game images
let menuImg;
let winImg;
let failImg;

//menu sound and gameplay sounds
let gameMusic;
let buzz;
let bloop;

//start game after menu
let state = "INSTRUCTION";


// preload()
//
//Preload sounds and images
function preload() {
  beeImg = loadImage("assets/images/bee.png");
  lavenderImg = loadImage("assets/images/lavender.png");
  poppieImg = loadImage("assets/images/poppie.png");
  sunflowerImg = loadImage("assets/images/sunflower.png");
  bugSprayImg = loadImage("assets/images/bugSpray.png");
  bearImg = loadImage("assets/images/bear.png");
  menuImg = loadImage("assets/images/bg.jpg");
  winImg = loadImage("assets/images/win.jpg");
  failImg = loadImage("assets/images/fail.jpg");
  gameMusic = loadSound("assets/sounds/bgmusic.wav");
  buzz = loadSound("assets/sounds/buzz.wav");
  bloop = loadSound("assets/sounds/bloop.wav");
}



// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  gameMusic.loop();
  createCanvas(1050, 700);

  //create 1 bee(predator)
  bee = new Predator(width / 2, height / 2, 2, 30, beeImg);

  //create 2 natural enemies
  bear = new NaturalEnemy(random(0, 1000), random(0, 700), 10, 45, bearImg);
  bugSpray = new AltimateEnemy(random(0, 1000), random(0, 700), 20, 40, bugSprayImg);

  //create 21 preys
  for (let i = 0; i < 7; i++) {
    lavender = new Prey(random(0, 1000), random(0, 700), 8, 35, lavenderImg);
    prey.push(lavender);
  }
  for (let i = 0; i < 7; i++) {
    poppie = new Prey(random(0, 1000), random(0, 700), 7, 30, poppieImg);
    prey.push(poppie);
  }
  for (let i = 0; i < 7; i++) {
    sunflower = new Prey(random(0, 1000), random(0, 700), 5, 38, sunflowerImg);
    prey.push(sunflower);
  }

  //create the score bar
  honeyBar = new ScoreBar(970, 600, color(252, 215, 3), 30);

}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(255);
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
  buzz.play();
  if (state === "INSTRUCTION") {
    state = "GAMEPLAY";
  } else if (state === "GAMEOVER" || state === "GAMEWIN") {
    resetGame();
  }

}

function resetGame() {
  state = "GAMEPLAY";
  bee.health = 30;
  bee.score = 0;
  for (let i = 0; i < prey.length; i++) {
    prey[i]. reset();
  }

}


//displayInstruction()
//display instruction screen
function displayInstruction() {
  image(menuImg, 0, 0, 1000, 700);

}


//displayGameover()
//display gameover screen when predator dies
function displayGameover() {
  image(failImg, 0, 0, 1000, 700);
}

//displayGamewin()
//tell player that they won after reaching certain score
function displayGamewin() {
  image(winImg, 0, 0, 1000, 700);
}

//displayGameplay()
//display gameplay: predator, prey , enemy
function displayGameplay() {
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
  for (let i = 0; i < prey.length; i++) {
    prey[i].move();
    // Handle the bee eating any of the prey
    bee.handleEating(prey[i]);
    prey[i].display();

  }

  //display player's score on a side bar
  // check if player is dead
  bee.endGame();

  // display score (honey bar)
  honeyBar.updateScore(bee.score);
  honeyBar.display();
}
