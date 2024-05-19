import { CGFobject } from '../../lib/CGF.js';

export class MyTriangleMesh extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    
    initBuffers() {
        this.vertices = [
            0, 0, 0,    //0
            1, 0, 0,    //1
            0, 1, 0,    //2
            1, 1, 0,    //3
            2, 0, 0,    //4
            2, 1, 0,    //5
            0, 2, 0,    //6
            1, 2, 0,    //7
            2, 2, 0,    //8
            1, 3, 0,    //9
            -0.5, 0, 0,   //10
            2.5, 0, 0,    //11
        ];

        this.texCoords = [
            1/6, 1,   // Vertex 0
            1/2, 1,   // Vertex 1
            1/6, 2/3,   // Vertex 2
            1/2, 2/3,   // Vertex 3
            5/6, 1,   // Vertex 4
            5/6, 2/3,   // Vertex 5
            1/6, 1/3,   // Vertex 6
            0.5, 1/3,   // Vertex 7
            5/6, 1/3,   // Vertex 8
            0.5, 0,   // Vertex 9
            0, 1, // Vertex 10
            1, 1, // Vertex 11
        ];

        this.indices = [
            //frontface 
            0, 1, 2,
            1, 3, 2,
            2, 3, 6,
            6, 3, 7,
            3, 1, 4,
            3, 4, 5,
            5, 7, 3,
            7, 5, 8,
            6, 7, 9,
            9, 7, 8,
            10, 0,6,
            4, 11, 8,
            //backface
            2, 1, 0,
            2, 3, 1,
            6, 3, 2,
            7, 3, 6,
            4, 1, 3,
            5, 4, 3,
            3, 7, 5,
            8, 5, 7,
            9, 7, 6,
            8, 7, 9,
            6, 0, 10,
            8, 11, 4,  
        ];

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
        ];
    
        

        // The defined indices (and corresponding vertices)
        // will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;
    
        this.initGLBuffers();
    }
}
