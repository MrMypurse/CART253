// ScoreBar
//
// A class that represents the player's score
// the height of bar is relative to the score


class ScoreBar{
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
    }



  // display
  //
  // Draw the predator as an ellipse on the canvas
  // with a radius the same size as its current health.

    display() {
      push();
      noStroke();
      fill(this.fillColor);
      // height is defined in terms of the player's score
      //this.score = bee.score;
      rect(this.x, this.y, this.width, bee.score * 5);
      pop();
    }
}
