import { CGFobject } from '../../lib/CGF.js';

export class MyPollen extends CGFobject {

    constructor(scene, radius, slices, stacks, inside=false, north_scale, south_scale) {
        super(scene);
        this.radius = radius;
        this.slices = slices;
        this.stacks = stacks * 2;
        this.inside = inside;
        this.north_scale = north_scale
        this.south_scale = south_scale
        this.initBuffers();
    }

    initBuffers() {

        var i, ai, si, ci;
        var j, aj, sj, cj;
        var p1, p2;

        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        for (j = 0; j <= this.stacks; j++) 
        {
            aj = j * Math.PI / this.stacks;
            sj = Math.sin(aj);
            cj = Math.cos(aj);
            for (i = 0; i < this.slices; i++) 
            {
                ai = i * 2 * Math.PI / this.slices;
                si = Math.sin(ai);
                ci = Math.cos(ai);
                var x = si * sj * this.radius
                var y = cj * this.radius;
                var z = ci * sj * this.radius;

                this.vertices.push(x);  // X
                if (j < this.stacks / 2)
                    this.vertices.push(y * this.north_scale);       // Y
                else
                    this.vertices.push(y * this.south_scale);       // Y
                this.vertices.push(z);  // Z

                this.normals.push(si * sj * 1.0 / this.radius);  // X
                this.normals.push(cj * 1.0 / this.radius);       // Y
                this.normals.push(ci * sj * 1.0 / this.radius);  // Z

                this.texCoords.push(i / (this.slices - 1));
                this.texCoords.push(j / this.stacks);
            }
        }

        for (j = 0; j < this.stacks; j++)
        {
            for (i = 0; i < this.slices - 1; i++)
            {
                p1 = j * (this.slices) + i;
                p2 = p1 + (this.slices);
                if (this.inside)
                {
                    this.indices.push(p1);
                    this.indices.push(p1 + 1);
                    this.indices.push(p2);
                    this.indices.push(p1 + 1);
                    this.indices.push(p2 + 1);
                    this.indices.push(p2);
                }
                else
                {
                    this.indices.push(p1);
                    this.indices.push(p2);
                    this.indices.push(p1 + 1);
                    this.indices.push(p1 + 1);
                    this.indices.push(p2);
                    this.indices.push(p2 + 1);
                }
            }

            if (this.inside)
            {
                this.indices.push(j * this.slices);
                this.indices.push((j + 1 ) * this.slices);
                this.indices.push((j + 2 ) * this.slices - 1);
                if (j != 0)
                {
                    this.indices.push(j * this.slices);
                    this.indices.push((j + 2 ) * this.slices - 1);
                    this.indices.push((j + 1) * this.slices - 1);
                }
            }
            else
            {
                this.indices.push(j * this.slices);
                this.indices.push((j + 2 ) * this.slices - 1);
                this.indices.push((j + 1 ) * this.slices);
                if (j != 0)
                {
                    this.indices.push(j * this.slices);
                    this.indices.push((j + 1) * this.slices - 1);
                    this.indices.push((j + 2 ) * this.slices - 1);
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}