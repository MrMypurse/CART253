// Flashlight
//
// A class that represents the flashlight function
// flashlight is turned on/off by clicking the mouse
class Flashlight {
  // constructor
  //
  // Sets the initial values for the flashlight's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, flashImage) {
    // Position
    this.x = x;
    this.y = y;
    //Display Properties
    imageMode(CENTER);
    rectMode(CORNER);
    this.image = flashImage;
    //create blakc image with transparency in the middle.
  }

  mousePressed() {
      if (flashOn === true) {
        flashOn === false;
        return;
      } else {
        flashOn === true;
        return;
      }
  }

  display() {
    if (flashOn === true){
      if (player.batteryLevel > 0) {
        image(this.image, mouseX, mouseY, 3000, 3000);
      } else {
        fill(0);
        rect(0, 0, window.width, window.height);
      }
    }
  }
}
