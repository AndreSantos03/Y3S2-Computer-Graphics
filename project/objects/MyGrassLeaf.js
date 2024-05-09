import {CGFappearance, CGFobject, CGFtexture} from "../../lib/CGF.js";
import { MyEllipsoid } from "./MyEllipsoid.js";

export class MyGrassLeaf extends CGFobject{
    constructor(scene,x,y,z){
        super(scene);
        this.x = x;
        this.y = y;
        this.z = z;

        let minWidth = 0.1;
        let maxWidth = 0.3;
        this.width = minWidth + Math.random() * (maxWidth - minWidth);
        
        let minHeight = 0.2;
        let maxHeight = 1;
        this.height = minHeight + Math.random() * (maxHeight - minHeight);


        this.grassBody = new MyEllipsoid(scene,this.width,this.height,0.01,6,6);
        this.initMaterials();
    }
    initMaterials() {
        this.grassAppearance = new CGFappearance(this.scene);
        this.grassTexture = new CGFtexture(this.scene, './images/grassTexture.jpg');
        this.grassAppearance.setTexture(this.grassTexture);
        this.grassAppearance.setAmbient(0.2, 0.8, 0.2, 1);
        this.grassAppearance.setDiffuse(0.2, 0.8, 0.2, 1);
        this.grassAppearance.setSpecular(0.2, 0.8, 0.2, 1);
        this.grassAppearance.setShininess(2);
    }
    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.x,this.y,this.z)
        this.scene.translate(0,this.height/2,0);
        this.grassAppearance.apply();
        this.grassBody.display();
        this.scene.popMatrix();
    }
}