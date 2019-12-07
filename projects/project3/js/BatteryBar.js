// HealthBar
//
// A class that represents the player's health
// the width of bar is relative to the health


class BatteryBar {
  // constructor
  //
  // Sets the initial values for the ScoreBar's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, fillColor, height, batteryLogoImage) {
    // Position
    this.x = x;
    this.y = y;
    // Score properties
    // Display properties
    this.fillColor = fillColor;
    this.width = player.batteryLevel;
    this.height = height;
    this.image = batteryLogoImage;
  }

  // display
  //
  // Draw the health bar as a rectangle on the canvas
  // with a width the same size as its current health.

  display() {
    push();
    noStroke();
    fill(this.fillColor);
    rect(this.x, this.y, -this.width, this.height);
    image(this.image, this.x + 20, this.y + 10, 30, 30);
    pop();
  }

//updateBattery
//
//update the battery bar's width in relation to the flashlight's battery level 
  updateBattery(batteryLevel) {
    // width is defined in terms of the player's health
    this.width = batteryLevel * 2.5;
  }
}
