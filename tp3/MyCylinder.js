import {CGFobject} from '../lib/CGF.js';
/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
	constructor(scene, slices, stacks)
	{
		super(scene);
		
		this.slices = slices;
		this.stacks = stacks;

		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = []
		this.indices = []
		this.normals = []

		var angle = 2 * Math.PI / this.slices

		for (var j = 0; j < this.stacks; j++)
		{
			for (var i = 0; i < this.slices; i++)
			{
				this.vertices.push(Math.cos(angle * i))
				this.vertices.push(Math.sin(angle * i))
				this.vertices.push((j+1) / this.stacks)

				this.vertices.push(Math.cos(angle * i))
				this.vertices.push(Math.sin(angle * i))
				this.vertices.push(j / this.stacks)

				this.indices.push(j*this.slices*2 + i*2)
				this.indices.push(j*this.slices*2 + i*2+1)
				this.indices.push(j*this.slices*2 + i*2+2)

				this.indices.push(j*this.slices*2 + i*2+1)
				this.indices.push(j*this.slices*2 + i*2+3)
				this.indices.push(j*this.slices*2 + i*2+2)

				this.normals.push(Math.cos(angle), Math.cos(Math.PI/4.0), -Math.sin(angle));
				this.normals.push(Math.cos(angle), Math.cos(Math.PI/4.0), -Math.sin(angle));
			}

			this.indices[this.indices.length-1] = j*this.slices*2
			this.indices[this.indices.length-2] = j*this.slices*2 + 1
			this.indices[this.indices.length-4] = j*this.slices*2
		}

		print (this.indices)
		print (this.vertices)

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	updateBuffers(complexity){
		this.slices = 3 + Math.round(9 * complexity);
		
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}

