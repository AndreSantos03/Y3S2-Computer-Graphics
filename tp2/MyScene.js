import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import {MyTriangleBig} from "./MyTriangleBig.js";


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

    //Initialize scene objects
    this.axis = new CGFaxis(this);

    this.displayDiamond = true;
    this.diamond = new MyDiamond(this);

    this.displayParallelogram = true;
    this.parallelogram = new MyParallelogram(this);

    this.displayTriangle1 = true;
    this.triangle1 = new MyTriangle(this);

    this.displaySmallTriangle1 = true;
    this.smallTriangle1 = new MyTriangleSmall(this);

    this.displaySmallTriangle2 = true;
    this.smallTriangle2 = new MyTriangleSmall(this);
    
    this.displayBigTriangle1 = true;
    this.bigTriangle1 = new MyTriangleBig(this);

    this.displayBigTriangle2 = true;
    this.bigTriangle2 = new MyTriangleBig(this);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
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

    this.setDefaultAppearance();

    var sca = [
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ];

    this.multMatrix(sca);

    // ---- BEGIN Primitive drawing section
    if(this.displayDiamond)
    {
    
      //Translate Diamond
      this.pushMatrix();

      var translateMatrix = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        1.5, -2.7 , 0, 1
      ];
    
      this.multMatrix(translateMatrix);
      //Rotate Diamond

      var rotateValue = Math.PI / 4;
      var rotateMatrix = [
        Math.cos(rotateValue), -Math.sin(rotateValue), 0, 0,
        Math.sin(rotateValue), Math.cos(rotateValue), 0, 0,
        0, 0, 1, 0,
        0, 0 , 0, 1
      ];
      this.multMatrix(rotateMatrix);
      this.diamond.display();
      this.popMatrix();
    }

    if (this.displayTriangle1)
    {
      this.pushMatrix();
      this.translate(1.2,-1,0)
      this.rotate(-Math.PI, 0, 0, 1)
      this.triangle1.display();
      this.popMatrix();
    }

    if (this.displayBigTriangle1)
    {
      this.pushMatrix();
      this.bigTriangle1.display();
      this.popMatrix();
    }

    if (this.displayBigTriangle2)
    {
      this.pushMatrix();
      this.translate(-0.6,-2,0)
      this.rotate(Math.PI*3/4, 0, 0, 1)
      this.bigTriangle2.display();
      this.popMatrix();
    }

    if (this.displaySmallTriangle1)
    {
      this.pushMatrix();
      this.translate(-2.7,-0.7,0)
      this.rotate(-Math.PI/4, 0, 0, 1)
      this.smallTriangle1.display();
      this.popMatrix();
    }

    if (this.displaySmallTriangle2)
    {
      this.pushMatrix();
      this.translate(0,3,0)
      this.rotate(Math.PI, 0, 0, 1)
      this.smallTriangle2.display();
      this.popMatrix();
    }

    if (this.displayParallelogram)
    {
      this.pushMatrix();
      this.translate(2.2,0,0)
      this.rotate(-Math.PI/2, 0, 0, 1)
      this.parallelogram.display();
      this.popMatrix();
    }

  

/*     if (this.displayTriangle) this.triangle.display();
    if (this.displayParallelogram) this.parallelogram.display();
    if(this.displaySmallTriangle) this.smallTriangle.display();
    if(this.displayBigTriangle) this.bigTriangle.display();*/


    // ---- END Primitive drawing section
  }
}
