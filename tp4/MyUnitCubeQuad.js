import { CGFscene, CGFcamera, CGFaxis, CGFobject, CGFtexture, CGFappearance } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";


/**
 * MyTangram
 * @constructor
 */
export class MyUnitCubeQuad extends CGFobject {
  constructor(scene, frontTex, leftTex, backTex, rightTex, topTex, bottomTex) {
    super(scene);
    this.quad = new MyQuad(this.scene)

    this.frontMat = new CGFappearance(this.scene);
    this.frontMat.loadTexture(frontTex);
    this.frontMat.setTextureWrap('REPEAT', 'REPEAT');
    this.frontMat.setAmbient(1, 1, 1, 1);
    this.frontMat.setDiffuse(0.9, 0.9, 0.9, 1);
    this.frontMat.setSpecular(0.1, 0.1, 0.1, 1);
    this.frontMat.setShininess(1.0);

    this.leftMat = new CGFappearance(this.scene);
    this.leftMat.loadTexture(leftTex);
    this.leftMat.setTextureWrap('REPEAT', 'REPEAT');
    this.leftMat.setAmbient(1, 1, 1, 1);
    this.leftMat.setDiffuse(0.9, 0.9, 0.9, 1);
    this.leftMat.setSpecular(0.1, 0.1, 0.1, 1);
    this.leftMat.setShininess(1.0);

    this.backMat = new CGFappearance(this.scene);
    this.backMat.loadTexture(backTex);
    this.backMat.setTextureWrap('REPEAT', 'REPEAT');
    this.backMat.setAmbient(1, 1, 1, 1);
    this.backMat.setDiffuse(0.9, 0.9, 0.9, 1);
    this.backMat.setSpecular(0.1, 0.1, 0.1, 1);
    this.backMat.setShininess(1.0);

    this.rightMat = new CGFappearance(this.scene);
    this.rightMat.loadTexture(rightTex);
    this.rightMat.setTextureWrap('REPEAT', 'REPEAT');
    this.rightMat.setAmbient(1, 1, 1, 1);
    this.rightMat.setDiffuse(0.9, 0.9, 0.9, 1);
    this.rightMat.setSpecular(0.1, 0.1, 0.1, 1);
    this.rightMat.setShininess(1.0);

    this.topMat = new CGFappearance(this.scene);
    this.topMat.loadTexture(topTex);
    this.topMat.setTextureWrap('REPEAT', 'REPEAT');
    this.topMat.setAmbient(1, 1, 1, 1);
    this.topMat.setDiffuse(0.9, 0.9, 0.9, 1);
    this.topMat.setSpecular(0.1, 0.1, 0.1, 1);
    this.topMat.setShininess(1.0);

    this.bottomMat = new CGFappearance(this.scene);
    this.bottomMat.loadTexture(bottomTex);
    this.bottomMat.setTextureWrap('REPEAT', 'REPEAT');
    this.bottomMat.setAmbient(1, 1, 1, 1);
    this.bottomMat.setDiffuse(0.9, 0.9, 0.9, 1);
    this.bottomMat.setSpecular(0.1, 0.1, 0.1, 1);
    this.bottomMat.setShininess(1.0);
}

  display() {
    //Front
    this.frontMat.apply()
    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST)
    this.scene.pushMatrix()
    this.scene.translate(0.5, 0, 0)
    this.scene.rotate(Math.PI / 2, 0, 1, 0)
    this.quad.display()
    this.scene.popMatrix()

    //Back
    this.backMat.apply()
    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST)
    this.scene.pushMatrix()
    this.scene.translate(-0.5, 0, 0)
    this.scene.rotate(3 * Math.PI / 2, 0, 1, 0)
    this.quad.display()
    this.scene.popMatrix()

    //Left
    this.leftMat.apply()
    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST)
    this.scene.pushMatrix()
    this.scene.translate(0,0,0.5)
    this.quad.display()
    this.scene.popMatrix()

    //Right
    this.rightMat.apply()
    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST)
    this.scene.pushMatrix()
    this.scene.translate(0,0,-0.5)
    this.scene.rotate(Math.PI,1, 0, 0)
    this.quad.display()
    this.scene.popMatrix()

    //Top
    this.topMat.apply()
    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST)
    this.scene.pushMatrix()
    this.scene.translate(0,0.5,0)
    this.scene.rotate(3 * Math.PI/2 ,1, 0, 0)
    this.quad.display()
    this.scene.popMatrix()

    //Bottom
    this.bottomMat.apply()
    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST)
    this.scene.pushMatrix()
    this.scene.translate(0,-0.5,0)
    this.scene.rotate(Math.PI/2 ,1, 0, 0)
    this.quad.display()
    this.scene.popMatrix()
  }
}
