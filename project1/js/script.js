"use strict";

/******************************************************

Game - Chaser
Base code - Pippin Barr
Programmer - Janet Sun
Art - Janet Sun
Sound - Lemoncreme(www.freesound.org)

A "simple" game of a hungry cat. The player is a kitten and can move with keys,
if they overlap the chicken leg they can eat by sucking out its energy
and adding it to their own. The player "dies" slowly over time so they have to keep
eating to stay alive.

Includes: Physics-based movement, keyboard controls, health/stamina,
noise movement, screen bouncing, sprinting ability, cute sound effects.

******************************************************/

// Track whether the game is over
let gameOver = false;
let gameStart = false;

// Player position, size, velocity
let playerX;
let playerY;
let playerRadius = 40;
let playerVX = 0;
let playerVY = 0;
let playerMaxSpeed = 2;
// Player health
let playerHealth;
let playerMaxHealth = 255;
// Player fill color
let playerFill = 255;

// Prey position, size, velocity
let preyX;
let preyY;
let preyRadius = 40;
let preyVX;
let preyVY;
let preyMaxSpeed = 4;
// Prey health
let preyHealth;
let preyMaxHealth = 110;
// Prey fill color
let preyFill = 255;

// Amount of health obtained per frame of "eating" (overlapping) the prey
let eatHealth = 15;
// Number of prey eaten during the game (the "score")
let preyEaten = 0;

//time
let tx=10;
let ty=5;

//images
let playerImage;
let preyImage;
let backgroundImage;
let gameoverImage;
let menuImage;

//sound
let meow;
let crunch;
let piano;


function preload() {
  playerImage = loadImage("assets/images/cat.png");
  preyImage = loadImage("assets/images/chicken.png");
  backgroundImage = loadImage("assets/images/BG2.png");
  gameoverImage = loadImage("assets/images/gameover.png");
  menuImage = loadImage("assets/images/menu.png");
  meow = loadSound("assets/sounds/meow.wav");
  crunch = loadSound("assets/sounds/crunch.wav");
  piano = loadSound("assets/sounds/piano.wav");
}



// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(500, 500);
  imageMode(CENTER);
  noStroke();

  // We're using simple functions to separate code out
  setupPrey();
  setupPlayer();
  piano.loop();
}



// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width / 3;
  preyY = height / 3;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
}



// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = width / 2;
  playerY = height / 2;
  playerHealth = playerMaxHealth;
}



// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  if (gameStart === false){
      image(menuImage, 250, 250, 500, 500);
  }

  if(gameStart === true){
    background(0);
    image(backgroundImage, 250, 250, 500, 500);
    handleInput();
    movePlayer();
    movePrey();
    updateHealth();
    checkEating();
    drawPrey();
    drawPlayer();
  }

  if (gameOver) {
    showGameOver();
  }
}


//to start game by pressing on the mouse
function mousePressed(){
    gameStart = true;
    meow.play();
}



// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
  }
  else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
  }
  else {
    playerVY = 0;
  }

  //Sprinting abilities
  if (keyIsDown(SHIFT)){
    playerMaxSpeed = 5;
    playerHealth = playerHealth - 1.2;
  }
}




// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  let nextplayerX = playerX + playerVX;
  let nextplayerY = playerY + playerVY;

  // Wrap when player goes off the canvas
  if (nextplayerX - playerRadius/2 < 0) {
    // Off the left side, so it bounces back
    nextplayerX = playerX;
  }
  else if (nextplayerX + playerRadius/2 > width) {
    // Off the right side, so it bounces back
    nextplayerX = playerX;
  }

  if (nextplayerY - playerRadius/2 < 0) {
    // Off the top, so it bounces back
    nextplayerY = playerY;
  }
  else if (nextplayerY - playerRadius/2 > height) {
    // Off the bottom, so it bounces back
    nextplayerY = playerY;
  }
  playerX = nextplayerX;
  playerY = nextplayerY;
}




// updateHealth()
//
// Reduce the player's health (happens every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health
  playerHealth = playerHealth - 0.5;
  // Constrain the result to a sensible range
  playerHealth = constrain(playerHealth, 0, playerMaxHealth);
  // Check if the player is dead (0 health)
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
  //Reduce prey's health
  preyHealth = preyHealth - 0.6;
  if (preyHealth <= 0) {
    // Move the "new" prey to a random position
    preyX = random(0, width);
    preyY = random(0, height);
    // Give it full health
    preyHealth = preyMaxHealth;
    }
}



// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  let d = dist(playerX, playerY, preyX, preyY);
  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Increase the player health
    playerHealth = playerHealth + eatHealth;
    // Constrain to the possible range
    playerHealth = constrain(playerHealth, 0, playerMaxHealth);
    // Reduce the prey health
    preyHealth = preyHealth - eatHealth;
    // Constrain to the possible range
    preyHealth = constrain(preyHealth, 0, preyMaxHealth);

    // Check if the prey died (health 0)
    if (preyHealth <= 0) {
      // Move the "new" prey to a random position
      preyX = random(0, width);
      preyY = random(0, height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten = preyEaten + 1;
      crunch.play();
    }
  }
}



// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey(){
  // Change the prey's velocity at random intervals
  // random() will be < 0.05 5% of the time, so the prey
  // will change direction on 5% of frames
  if (random() < 0.05) {
    // Set velocity based on random values to get a new direction
    // and speed of movement
    //
    // Use map() to convert from the 0-1 range of the random() function
    // to the appropriate range of velocities for the prey
    preyVX = map(noise(tx), 0,1,-5,5);
    preyVY = map(noise(ty), 0,1,-5,5);
    tx += 0.05;
    ty += 0.05;

  }

  // Update prey position based on velocity
  preyX = preyX + preyVX;
  preyY = preyY + preyVY;

  // make prey bounce when it touches the screen
  if (preyX - preyRadius/2 < 0 || preyX + preyRadius/2 > width) {
    preyVX = - preyVX;
  }
  if (preyY - preyRadius/2 < 0 || preyY +preyRadius/2 > height) {
    preyVY = - preyVY;
  }
}



// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  push();
  tint(255, preyHealth);
  image(preyImage, preyX, preyY, preyRadius * 2, preyRadius * 2);
  pop();
}



// drawPlayer()
//
// Draw the player as an ellipse with alpha value based on health
function drawPlayer() {
  push();
  tint(255, playerHealth);
  image(playerImage, playerX, playerY, playerRadius * 2, playerRadius * 2);
  pop();
}



// game ends
function endGame(){
  if(gameOver === true);
  showGameOver();
  preyMaxSpeed = 0;
  playerMaxSpeed = 0;
  crunch.stop();
}


// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  // Set up the font and image
  background(0);
  image(gameoverImage, 250, 250, 500, 500);
  textSize(12);
  textAlign(CENTER, CENTER);
  fill(187, 237, 201);
  // Set up the text to display
  let gameOverText;
  gameOverText ="You ate " + preyEaten.toString() + " chicken\n" +"before you starved to death";
  // Display it in the centre of the screen
  text(gameOverText, width / 2, height * 0.75);
}
