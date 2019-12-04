// supply
//
// A class that represents a simple supply that moves
// on screen based on a noise() function. It can move around
// the screen and be consumed by player objects.

class Battery extends Supply {

  // constructor
  //
  // Sets the initial values for the player's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius, supplyImage) {
    super(x, y, speed, radius, supplyImage)
  }
