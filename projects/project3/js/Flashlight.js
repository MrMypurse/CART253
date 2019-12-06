// Flashlight
//
// A class that represents the flashlight function
// flashlight is turned on/off by clicking the mouse
class Flashlight {
  // constructor
  //
  // Sets the initial values for the flashlight's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, flashOn, flashImage){
    // Position
    this.x = x;
    this.y = y;
    //Battery properties
    this.batteryLevel = this.maxBatteryLevel; // Must be AFTER defining this.maxHealth
    this.batteryLossPerMove = 0.07;
    this.batteryGainPerEat = 1;
    //Display Properties
    this.flashOn = flashOn;
    imageMode(CENTER);
    rectMode(CENTER);
    this.image = flashImage;
    //create blakc image with transparency in the middle.
  }

  toggleFlash(){
    if (flashOn === true){
      image(flashImage, this.x, this.y, this.width * 2, this.height * 2);
    } else{
      rect(window.width/2, window.height/2, window.width, window.height);
    }
  }

  mousePressed() {
    // Horizontal movement
    if (flashOn === true) {



}
}
