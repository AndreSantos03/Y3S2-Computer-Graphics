import {CGFappearance, CGFobject, CGFtexture, CGFshader} from "../../lib/CGF.js";
import { MyEllipsoid } from "./MyEllipsoid.js";

export class MyGrassLeaf extends CGFobject{
    constructor(scene,x,y,z,grassAppearance,grassShader){
        super(scene);
        this.x = x;
        this.y = y;
        this.z = z;
        this.grassShader = grassShader;

        this.grassAppearance = grassAppearance;

        let minWidth = 0.1;
        let maxWidth = 0.3;
        this.width = minWidth + Math.random() * (maxWidth - minWidth);
        
        let minHeight = 0.2;
        let maxHeight = 1;
        this.height = minHeight + Math.random() * (maxHeight - minHeight);


        this.grassBody = new MyEllipsoid(scene,this.width,this.height,0.01,5,5);
    }

    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.x,this.y,this.z)
        this.scene.translate(0,this.height/2,0);
        // this.scene.setActiveShader(this.grassShader);
        this.grassAppearance.apply();

        this.grassBody.display();
        this.scene.popMatrix();
        // this.scene.setActiveShader(this.scene.defaultShader);
    }
}