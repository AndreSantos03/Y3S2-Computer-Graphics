import {CGFappearance, CGFobject, CGFtexture} from "../../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyCylinder } from "./MyCylinder.js";

export class MyFlower extends CGFobject{
    constructor(scene,flowerRadius=0.8,numberFlorets=6,floretsColor = '#FFFFFF',diskRadius=0.8,diskColor = '#FFFF00',stemRadius = 1,stemSize=3,stemColor='#4eb300',leavesColor='#afbd22'){
        super(scene);


        
        this.stems = [];
        this.stemsAngles = [];
        var maxStemAngle = Math.PI / 40;
        for(let i = 0; i < stemSize; i++){
            let stem = new MyCylinder(scene,10,10);
            this.stems.push(stem);
            this.stemsAngles.push([Math.random() * maxStemAngle]);
            console.log(this.stemsAngles[i]);
        }

        //leaves for the intersection of the stems
        this.leave = new MyTriangle(scene);

        this.disk = new MySphere(scene,diskRadius,10,10);

        this.florets = [];
        for(let i = 0; i < 6; i++){
            let floret = [new MyTriangle(scene),new MyTriangle(scene)];
            this.florets.push(floret);
        }

        this.flowerRadius = flowerRadius;
        this.numberFlorets = numberFlorets;
        this.floretsColor = hexToRgb(floretsColor);
        this.diskRadius = diskRadius;
        this.diskColor = hexToRgb(diskColor);
        this.stemRadius = stemRadius;
        this.stemSize = stemSize;
        this.stemColor = hexToRgb(stemColor);
        this.leavesColor = hexToRgb(leavesColor);


        this.initMaterials();
    }

    initMaterials() {

        // Stem material
        this.stemMaterial = new CGFappearance(this.scene);
        this.stemMaterial.setAmbient(...this.stemColor.map(c => c * 0.2));
        this.stemMaterial.setDiffuse(...this.stemColor);
        this.stemMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.stemMaterial.setShininess(10);

        // Disk material
        this.diskMaterial = new CGFappearance(this.scene);
        this.diskMaterial.setAmbient(...this.diskColor.map(c => c * 0.2));
        this.diskMaterial.setDiffuse(...this.diskColor);
        this.diskMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.diskMaterial.setShininess(10);


        //florets
        this.floretMaterial = new CGFappearance(this.scene);
        this.floretMaterial.setAmbient(...this.floretsColor.map(c => c * 0.2));
        this.floretMaterial.setDiffuse(...this.floretsColor);
        this.floretMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.floretMaterial.setShininess(10);

        //leaves
        this.leaveMaterial = new CGFappearance(this.scene);
        this.leaveMaterial.setAmbient(...this.leavesColor.map(c => c * 0.2));
        this.leaveMaterial.setDiffuse(...this.leavesColor);
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
            this.scene.translate(0,1 + i,0);
            this.scene.rotate(angle,0,0,1);
            this.scene.rotate(Math.PI/2,1,0,0);
            this.scene.scale(this.stemRadius * 0.2,this.stemRadius * 0.2,1.1);
            this.stemMaterial.apply();
            stem.display();
            this.scene.popMatrix();

            //draw the leave for each intersection
            if(i + 1 != this.stems.length){
                this.scene.pushMatrix();
                let aroundCaleAngle = (i % 2 === 0) ? Math.PI / 4 : Math.PI * 5 / 4; // so it switches side in intersection
                this.scene.rotate(aroundCaleAngle,0,1,0);
                this.scene.rotate(Math.PI/2,1,0,0);//rotate so its parralel to xz
                this.scene.scale(0.4,0.4,1);
                this.scene.translate(1,1,-1 -i);
                this.leaveMaterial.apply();
                this.leave.display();
                this.scene.popMatrix();
            }
        }

        //Disk
        this.scene.pushMatrix();
        this.scene.translate(0,stemLength,0.5);
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
            this.scene.translate(0,stemLength,0.5);
            this.scene.rotate(angle, 0, 0, 1); // rotate to be around the flower
            this.scene.scale(this.flowerRadius/4,this.flowerRadius, 1); // Scale flower
            this.scene.rotate(5 * Math.PI / 4, 0, 0, 1); // Rotate it upwards
            this.scene.translate(1,1,0);// Translate the petal onto the side of the of disk
            this.floretMaterial.apply();
            firstTriangle.display();
            this.scene.popMatrix();


            // // //Second Petal
            this.scene.pushMatrix();
            this.scene.translate(0,stemLength,0.5);
            this.scene.rotate(angle,0,0,1);
            this.scene.scale(this.flowerRadius/4,this.flowerRadius,1); //scale flower
            this.scene.rotate(Math.PI/4,0,0,1);//rotate it downwards
            this.scene.translate(-1, -1, 0); // Translate the petal onto the side of the of disk
            this.floretMaterial.apply();
            secondTriangle.display();
            this.scene.popMatrix();
        }
    }

}
function hexToRgb(hex) {
    // Remove '#' if present
    hex = hex.replace(/^#/, '');

    // Convert hex to RGB
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return [r / 255, g / 255, b / 255, 1];
}