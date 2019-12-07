// Toxic Waster
//
// A class that represents a waster that moves
// on screen based on a noise() function. It can move around
// the screen and consumed player objects.

//class Waste extends Supply {
class Waste {
  // constructor
  //
  // Sets the initial values for the player's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius, wasteImage) {
    //super(x, y, speed, fillColor, radius);
    // constructor
    //
    // Sets the initial values for the player's properties
    // Either sets default values or uses the arguments provided
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Time properties for noise() function
    this.tx = random(0, 1000); // To make x and y noise different
    this.ty = random(0, 1000); // we use random starting values
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    // Display properties
    this.image = wasteImage;
    this.radius = this.health;
  }

  // move
  //
  // Sets velocity based on the noise() function and the supply's speed
  // Moves based on the resulting velocity and handles wrapping
  move() {
    // Set velocity via noise()
    this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
    //this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);
    this.vy = this.speed;
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update time properties
    this.tx += 0.01;
    this.ty += 0.01;
    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the supply has gone off the canvas and
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

  // display
  //
  // Draw the supply as an ellipse on the canvas
  // with a radius the same size as its current health.
  display() {
    push();
    noStroke();
    this.radius = this.health;
    if (this.radius > 2) {
      image(this.image, this.x, this.y, this.radius * 2, this.radius * 2);
    }
    pop();
  }

  // reset
  //
  // Set the position to a random location and reset health
  // and radius back to default
  reset() {
    // Random position
    this.x = random(0, width);
    this.y = random(0, height);
    // Default health
    this.health = this.maxHealth;
    // Default radius
    this.radius = this.health;
  }


  // handleAttacking
  //
  // Takes a waste object as an argument and checks if the player
  // overlaps it. If so, reduces the waste's health and also reduces
  // the player's. If the waste dies, it gets reset.
  handleAttacking(player) {
    // Calculate distance from this player to the waste
    let d2 = dist(this.x, this.y, player.x, player.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d2 < this.radius + player.radius) {
      // Decrease player health and constrain it to its possible range
      //player.health -= player.healthGainPerEat * 6;
      //this.health = constrain(this.healtsh, 0, this.maxHealth);
      // Decrease supply health by the same amount
      this.health -= player.healthGainPerEat;
      // Check if the supply died and reset it if so
      if (this.health < 2) {
        this.reset();
      }
    }
  }
}
