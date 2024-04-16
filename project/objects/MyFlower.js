import {CGFappearance, CGFobject, CGFtexture} from "../../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyCylinder } from "./MyCylinder.js";

export class MyFlower extends CGFobject{
    constructor(scene,x,y,z){
        super(scene);
        this.stem = new MyCylinder(scene,10,10);
        this.disk = new MySphere(scene,0.75,10,10);
        this.florets = [];
        for(let i = 0; i < 6; i++){
            let floret = [new MyTriangle(scene),new MyTriangle(scene)];
            this.florets.push(floret);
        }
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
        this.stem.display();
        this.scene.popMatrix();

        // //Disk
        this.scene.pushMatrix();
        this.scene.translate(0,4,0.5);
        this.scene.scale(1,1,1);
        this.disk.display();
        this.scene.popMatrix();

        //FLorets
        for (let i = 0; i < 6; i++) {
            var floret = this.florets[i]; 
            var firstTriangle = floret[0];
            var secondTriangle = floret[1]; 
            var angle = (i / 6) * (2 * Math.PI);

            // First Petal
            this.scene.pushMatrix();  
            this.scene.translate(0,4,0.5);
            this.scene.rotate(angle, 0, 0, 1); // rotate to be around the flower
            this.scene.scale(0.25, 1, 0); // Scale flower
            this.scene.rotate(5 * Math.PI / 4, 0, 0, 1); // Rotate it upwards
            this.scene.translate(1,1,0);// Translate the petal onto the side of the of disk
            firstTriangle.display();
            this.scene.popMatrix();


            // // //Second Petal
            this.scene.pushMatrix();
            this.scene.translate(0,4,0.5);
            this.scene.rotate(angle,0,0,1);
            this.scene.scale(0.25,1,0); //scale flower
            this.scene.rotate(Math.PI/4,0,0,1);//rotate it downwards
            this.scene.translate(-1, -1, 0); // Translate the petal onto the side of the of disk
            secondTriangle.display();
            this.scene.popMatrix();
        }
    }
}
