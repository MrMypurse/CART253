// Toxic Waster
//
// A class that represents a waster that moves
// on screen based on a noise() function. It can move around
// the screen and consumed player objects.

class Waste extends Supply {

  // constructor
  //
  // Sets the initial values for the player's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, fillColor, radius) {
    super(x, y, speed, fillColor, radius);
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
      player.health -= player.healthGainPerEat * 5;
      //this.health = constrain(this.health, 0, this.maxHealth);
      // Decrease supply health by the same amount
      this.health -= player.healthGainPerEat;
      // Check if the supply died and reset it if so
      if (this.health < 2) {
        this.reset();
      }
    }
  }
}
