// Flashlight
//
// A class that represents the flashlight function
// flashlight is turned on/off by clicking the mouse
class Flashlight {
  // constructor
  //
  // Sets the initial values for the flashlight's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, flashImage){
    // Position
    this.x = x;
    this.y = y;
    //Display Properties
    imageMode(CENTER);
    rectMode(CENTER);
    this.image = flashImage;
    //create blakc image with transparency in the middle.
  }

  mousePressed(){
    if (flashOn === true){
      flashOn = false;
      return;
    } else if (flashOn === false){
      flashOn = true;
      return;
    }
  }

  toggleFlash(){
    if (flashOn === true){
      image(flashImage, this.x, this.y, 2000, 2000);
    } else{
      rect(window.width/2, window.height/2, window.width, window.height);
    }
  }
}
