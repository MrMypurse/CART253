// Flashlight
//
// A class that represents the flashlight function
// flashlight is turned on/off by clicking the mouse
class Flashlight {
  // constructor
  //
  // Sets the initial values for the flashlight's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, batteryLevel, flashImage) {
    // Position
    this.x = x;
    this.y = y;
    //Battery properties
    this.batteryLevel = batteryLevel;
    this.batteryLevel = this.maxBatteryLevel;
    this.batteryLossPerMove = 0.07;
    this.batteryGainPerEat = 1;
    //Display Properties
    imageMode(CENTER);
    rectMode(CORNER);
    this.image = flashImage;
    //create blakc image with transparency in the middle.
  }

  toggleFlash() {
    if (mouseIsPressed) {
      if (flashOn === true) {
        flashOn === false;
        return;
      } else {
        flashOn === true;
        return;
      }
    }
  }

  display() {
    if (flashOn === true){
      if (this.batteryLevel > 0) {
        image(this.image, mouseX, mouseY, 3000, 3000);
      } else {
        rect(window.width / 2, window.height / 2, window.width, window.height);
      }
    }
  }
}
