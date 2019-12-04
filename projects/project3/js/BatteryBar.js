// HealthBar
//
// A class that represents the player's health
// the width of bar is relative to the health


class BatteryBar {
  // constructor
  //
  // Sets the initial values for the ScoreBar's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, fillColor, height) {
    // Position
    this.x = x;
    this.y = y;
    // Score properties
    // Display properties
    this.fillColor = fillColor;
    this.width = 100;
    this.height = height;
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
    pop();
  }

    // width is defined in terms of the player's health
  //updateHealth(health) {
    //this.width = health * 2.5;
  //}
}
