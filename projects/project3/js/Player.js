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
  constructor(x, y, speed, radius, batteryLevel, playerImage) {
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
    this.healthLossPerMove = 0.07;
    this.healthGainPerEat = 1;
    //battery Properties
    this.maxBatteryLevel = batteryLevel;
    this.batteryLevel = this.maxBatteryLevel;
    this.batteryLossPerMove = 0.03;
    this.batteryGainPerEat = 1;
    // Display properties
    this.radius = this.health; // Radius is defined in terms of health
    this.image = playerImage;
    // Input properties
    this.leftKey = 65;
    this.rightKey = 68;
    //Initial Score
    this.score = 0;
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
    //Update battery
    this.batteryLevel = this.batteryLevel - this.batteryLossPerMove;
    this.batteryLevel = constrain(this.batteryLevel, 0, this.maxBatteryLevel);
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
    // Calculate distance from this player to the supply and the waste
    let d = dist(this.x, this.y, supply.x, supply.y);
    // Check if the distance is less than their two radius (an overlap)
    if (d < this.radius + supply.radius) {
      if (supply instanceof Waste === false) {
        // Increase player health when touching supply
        this.health += this.healthGainPerEat;
      } else {
        // Decrease player health when touching wastes
        this.health -= this.healthGainPerEat * 5;
      }
      this.health = constrain(this.health, 0, this.maxHealth);
      // Decrease supply health by the same amount
      supply.health -= this.healthGainPerEat * 5;
      // Check if the supply died and reset it if so
      if (supply.health < 3) {
        this.score = this.score + 1;
        supply.reset();
      }
    }
  }

  // handleHealing
  //
  // Takes a supply object as an argument and checks if the player
  // overlaps it. If so, decreases the supply's health and increases
  // the player's. If the supply dies, it gets reset.
  handleHealing(firstAid) {
    //Calculate distance from this player to the firstaid kit
    let d2 = dist(this.x, this.y, firstAid.x, firstAid.y);
    //Check if the distance is less than their two radius(an overlap)
    if (d2 < this.radius + firstAid.radius) {
      this.health += this.healthGainPerEat * 5;
      this.health = constrain(this.health, 0, this.maxHealth);
      //Decrease firstaid kit health by the same amount
      firstAid.health -= this.healthGainPerEat * 5;
    }
    //Check if the firstaid kit died and reset it if so
    if (firstAid.health < 2) {
      firstAid.reset();
    }
  }

  // handleCharging
  //
  // Takes a supply object as an argument and checks if the player
  // overlaps it. If so, decreases the supply's health and increases
  // the player's. If the supply dies, it gets reset.
  handleCharging(battery) {
    //Calculate distance from this player to the firstaid kit
    let d3 = dist(this.x, this.y, battery.x, battery.y);
    //Check if the distance is less than their two radius(an overlap)
    if (d3 < this.radius + battery.radius) {
      this.batteryLevel += this.batteryGainPerEat * 5;
      this.batteryLevel = constrain(this.batteryLevel, 0, this.maxBatteryLevel);
      //Decrease battery's health by the same amount
      battery.health -= this.batteryGainPerEat * 5;
    }
    //Check if the battery died and reset it if so
    if (battery.health < 2) {
      battery.reset();
    }
  }

  // display
  //
  // Draw the player as an ellipse on the canvas
  // with a radius the same size as its current health.
  display() {
    push();
    noStroke();
    this.radius = this.health;
    if (this.radius > 3) {
      image(this.image, this.x, this.y, this.radius * 3, this.radius * 3);
    }
    pop();
  }

  //endGame
  //
  //End the main game when player'health is below 0
  endGame() {
    if (this.health <= 0) {
      state = "GAMEOVER";
      return;
    } else if (this.score >= 40) {
      state = "GAMEWIN";
      return;
    }
  }
}
