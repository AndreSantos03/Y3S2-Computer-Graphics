import { CGFobject } from '../../lib/CGF.js';

export class MySphere extends CGFobject {

    constructor(scene, radius, slices, stacks, inside=false, north=1, south=1) {
        super(scene);
        this.radius = radius;
        this.slices = slices;
        this.stacks = stacks;
        this.inside = inside ? -1 : 1;
        this.north = north;
        this.south = south;
        this.initBuffers();
    }

    initBuffers() {

        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        for(var i = 0; i <= this.slices; i++) {
            var lat0 =  Math.PI * (-0.5 +  (i - 1) / this.slices);
            var z0  = Math.sin(lat0);
            var zr0 =  Math.cos(lat0);
    
            var lat1 =  Math.PI * (-0.5 +  i / this.slices);
            var z1 = Math.sin(lat1);
            var zr1 = Math.cos(lat1);
    
            for(var j = 0; j <= this.stacks; j++) {
                var lng = 2 * Math.PI * (j - 1) / this.stacks;
                var x = Math.cos(lng);
                var y = Math.sin(lng);
    
                this.normals.push(x * zr0, y * zr0, z0);
                this.vertices.push(this.radius * x * zr0, this.radius * y * zr0, this.radius * z0);
                this.normals.push(x * zr1, y * zr1, z1);
                this.vertices.push(this.radius * x * zr1, this.radius * y * zr1, this.radius * z1);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}