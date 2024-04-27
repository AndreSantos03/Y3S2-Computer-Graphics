import {CGFappearance, CGFobject, CGFtexture} from "../../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyCylinder } from "./MyCylinder.js";

export class MyFlower extends CGFobject{
    constructor(scene,x,y,z){
        super(scene);

        this.x = x;
        this.y = y;
        this.z = z;

        this.flowerRadius = getRandomNumber(0.4,1,0.001);
        this.numberFlorets = getRandomNumber(5,12,1);
        this.diskRadius = getRandomNumber(0.2,0.8,0.001);
        this.stemRadius = getRandomNumber(0.4,0.8,0.001);;
        this.stemSize = getRandomNumber(2,4,1);
        this.floretsColor = getRandomRGBColor();
        this.diskColor = getRandomRGBColor();
        this.stemColor = getRandomRGBColor();
        this.leavesColor = getRandomRGBColor();

        
        this.stems = [];
        this.stemsAngles = [];
        var maxStemAngle = Math.PI / 100;
        for(let i = 0; i < this.stemSize; i++){
            let stem = new MyCylinder(scene,10,10);
            this.stems.push(stem);
            this.stemsAngles.push([Math.random() * maxStemAngle]);
        }

        //leaves for the intersection of the stems
        this.leave = new MyTriangle(scene);

        this.disk = new MySphere(scene,this.diskRadius,10,10);

        this.florets = [];
        for(let i = 0; i < this.numberFlorets; i++){
            let floret = [new MyTriangle(scene),new MyTriangle(scene)];
            this.florets.push(floret);
        }

        this.initMaterials();
    }

    initMaterials() {

        // Stem material
        this.stemMaterial = new CGFappearance(this.scene);
        this.stemMaterial.setAmbient(this.stemColor[0] * 0.2, this.stemColor[1] * 0.2, this.stemColor[2] * 0.2,this.stemColor[3]);
        this.stemMaterial.setDiffuse(this.stemColor[0], this.stemColor[1], this.stemColor[2],1);
        this.stemMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.stemMaterial.setShininess(10);

        // Disk material
        this.diskMaterial = new CGFappearance(this.scene);
        this.diskMaterial.setAmbient(this.diskColor[0] * 0.2, this.diskColor[1] * 0.2, this.diskColor[2] * 0.2,this.diskColor[3]);
        this.diskMaterial.setDiffuse(this.diskColor[0], this.diskColor[1], this.diskColor[2]);
        this.diskMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.diskMaterial.setShininess(10);

        // Florets material
        this.floretMaterial = new CGFappearance(this.scene);
        this.floretMaterial.setAmbient(this.floretsColor[0] * 0.2, this.floretsColor[1] * 0.2, this.floretsColor[2] * 0.2,this.floretsColor[3]);
        this.floretMaterial.setDiffuse(this.floretsColor[0], this.floretsColor[1], this.floretsColor[2]);
        this.floretMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.floretMaterial.setShininess(10);

        // Leaves material
        this.leaveMaterial = new CGFappearance(this.scene);
        this.leaveMaterial.setAmbient(this.leavesColor[0] * 0.2, this.leavesColor[1] * 0.2, this.leavesColor[2] * 0.2,this.leavesColor[3]);
        this.leaveMaterial.setDiffuse(this.leavesColor[0], this.leavesColor[1], this.leavesColor[2]);
        this.leaveMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.leaveMaterial.setShininess(10);

    }

    display(){
        this.draw();
    }

    draw(){

        var stemLength = this.stemSize;
        //Stem
        for (let i = 0; i < this.stems.length; i++) {
            var stem = this.stems[i];
            var angle = this.stemsAngles[i];
            this.scene.pushMatrix();
            this.scene.translate(this.x,1 + i + this.y,this.z);
            this.scene.rotate(angle,0,0,1);
            this.scene.rotate(Math.PI/2,1,0,0);
            this.scene.scale(this.stemRadius * 0.2,this.stemRadius * 0.2,1.1);
            this.stemMaterial.apply();
            stem.display();
            this.scene.popMatrix();

            //draw the leave for each intersection
            if(i + 1 != this.stems.length){
                this.scene.pushMatrix();
                this.scene.translate(this.x,this.y,this.z);
                let aroundCaleAngle = (i % 2 === 0) ? Math.PI / 2 : Math.PI; // so it switches side in intersection
                this.scene.rotate(aroundCaleAngle,0,1,0);
                this.scene.rotate(Math.PI/2,1,0,0);//rotate so its parralel to xz
                this.scene.scale(0.3,0.3,1);
                this.scene.translate(1,1,-1 -i);
                this.leaveMaterial.apply();
                this.leave.display();
                this.scene.popMatrix();
            }
        }

        //Disk
        this.scene.pushMatrix();
        this.scene.translate(this.x,stemLength + this.y,0.2 + this.z);
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
            this.scene.translate(this.x,stemLength + this.y,0.2 + this.z);
            this.scene.rotate(angle, 0, 0, 1); // rotate to be around the flower
            this.scene.scale(this.flowerRadius/4,this.flowerRadius, 1); // Scale flower
            this.scene.rotate(5 * Math.PI / 4, 0, 0, 1); // Rotate it upwards
            this.scene.translate(1,1,0);// Translate the petal onto the side of the of disk
            this.floretMaterial.apply();
            firstTriangle.display();
            this.scene.popMatrix();


            // // //Second Petal
            this.scene.pushMatrix();
            this.scene.translate(this.x,stemLength + this.y,this.z);
            this.scene.rotate(angle,0,0,1);
            this.scene.scale(this.flowerRadius/4,this.flowerRadius,1); //scale flower
            this.scene.rotate(-Math.PI/20,1,0,0); //add slight tilt to petals

            this.scene.rotate(Math.PI/4,0,0,1);//rotate it downwards

            this.scene.translate(-1, -1, 0); // Translate the petal onto the side of the of disk
            this.floretMaterial.apply();
            secondTriangle.display();
            this.scene.popMatrix();
        }
    }

}



function getRandomNumber(min, max, precision) {
    let range = max - min;
    let randomValue = Math.random() * range + min;
    let multiplier = 1 / precision;
    return Math.round(randomValue * multiplier) / multiplier;
}

function getRandomRGBColor() {
    let red = Math.random(); // Random number between 0 and 1
    let green = Math.random(); // Random number between 0 and 1
    let blue = Math.random(); // Random number between 0 and 1
    
    return [red,green,blue,1];
}