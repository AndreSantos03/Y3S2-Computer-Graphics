import {CGFappearance, CGFobject, CGFtexture} from "../../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyCylinder } from "./MyCylinder.js";

export class MyFlower extends CGFobject{
    constructor(scene,flowerRadius=0.8,numberFlorets=6,floretsColor = [1, 1, 1, 1],diskRadius=0.8,diskColor=[1, 1, 0, 1],stemRadius,stemSize,leavesColor){
        super(scene);
        this.stem = new MyCylinder(scene,10,10);
        this.disk = new MySphere(scene,diskRadius,10,10);
        this.florets = [];
        for(let i = 0; i < 6; i++){
            let floret = [new MyTriangle(scene),new MyTriangle(scene)];
            this.florets.push(floret);
        }
        
        this.flowerRadius = flowerRadius;
        this.numberFlorets = numberFlorets;
        this.floretsColor = floretsColor;
        this.diskRadius = diskRadius;
        this.diskColor = diskColor;
        this.stemRadius = stemRadius;
        this.stemSize = stemSize;
        this.leavesColor = leavesColor;


        this.initMaterials();
    }

    initMaterials() {
        // Stem color (green)
        const stemColor = [0.1, 0.5, 0.1, 1];

 

        // Stem material
        this.stemMaterial = new CGFappearance(this.scene);
        this.stemMaterial.setAmbient(...stemColor.map(c => c * 0.2));
        this.stemMaterial.setDiffuse(...stemColor);
        this.stemMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.stemMaterial.setShininess(10);

        // Disk material
        this.diskMaterial = new CGFappearance(this.scene);
        this.diskMaterial.setAmbient(...diskColor.map(c => c * 0.2));
        this.diskMaterial.setDiffuse(...diskColor);
        this.diskMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.diskMaterial.setShininess(10);


        //florets
        this.floretMaterial = new CGFappearance(this.scene);
        this.floretMaterial.setAmbient(...this.floretsColor.map(c => c * 0.2));
        this.floretMaterial.setDiffuse(...this.floretsColor);
        this.floretMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.floretMaterial.setShininess(10);
    }

    display(){
        this.draw();
    }

    draw(){
        //Stem
        this.scene.pushMatrix();
        this.scene.translate(0,4,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(0.3,0.3,4);
        this.stemMaterial.apply();
        this.stem.display();
        this.scene.popMatrix();

        // //Disk
        this.scene.pushMatrix();
        this.scene.translate(0,4,0.5);
        this.scene.scale(1,1,1);
        this.diskMaterial.apply();
        this.disk.display();
        this.scene.popMatrix();

        //FLorets
        for (let i = 0; i < this.numberFlorets; i++) {
            var floret = this.florets[i]; 
            var firstTriangle = floret[0];
            var secondTriangle = floret[1]; 
            var angle = (i / this.numberFlorets) * (2 * Math.PI) +Math.PI;

            // First Petal
            this.scene.pushMatrix();  
            this.scene.translate(0,4,0.5);
            this.scene.rotate(angle, 0, 0, 1); // rotate to be around the flower
            this.scene.scale(this.flowerRadius/4,this.flowerRadius, 0); // Scale flower
            this.scene.rotate(5 * Math.PI / 4, 0, 0, 1); // Rotate it upwards
            this.scene.translate(1,1,0);// Translate the petal onto the side of the of disk
            this.floretMaterial.apply();
            firstTriangle.display();
            this.scene.popMatrix();


            // // //Second Petal
            this.scene.pushMatrix();
            this.scene.translate(0,4,0.5);
            this.scene.rotate(angle,0,0,1);
            this.scene.scale(this.flowerRadius/4,this.flowerRadius,0); //scale flower
            this.scene.rotate(Math.PI/4,0,0,1);//rotate it downwards
            this.scene.translate(-1, -1, 0); // Translate the petal onto the side of the of disk
            this.floretMaterial.apply();
            secondTriangle.display();
            this.scene.popMatrix();
        }
    }
}
