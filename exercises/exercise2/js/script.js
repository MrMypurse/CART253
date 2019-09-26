/******************************************************

Game - The Artful Dodger
Pippin Barr

A simple dodging game with keyboard controls

******************************************************/

//load avatar images and background images
let img1;
let img2;
let img3;

// The position and size of our avatar circle
let avatarX;
let avatarY;
let avatarSize = 70;

// The speed and velocity of our avatar circle
let avatarSpeed = 5;
let avatarVX = 0;
let avatarVY = 0;

// The position and size of the enemy circle
let enemyX;
let enemyY;
let enemySize = 70;

// The speed and velocity of our enemy circle
let enemySpeed = 8;
let enemyVX = 5;

// How many dodges the player has made
let scores = 0;

function preload(){
  img1 = loadImage("assets/images/background.png");
  img2 = loadImage("assets/images/turtle.png");
  img3 = loadImage("assets/images/trash.png");
}

// setup()
//
// Make the canvas, position the avatar and anemy
function setup() {
  // Create our playing area
  createCanvas(500,500);

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);

  // No stroke so it looks cleaner
  noStroke();
}


// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {
  // An image as background
   image(img1, 0, 0, [500], [500]);


  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // The enemy always moves at enemySpeed
  enemyVX = enemySpeed;
  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");
    // Reset the enemy's position
    enemyX = 0;
    enemyY = random(0,height);
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    // Reset the dodge counter
    scores = 0;
    // Reset the enemy's speed
    enemySpeed=6;
    // Reset the enemy's size
    enemySize=70;
  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    enemyX = 0;
    enemyY = random(0,height);
    avatarX = width/2;
    avatarY = height/2;
    scores = 0;
    //increase the enemy's size
    enemySize= enemySize+3;
    //increase the enemy's speed
    enemySpeed++;
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    scores = scores + 1;
    // Tell them how many dodges they have made
    console.log(scores + " SCORES!");
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0,height);
    //increase the enemy's size
    enemySize= enemySize+3;
    //increase the enemy's speed
    enemySpeed++;
  }

  if(scores > 5){
     avatarSpeed = 6 ;
   } else if(scores > 10){
      avatarSpeed = 7;
  }

  // Display the number of successful dodges in the console
  console.log(scores);
  //display score
  print(str("scores"));
  textSize(16);
  fill(255);
  text(scores, 450, 450);

  // The player is black
  fill(0);
  // Draw the player as a turtle
  image (img2, avatarX,avatarY,[avatarSize],[avatarSize]);

  // The enemy is red
  fill(255,0,0);
  // Draw the enemy as a circle
  image (img3,enemyX,enemyY,[enemySize],[enemySize]);


}
