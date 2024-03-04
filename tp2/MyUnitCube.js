import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0,
      1, 0, 0,
      0, 1, 0,
      1, 1, 0,
			0, 0, -1,
      1, 0, -1,
      0, 1, -1,
      1, 1, -1,
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
      1, 3, 2,
      1, 5, 7,
      1, 7, 3,
      5, 6, 7,
      5, 4, 6,
      4, 0, 2,
      4, 2, 6,
      0, 4, 1,
      1, 4, 5,
      2, 3, 7,
      2, 7, 6
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

