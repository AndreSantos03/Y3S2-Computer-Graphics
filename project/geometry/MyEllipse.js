import { CGFobject } from '../../lib/CGF.js';

export class MyEllipse extends CGFobject {

    constructor(scene, radiusX, radiusY, slices) {
        super(scene);
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.slices = slices;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
    
        let angle;
        let x, y;
    
        // Center of the ellipse
        this.vertices.push(0, 0, 0);
        this.normals.push(0, 0, 1);
        this.texCoords.push(0.5, 0.5);
    
        for (let i = 0; i <= this.slices; i++) {
            angle = (i * 2 * Math.PI) / this.slices;
            x = this.radiusX * Math.cos(angle);
            y = this.radiusY * Math.sin(angle);
    
            // Front vertices
            this.vertices.push(x, y, 0);
            this.normals.push(0, 0, 1); // Front normals point upwards in z-axis
            this.texCoords.push(0.5 + 0.5 * Math.cos(angle), 0.5 + 0.5 * Math.sin(angle));
    
            // Back vertices (duplicate vertices with flipped normals)
            this.vertices.push(x, y, 0);
            this.normals.push(0, 0, -1); // Back normals point downwards in z-axis
            this.texCoords.push(0.5 + 0.5 * Math.cos(angle), 0.5 + 0.5 * Math.sin(angle));
        }
    
        for (let i = 0; i < this.slices; i++) {
            // Front face indices
            this.indices.push(0, 2 * i + 1, 2 * ((i + 1) % this.slices) + 1);
    
            // Back face indices
            this.indices.push(2 * i + 2, 0, 2 * ((i + 1) % this.slices) + 2);
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    
}
