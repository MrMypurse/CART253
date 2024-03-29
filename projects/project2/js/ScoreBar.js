// ScoreBar
//
// A class that represents the player's score
// the height of bar is relative to the score


class ScoreBar {
  // constructor
  //
  // Sets the initial values for the ScoreBar's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, fillColor, width) {
    // Position
    this.x = x;
    this.y = y;
    // Score properties
    // Display properties
    this.fillColor = fillColor;
    this.height = 0;
    this.width = width;
  }



  // display
  //
  // Draw the predator as an ellipse on the canvas
  // with a radius the same size as its current health.

  display() {
    push();
    noStroke();
    fill(this.fillColor);
    rect(this.x, this.y, this.width, -this.height);
    pop();
  }

    // height is defined in terms of the player's score
  updateScore(score) {
    this.height = score * 22;
  }
}
