import { CGFscene, CGFcamera, CGFaxis, CGFobject, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall1 } from "./MyTriangleSmall1.js";
import {MyTriangleBig1} from "./MyTriangleBig1.js";
import { MyTriangleSmall2 } from "./MyTriangleSmall2.js";
import {MyTriangleBig2} from "./MyTriangleBig2.js";


/**
 * MyTangram
 * @constructor
 */
export class MyTangram extends CGFobject {
  constructor(scene) {
    super(scene);
    this.diamond = new MyDiamond(this.scene);
    this.triangle1 = new MyTriangle(this.scene);
    this.bigTriangle1 = new MyTriangleBig1(this.scene);
    this.bigTriangle2 = new MyTriangleBig2(this.scene);
    this.smallTriangle1 = new MyTriangleSmall1(this.scene);
    this.smallTriangle2 = new MyTriangleSmall2(this.scene);
    this.parallelogram = new MyParallelogram(this.scene);

    this.tangramMaterial = new CGFappearance(this.scene);
    this.tangramMaterial.setAmbient(1, 1, 1, 1);
    this.tangramMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
    this.tangramMaterial.setSpecular(0.1, 0.1, 0.1, 1);
    this.tangramMaterial.setShininess(1.0);
    this.tangramMaterial.loadTexture('images/tangram.png');
    this.tangramMaterial.setTextureWrap('REPEAT', 'REPEAT');
}

  display() {
    this.tangramMaterial.apply()

    //Translate Diamond
    this.scene.pushMatrix();

    var translateMatrix = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      1.5, -2.7 , 0, 1
    ];
  
    this.scene.multMatrix(translateMatrix);
    //Rotate Diamond

    var rotateValue = Math.PI / 4;
    var rotateMatrix = [
      Math.cos(rotateValue), -Math.sin(rotateValue), 0, 0,
      Math.sin(rotateValue), Math.cos(rotateValue), 0, 0,
      0, 0, 1, 0,
      0, 0 , 0, 1
    ];
    this.scene.multMatrix(rotateMatrix);
    this.diamond.display();
    this.scene.popMatrix();

    //

    this.scene.pushMatrix();
    this.scene.translate(1.2,-1,0)
    this.scene.rotate(-Math.PI, 0, 0, 1)
    this.triangle1.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.bigTriangle1.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-0.6,-2,0)
    this.scene.rotate(Math.PI*3/4, 0, 0, 1)
    this.bigTriangle2.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-2.7,-0.7,0)
    this.scene.rotate(-Math.PI/4, 0, 0, 1)
    this.smallTriangle1.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0,3,0)
    this.scene.rotate(Math.PI, 0, 0, 1)
    this.smallTriangle2.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(2.2,0,0)
    this.scene.rotate(-Math.PI/2, 0, 0, 1)
    this.parallelogram.display();
    this.scene.popMatrix();

  

/*     if (this.displayTriangle) this.triangle.display();
    if (this.displayParallelogram) this.parallelogram.display();
    if(this.displaySmallTriangle) this.smallTriangle.display();
    if(this.displayBigTriangle) this.bigTriangle.display();*/


    // ---- END Primitive drawing section
  }
}
