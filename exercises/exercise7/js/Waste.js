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

  handleAttack(player){
    // Calculate distance from this Enemy to the predator
    let d2 = dist(this.x, this.y, player.x, player.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d2 < this.radius + player.radius) {
    // Increase predator health and constrain it to its possible range
    this.health += this.healthGainPerEat;
    this.health = constrain(this.health, 0, this.maxHealth);
    // Decrease predator health by the same amount
    player.health -= this.healthGainPerEat;

}
}
}
