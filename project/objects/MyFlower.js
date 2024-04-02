import {CGFappearance, CGFobject, CGFtexture} from "../../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyCylinder } from "./MyCylinder.js";

export class MyFlower extends CGFobject{
    constructor(scene,x,y,z){
        super(scene);
        this.stem = new MyCylinder(scene,5,5);
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
        this.stem.display();

        //Disk
        this.disk.display();

        //FLorets
        for(let i = 0; i < 6;i++){
            this.florets[i].display();
        }
    }
}