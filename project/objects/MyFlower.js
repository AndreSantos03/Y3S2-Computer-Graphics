import {CGFappearance, CGFobject, CGFtexture} from "../../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyCylinder } from "./MyCylinder.js";

export class MyFlower extends CGFobject{
    constructor(scene,x,y,z){
        super(scene);
        this.stem = new MyCylinder(scene,10,10);
        this.disk = new MySphere(scene,5,5);
        this.florets = [];
        for(let i = 0; i < 6; i++){
            let floret = (new MyTriangle(scene),new MyTriangle(scene));
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
        this.scene.scale(1,1,4);
        this.stem.display();
        this.scene.popMatrix();

        // //Disk
        this.scene.pushMatrix();
        this.scene.scale(20,20,20);
        this.disk.display();
        this.scene.popMatrix();

        // //FLorets
        // for(let i = 0; i < 6;i++){
        //     this.florets[i].display();
        // }
    }
}