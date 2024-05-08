import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./objects/MyPlane.js";
import { MySkySphere } from "./objects/MySkySphere.js";
import { MyPanorama } from "./objects/MyPanorama.js";
import { MyRock } from "./objects/MyRock.js";
import { MyRockSet } from "./objects/MyRockSet.js";

import { MyGarden } from "./MyGarden.js";
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
    this.beeSpeed = 0.25;
    this.beeSize = 1;

    this.pressedKeys = [];

    this.bee = new MyBee(this,0,10,0,0);
  
    
    this.enableTextures(true);

    this.terrainTexture = new CGFtexture(this, "images/newTerrainTexture.jpg");
    this.terrainAppearance = new CGFappearance(this);
    this.terrainAppearance.setTexture(this.terrainTexture);
    this.terrainAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.skysphere = new MySkySphere(this, new CGFtexture(this, "images/earth.jpg"))
    this.panorama = new MyPanorama(this, new CGFtexture(this, "images/panorama4.jpg"))

    this.garden = new MyGarden(this);
    this.bee.setGarden(this.garden);
    this.setUpdatePeriod(50); // 60 FPS
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


    this.pushMatrix();
    this.panorama.display();
    this.popMatrix();



    this.bee.display();

    this.garden.display();


    //NOT USED IN THE FINAL PROJECT
    // this.skysphere.display();  

    // ---- END Primitive drawing section
  }
  
  update(time){
    this.checkKeys();
    this.bee.update(time,this.pressedKeys,this.garden);
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
