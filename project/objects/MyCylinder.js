import {CGFobject} from '../../lib/CGF.js';
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
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		var angle = 2 * Math.PI / this.slices

		for (var j = 0; j < this.stacks; j++)
		{
			for (var i = 0; i <= this.slices; i++)
			{
				this.vertices.push(Math.cos(angle * i))
				this.vertices.push(Math.sin(angle * i))
				this.vertices.push((j+1) / this.stacks)

				this.vertices.push(Math.cos(angle * i))
				this.vertices.push(Math.sin(angle * i))
				this.vertices.push(j / this.stacks)
						
				if (i < this.slices - 1 || j != this.stacks -1 )
				{
					this.indices.push(j*this.slices*2 + i*2)
					this.indices.push(j*this.slices*2 + i*2+1)
					this.indices.push(j*this.slices*2 + i*2+2)
	
					this.indices.push(j*this.slices*2 + i*2+1)
					this.indices.push(j*this.slices*2 + i*2+3)
					this.indices.push(j*this.slices*2 + i*2+2)
				}

				this.normals.push(Math.cos(angle * i), Math.sin(angle * i),0);
				this.normals.push(Math.cos(angle * i), Math.sin(angle * i),0);

				this.texCoords.push(i / this.slices, (j + 1) / this.stacks); 
                this.texCoords.push(i / this.slices, j / this.stacks);
			}
		}

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

