// NaturalEnemy
//
// A class that represents the predator's natural enemy that moves
// on screen based on a noise() function. It can move around
//consumes predator

class AltimateEnemy extends NaturalEnemy{

  // constructor
  //
  // Sets the initial values for the NaturalEnemy's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius, enemyImg) {
    super(x, y, speed, radius, enemyImg);
  }



  handleKill(predator){
    // Calculate distance from this Enemy to the predator
    let d3 = dist(this.x, this.y, predator.x, predator.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d3 < this.radius + predator.radius) {
      predator.health = 0;
    // Increase predator health and constrain it to its possible range
    //  this.health += this.healthGainPerEat;
    //  this.health = constrain(this.health, 0, this.maxHealth);
   // Decrease predator health by the same amount
    //  predator.health -= this.healthGainPerEat * 20;
   // Check if the prey died and reset it if so
    }
}

  display(){
    push();
    noStroke();
    this.radius = this.health;
    if (this.radius > 1){
        image(this.image, this.x, this.y, this.radius * 2, this.radius * 2);
    }
    pop();
  }
}
