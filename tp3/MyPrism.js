import {CGFobject} from '../lib/CGF.js';
/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
	constructor(scene, slices, stacks)
	{
		super(scene);
		
		this.slices = slices;
		this.stacks = stacks;

		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [0, 0, 0]
		this.indices = [0, 1, 2]

		var angle = 2 * Math.PI / this.slices

		for (var i = 0; i < this.slices; i++)
		{
			this.vertices.push(Math.cos(angle * i))
			this.vertices.push(Math.sin(angle * i))
			this.vertices.push(0)

			this.indices.push(0)
			this.indices.push(i+1)
			this.indices.push(i+2)
		}

		this.indices[this.indices.length-1] = 1

		console.log(this.indices)
		console.log(this.vertices)

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	updateBuffers(complexity){
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}

