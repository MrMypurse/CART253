// Prey
//
// A class that represents a simple prey that moves
// on screen based on a noise() function. It can move around
// the screen and be consumed by Predator objects.

class NaturalEnemy extends Prey {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, fillColor, radius) {
    super(x, y, speed, fillColor, radius);
}
//attacked
//
//Check if the predator overlap the enemy, if so, reduces the predator's health and the prey disappears
// If the enemy dies, it gets reset.
  handleAttack(predator){
    // Calculate distance from this Enemy to the predator
    let d = dist(this.x, this.y, predator.x, predator.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + predator.radius) {
      // Increase predator health and constrain it to its possible range
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);
      // Decrease predator health by the same amount
      predator.health -= this.healthGainPerEat;
      // Check if the prey died and reset it if so
      if (predator.health <= 0) {
        //gameover
      }
    }


}
}
