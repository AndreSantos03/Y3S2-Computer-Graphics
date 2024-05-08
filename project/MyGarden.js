import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../../lib/CGF.js";
import { MyFlower } from "./objects/MyFlower.js";
import { MyHive } from "./objects/MyHive.js";
import { MyRockSet } from "./objects/MyRockSet.js";

export class MyGarden extends CGFscene {
    constructor( scene, numberFlowersRow = 5,numberFlowersCol=5) {
        super();
        this.scene =scene;
        this.numRows = numberFlowersRow;
        this.numCols = numberFlowersCol; 
        this.flowers = [];
        this.flowerSpacing = 5;

        this.rockset = new MyRockSet(scene,-10,0,-10);
        this.hive = new MyHive(scene,-10,0,-10);


        this.init();
    }

    init() {

        //rockMaterial
        this.rockAppearance = new CGFappearance(this.scene);
        this.rockAppearance.setAmbient(0.3, 0.3, 0.3, 1);
        this.rockAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
        this.rockAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.rockAppearance.setShininess(1);
        this.rockTexture = new CGFtexture(this.scene,"./images/rockTexture.jpg")
        this.rockAppearance.setTexture(this.rockTexture);
        this.rockAppearance.setTextureWrap('REPEAT', 'REPEAT');


        // Create flowers and position them in the garden
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                let x = j * this.flowerSpacing; 
                let z = i * this.flowerSpacing;
                let flower = new MyFlower(this.scene, x,0,z);
                this.flowers.push(flower);
            }
        }
    }

    getNumRows(){
        return this.numRows;
    }
    getNumCols(){
        return this.numCols;
    }
    getFlowerSpacing(){
        return this.flowerSpacing;
    }

    getFlower(x,z){
        //checks to see if position has flower
        if( x >= 0 && x <= this.numRows && z >= 0 && z <= this.numCols){
            return this.flowers[this.numRows * z + x];
        }
        return null;
    }

    getHive(){
        return this.hive;
    }
    display() {
        // Display flowers
        for (let i = 0; i < this.flowers.length; i++) {
            this.flowers[i].display();
        }

        this.hive.display();

        this.scene.pushMatrix();
        this.rockAppearance.apply()
        this.rockset.display();
        this.scene.popMatrix();
    }
}
