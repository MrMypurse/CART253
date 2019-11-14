// player
//
// A class that represents a simple player
// controlled by the arrow keys. It can move around
// the screen and consume supply objects to maintain its health.

class Player {

  // constructor
  //
  // Sets the initial values for the player's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, fillColor, radius) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    this.healthLossPerMove = 0.01;
    this.healthGainPerEat = 1;
    // Display properties
    this.fillColor = fillColor;
    this.radius = this.health; // Radius is defined in terms of health
    // Input properties
    this.leftKey = 65;
    this.rightKey = 68;
  }

  // handleInput
  //
  // Checks if an arrow key is pressed and sets the player's
  // velocity appropriately.
  handleInput() {
    // Horizontal movement
    if (keyIsDown(this.leftKey)) {
      this.vx = -this.speed;
    } else if (keyIsDown(this.rightKey)) {
      this.vx = this.speed;
    } else {
      this.vx = 0;
    }
  }

  // move
  //
  // Updates the position according to velocity
  // Lowers health (as a cost of living)
  // Handles wrapping
  move() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update health
    this.health = this.health - this.healthLossPerMove;
    this.health = constrain(this.health, 0, this.maxHealth);
    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the player has gone off the canvas and
  // wraps it to the other side if so
  handleWrapping() {
    // Off the left or right
    if (this.x < 0) {
      this.x += width;
    } else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += height;
    } else if (this.y > height) {
      this.y -= height;
    }
  }

  // handleEating
  //
  // Takes a supply object as an argument and checks if the player
  // overlaps it. If so, reduces the supply's health and increases
  // the player's. If the supply dies, it gets reset.
  handleEating(supply) {
    // Calculate distance from this player to the supply
    let d = dist(this.x, this.y, supply.x, supply.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + supply.radius) {
      // Increase player health and constrain it to its possible range
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);
      // Decrease supply health by the same amount
      supply.health -= this.healthGainPerEat;
      // Check if the supply died and reset it if so
      if (supply.health < 0) {
        supply.reset();
      }
    }
  }

  // display
  //
  // Draw the player as an ellipse on the canvas
  // with a radius the same size as its current health.
  display() {
    push();
    noStroke();
    fill(this.fillColor);
    this.radius = this.health;
    ellipse(this.x, this.y, this.radius * 2);
    pop();
  }
}
