import { CGFobject } from '../../lib/CGF.js';

export class MyEllipsoid extends CGFobject {

    constructor(scene, radiusX, radiusY, radiusZ, slices, stacks, inside=false) {
        super(scene);
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.radiusZ = radiusZ;
        this.slices = slices;
        this.stacks = stacks;
        this.inside = inside ? -1 : 1;
        this.initBuffers();

        console.log("dajwdjawdw-ajda\n");
    }

    initBuffers() {

        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        let angleXZ, angleXY, x, y, z, points, indexA, indexB, indexC, indexD;

        for (let i = 0; i <= this.slices; i++) {
            angleXZ = 2 * Math.PI * i / this.slices;
            for (let j = 0; j <= this.stacks; j++) {
                angleXY = Math.PI * j / this.stacks;

                x = this.radiusX * Math.cos(angleXZ) * Math.sin(angleXY);
                y = this.radiusY * Math.sin(angleXZ) * Math.sin(angleXY);
                z = this.radiusZ * Math.cos(angleXY);

                this.vertices.push(x, y, z);
                this.normals.push(this.inside * x / this.radiusX, this.inside * y / this.radiusY, this.inside * z / this.radiusZ);
                this.texCoords.push(i / this.slices, j / this.stacks);
            }
        }

        for (let i = 0; i < this.slices; i++) {
            for (let j = 0; j < this.stacks; j++) {
                let index1 = (this.stacks + 1) * i + j;
                let index2 = index1 + this.stacks + 1;

                this.indices.push(index1, index2, index1 + 1);
                this.indices.push(index2, index2 + 1, index1 + 1);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
