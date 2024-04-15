import { CGFobject } from '../../lib/CGF.js';

export class MySphere extends CGFobject {

    constructor(scene, radius, slices, stacks, inside=false) {
        super(scene);
        this.radius = radius;
        this.slices = slices;
        this.stacks = stacks;
        this.inside = inside;
        this.initBuffers();
    }

    initBuffers() {

        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var x, y, z, xz;                              // vertex position
        var nx, ny, nz, lengthInv = 1.0 / this.radius;    // vertex normal
        var s, t;                                     // vertex texCoord

        var sectorStep = 2 * Math.PI / this.slices;
        var stackStep = Math.PI / this.stacks;
        var sectorAngle, stackAngle;

        for(var i = 0; i <= this.stacks; ++i)
        {
            stackAngle = Math.PI / 2 - i * stackStep;        // starting from pi/2 to -pi/2
            xz = this.radius * Math.cos(stackAngle);             // r * cos(u)
            y = this.radius * Math.sin(stackAngle);              // r * sin(u)

            // add (this.slices+1) vertices per stack
            // first and last vertices have same position and normal, but different tex coords
            for(var j = 0; j <= this.slices; ++j)
            {
                sectorAngle = j * sectorStep;           // starting from 0 to 2pi

                // vertex position (x, y, z)
                x = xz * Math.cos(sectorAngle);             // r * cos(u) * cos(v)
                z = xz * Math.sin(sectorAngle);             // r * cos(u) * sin(v)
                this.vertices.push(x);
                this.vertices.push(y);
                this.vertices.push(z);

                // normalized vertex normal (nx, ny, nz)
                nx = x * lengthInv;
                ny = y * lengthInv;
                nz = z * lengthInv;
                this.normals.push(nx);
                this.normals.push(ny);
                this.normals.push(nz);

                // vertex tex coord (s, t) range between [0, 1]
                s = j / this.slices;
                t = i / this.stacks;
                this.texCoords.push(s);
                this.texCoords.push(t);
            }
        }

        var lineIndices = [];
        var k1, k2;
        for(var i = 0; i < this.stacks; ++i)
        {
            k1 = i * (this.slices + 1);     // beginning of current stack
            k2 = k1 + this.slices + 1;      // beginning of next stack

            for(var j = 0; j < this.slices; ++j, ++k1, ++k2)
            {
                // 2 triangles per sector excluding first and last stacks
                // k1 => k2 => k1+1
                if(i != 0)
                {
                    this.indices.push(k1);
                    if (this.inside)
                    {
                        this.indices.push(k2);
                        this.indices.push(k1 + 1);
                    }
                    else
                    {
                        this.indices.push(k1 + 1);
                        this.indices.push(k2);
                    }
                }

                // k1+1 => k2 => k2+1
                if(i != (this.stacks-1))
                {
                    this.indices.push(k1 + 1);
                    if (this.inside)
                    {
                        this.indices.push(k2);
                        this.indices.push(k2 + 1);
                    }
                    else
                    {
                        this.indices.push(k2 + 1);
                        this.indices.push(k2);
                    }
                }

                // store indices for lines
                // vertical lines for all stacks, k1 => k2
                lineIndices.push(k1);
                lineIndices.push(k2);
                if(i != 0)  // horizontal lines except 1st stack, k1 => k+1
                {
                    lineIndices.push(k1);
                    lineIndices.push(k1 + 1);
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}