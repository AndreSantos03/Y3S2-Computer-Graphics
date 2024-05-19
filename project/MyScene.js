import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./objects/MyPlane.js";
import { MySkySphere } from "./objects/MySkySphere.js";
import { MyPanorama } from "./objects/MyPanorama.js";
import { MyRock } from "./geometry/MyRock.js";
import { MyRockSet } from "./objects/MyRockSet.js";

import { MyGarden } from "./objects/MyGarden.js";
import { MyBee } from "./objects/MyBee.js";
import { MyHive } from "./objects/MyHive.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA)

    this.gl.enable(this.gl.BLEND)
    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);

    //Objects connected to MyInterface
    this.displayAxis = false;
    this.scaleFactor = 1;
    this.beeSpeed = 0.5;
    this.beeSize = 1;
    this.windIntensity = 0.0;
    this.windAngle = 0.0;
    this.beeView = false;

    this.pressedKeys = [];


    this.cameraModes = ["Normal Look", "Bee Perspective", "Bee Focus"];

    //freecam
    this.selectedCameraMode  = "Normal Look" ;
		this.onSelectedCameraMode(this.selectedCameraMode);
    this.freeLookSettingsApplied = false;


    this.bee = new MyBee(this,0,10,0,0);
    this.bee.setSpeed(this.beeSpeed);
    
    this.enableTextures(true);

    this.terrainTexture = new CGFtexture(this, "images/newTerrainTexture.jpg");
    this.terrainAppearance = new CGFappearance(this);
    this.terrainAppearance.setTexture(this.terrainTexture);
    this.terrainAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.skysphere = new MySkySphere(this, new CGFtexture(this, "images/earth.jpg"))
    this.panorama = new MyPanorama(this, new CGFtexture(this, "images/panorama4.jpg"))

    this.garden = new MyGarden(this);
    this.bee.setGarden(this.garden);

    this.createPollenMessageDiv()

    this.setUpdatePeriod(50); // 60 FPS
    this.startTime = null;  
  }
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  updateBeeSpeed(speed) {
    this.bee.setSpeed(speed);
  }
  updateBeeSize(size){
    this.bee.setSize(size);
  }
  updateWindIntensity(intensity){
    this.garden.setWindIntensity(intensity/700); //to make the slider 0  to 100
  }
  updateWindAngle(angle){
    this.garden.setWindAngle(angle);
  }

  onSelectedCameraMode(value) {
    this.selectedCameraMode = value;
  }

  createPollenMessageDiv() {
    this.pollenMessageDiv = document.createElement('div');
    this.pollenMessageDiv.textContent = 'YOU HAVE POLLEN!';
    this.pollenMessageDiv.style.position = 'fixed'; 
    this.pollenMessageDiv.style.top = '20px'; 
    this.pollenMessageDiv.style.left = '20px'; 
    this.pollenMessageDiv.style.fontSize = '48px';
    this.pollenMessageDiv.style.fontWeight = 'bold'; 
    document.body.appendChild(this.pollenMessageDiv);
    this.hidePollenMessage(); 
    
    // RAINBOW
    const rainbowColors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF']; // Add more colors if needed
    

    let colorIndex = 0;
    // Cycle through colors
    const updateRainbowColor = () => {
        this.pollenMessageDiv.style.color = rainbowColors[colorIndex];
        colorIndex = (colorIndex + 1) % rainbowColors.length;
    };
    
    setInterval(updateRainbowColor, 100); 
  }

  hidePollenMessage() {
    this.pollenMessageDiv.style.display = 'none';
  }

  showPollenMessage() {
    this.pollenMessageDiv.style.display = 'block';
  }

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    // ---- BEGIN Primitive drawing section


    this.pushMatrix();
    this.terrainAppearance.apply();
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();


    this.panorama.display();



    this.bee.display();

    this.garden.display();


    //NOT USED IN THE FINAL PROJECT
    // this.skysphere.display();  

    // ---- END Primitive drawing section
  }
  
  update(time) {
    if (this.startTime === null) {
        this.startTime = time;
    }

    if (this.bee.pollen !== null) {
      this.showPollenMessage();
    } else {
        this.hidePollenMessage();
    }

    let elapsedTime = time - this.startTime;


    this.checkKeys();
    this.bee.update(elapsedTime,this.pressedKeys,this.garden);
    this.garden.update(elapsedTime);


    if(this.selectedCameraMode == "Normal Look" && this.freeLookSettingsApplied){
      this.camera.setPosition(vec3.fromValues(50, 10, 15));
      this.camera.setTarget(vec3.fromValues(0, 0, 0));
      this.camera.fov = 1;
      this.freeLookSettingsApplied = false;
    }
    if (this.selectedCameraMode == "Bee Perspective") {
      if(!this.freeLookSettingsApplied){
        this.freeLookSettingsApplied = true;
      }
      this.camera.fov = 90;

      var beePosition = vec3.fromValues(this.bee.x, this.bee.y, this.bee.z);

      var beeAngle = this.bee.orientation; 
      var zOffset =  Math.cos(beeAngle) * 2;
      var xOffset = Math.sin(beeAngle) * 2;
      var cameraOffset = vec3.fromValues(xOffset * 0.5,0,zOffset * 0.5);
      
      var cameraPosition = vec3.create();
      vec3.add(cameraPosition, beePosition, cameraOffset);


      this.camera.setPosition(cameraPosition);
  
      var targetPosition = vec3.create();
      var targetOffset = vec3.fromValues(xOffset ,-2,zOffset)
      vec3.add(targetPosition,cameraPosition,targetOffset);

      this.camera.setTarget(targetPosition);
    }
    if(this.selectedCameraMode == "Bee Focus" ){
      if(this.freeLookSettingsApplied){
        this.camera.fov = 1;
        this.camera.setPosition(vec3.fromValues(50, 10, 15));
        this.freeLookSettingsApplied = false;
      }
      this.camera.setTarget(vec3.fromValues(this.bee.x,this.bee.y,this.bee.z));
    }
  }

  checkKeys() {
    this.pressedKeys =[];

    if (this.gui.isKeyPressed("KeyW")) {
      this.pressedKeys.push("W");
    }

    if (this.gui.isKeyPressed("KeyS")) {
      this.pressedKeys.push("S");

    }

    if (this.gui.isKeyPressed("KeyD")) {
      this.pressedKeys.push("D");

    }
    if (this.gui.isKeyPressed("KeyA")) {
      this.pressedKeys.push("A");

    }
    if(this.gui.isKeyPressed("KeyF")){
      this.pressedKeys.push("F");
    }
    if(this.gui.isKeyPressed("KeyP")){
      this.pressedKeys.push("P");
    }
    if(this.gui.isKeyPressed("KeyO")){
      this.pressedKeys.push("O");
    }
  }

}
