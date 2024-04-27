import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../../lib/CGF.js";
import { MyFlower } from "./objects/MyFlower.js";

export class MyGarden extends CGFscene {
    constructor( scene, numberFlowersRow = 5,numberFlowersCol=5) {
        super();
        this.scene =scene;
        this.numRows = numberFlowersRow;
        this.numCols = numberFlowersCol; 
        this.flowers = [];
        this.init();
    }

    init() {
        // Create flowers and position them in the garden
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                let x = j * 4; 
                let z = i * 4;
                let flower = new MyFlower(this.scene, x,0,z);
                this.flowers.push(flower);
            }
        }
    }

    display() {
        // Display flowers
        for (let i = 0; i < this.flowers.length; i++) {
            this.flowers[i].display();
        }
    }
}
