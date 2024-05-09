import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../../lib/CGF.js";
import { MyFlower } from "./objects/MyFlower.js";
import { MyGrassLeaf } from "./objects/MyGrassLeaf.js";
import { MyHive } from "./objects/MyHive.js";
import { MyRockSet } from "./objects/MyRockSet.js";

export class MyGarden extends CGFscene {
    constructor( scene) {
        super();
        this.scene =scene;
        this.flowers = [];
        this.flowerSpacing = 10;
        this.grass = []
        this.grassSpacing = 2;
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


        // Create flowers and position them in the garden of 50x50
        for (let i = 0; i <= 50; i += this.flowerSpacing) {
            for (let j = 0; j <= 50; j += this.flowerSpacing) {
                let flower = new MyFlower(this.scene, i,0,j);
                this.flowers.push(flower);
            }
        }

        // Create grass and position them in the garden of 50x50
        for (let i = 0; i <= 50; i += this.grassSpacing) {
            for (let j = 0; j <= 50; j += this.grassSpacing) {
                console.log()
                //check to see if its not in a flower occupied position
                if( (i % 10 != 0) && (j % 10 != 0)){
                    console.log(i + " " + j )
                    let grassLeaf = new MyGrassLeaf(this.scene, i,0,j);
                    this.grass.push(grassLeaf);
                }
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
        // Display grass
        for (let i = 0; i < this.grass.length; i++) {
            this.grass[i].display();
        }

        this.hive.display();

        this.scene.pushMatrix();
        this.rockAppearance.apply()
        this.rockset.display();
        this.scene.popMatrix();
    }
}
