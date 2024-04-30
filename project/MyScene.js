import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./objects/MyPlane.js";
import { MySkySphere } from "./objects/MySkySphere.js";
import { MyPanorama } from "./objects/MyPanorama.js";
import { MyRock } from "./objects/MyRock.js";
import { MyRockSet } from "./objects/MyRockSet.js";

import { MyGarden } from "./MyGarden.js";
import { MyBee } from "./objects/MyBee.js";

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
    this.displayAxis = true;
    this.scaleFactor = 1;



    this.bee = new MyBee(this,0,3,0);

    this.enableTextures(true);

    this.terrainTexture = new CGFtexture(this, "images/terrain.jpg");
    this.terrainAppearance = new CGFappearance(this);
    this.terrainAppearance.setTexture(this.terrainTexture);
    this.terrainAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.skysphere = new MySkySphere(this, new CGFtexture(this, "images/earth.jpg"))
    this.panorama = new MyPanorama(this, new CGFtexture(this, "images/panorama4.jpg"))
    this.rock1 = new MyRock(this, 1, 6, 3)
    this.rockset = new MyRockSet(this)
    this.rockAppearance = new CGFappearance(this);


    this.garden = new MyGarden(this);

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
    this.translate(0,-100,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();

    //this.pushMatrix();
    //this.skysphere.display();
    //this.popMatrix();

    this.pushMatrix();
    this.panorama.display();
    this.popMatrix();



    this.bee.display();

    // this.garden.display();

    this.pushMatrix();
    this.rockAppearance.apply()
    this.rockset.display();
    this.popMatrix();

    // ---- END Primitive drawing section
  }
  
  update(time){
    console.log(time);
    this.bee.update(time);
  }
}
