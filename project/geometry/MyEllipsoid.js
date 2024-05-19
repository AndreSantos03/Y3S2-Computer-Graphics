import { CGFobject } from '../../lib/CGF.js';

export class MyEllipsoid extends CGFobject {

    constructor(scene, radiusX, radiusY, radiusZ, slices, stacks) {
        super(scene);
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.radiusZ = radiusZ;
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
    
        let angleXZ, angleXY, x, y, z;
    
        for (let i = 0; i <= this.slices; i++) {
            angleXZ = 2 * Math.PI * i / this.slices;
            for (let j = 0; j <= this.stacks; j++) {
                angleXY = Math.PI * j / this.stacks;
    
                x = this.radiusX * Math.cos(angleXZ) * Math.sin(angleXY);
                y = this.radiusY * Math.sin(angleXZ) * Math.sin(angleXY);
                z = this.radiusZ * Math.cos(angleXY);
    
                // Reverse the order of vertices to invert the ellipsoid geometry
                this.vertices.push(-x, -y, -z);
    
                // Calculate normals pointing outward
                let normalX = -x / this.radiusX;
                let normalY = -y / this.radiusY;
                let normalZ = -z / this.radiusZ;
    
                this.normals.push(normalX, normalY, normalZ);
    
                // Calculate texture coordinates
                let u = 0.5 + Math.atan2(normalY, normalX) / (2 * Math.PI);
                let v = 0.5 - Math.asin(normalZ) / Math.PI;
    
                this.texCoords.push(u, v);
            }
        }
    
        for (let i = 0; i < this.slices; i++) {
            for (let j = 0; j < this.stacks; j++) {
                let index1 = (this.stacks + 1) * i + j;
                let index2 = index1 + this.stacks + 1;
    
                // Reverse the order of indices to invert the ellipsoid geometry
                this.indices.push(index1, index2, index1 + 1);
                this.indices.push(index2, index2 + 1, index1 + 1);
            }
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    
}
