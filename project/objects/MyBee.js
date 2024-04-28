import {CGFappearance, CGFobject, CGFtexture} from "../../lib/CGF.js";

import { MyEllipsoid } from "./MyEllipsoid.js";

export class MyBee extends CGFobject{
    constructor(scene,x,y,z){
        super(scene);

        this.x = x;
        this.y = y;
        this.z = z;

        this.torso = new MyEllipsoid(scene,0.5,0.5,0.8,7,7);
        this.tail = new MyEllipsoid(scene,0.6,0.6,1,7,7);
        this.head = new MyEllipsoid(scene,0.5,0.3,0.6,7,7);
        this.eye = new MyEllipsoid(scene,0.2,0.2,0.35,7,7);
        this.antenna = new MyEllipsoid(scene,0.05,0.05,0.2,7,7);
        this.feet = new MyEllipsoid(scene,0.05,0.25,0.05,7,7);
        this.initMaterials();
    }

    initMaterials() {
        this.torsoMaterial = new CGFappearance(this.scene);
        this.headMaterial = new CGFappearance(this.scene);
        this.eyeMaterial = new CGFappearance(this.scene);
        this.antennaMaterial = new CGFappearance(this.scene);
    }

    display(){

        //torso
        this.scene.pushMatrix();
        this.scene.translate(this.x,this.y,this.z);
        this.torsoMaterial.apply();
        this.torso.display();
        this.scene.popMatrix();

        //tail
        this.scene.pushMatrix();
        this.scene.translate(this.x,this.y,this.z);
        this.scene.rotate(-Math.PI/10,1,0,0);
        this.scene.translate(0,0,-1.3);
        this.torsoMaterial.apply();
        this.tail.display();
        this.scene.popMatrix();

        //head
        this.scene.pushMatrix();

        this.scene.translate(this.x,this.y,this.z);
        this.scene.translate(0,0,1);
        this.scene.rotate(Math.PI/2.5,1,0,0);
        this.headMaterial.apply();
        this.head.display();
        this.scene.popMatrix();


        //eyes
        this.scene.pushMatrix();
        this.eyeMaterial.apply();

        this.scene.translate(this.x,this.y,this.z);
        this.scene.translate(0.3,0.25,1.2);
        this.scene.rotate(Math.PI/2.5,1,0,0);
        this.eye.display();
        this.scene.popMatrix();

        //second eye
        this.scene.pushMatrix();
        this.eyeMaterial.apply();

        this.scene.translate(this.x,this.y,this.z);
        this.scene.translate(-0.3,0.25,1.2);
        this.scene.rotate(Math.PI/2.5,1,0,0);
        this.eye.display();
        this.scene.popMatrix();
    

        //antennas
        this.scene.pushMatrix();
        this.scene.translate(this.x,this.y,this.z);
        this.scene.translate(0.1,0.55,1);
        this.scene.rotate(-Math.PI/5,1,0,0);
        this.antennaMaterial.apply();
        this.antenna.display();
        this.scene.translate(-0.2,0,0);
        this.antenna.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.x,this.y,this.z);
        this.scene.translate(0.1,0.62,1.23);
        this.antennaMaterial.apply();
        this.antenna.display();
        this.scene.translate(-0.2,0,0);
        this.antenna.display();
        this.scene.popMatrix();

        //feet , uses the same texture as the antennas
        this.scene.pushMatrix();
        this.scene.translate(this.x,this.y,this.y);
        this.scene.rotate(Math.PI/6,0,0,1);
        this.scene.translate(0.25,-0.5,0);
        this.antennaMaterial.apply();
        this.feet.display();
        this.scene.translate(-0.15,0,0.3);
        this.feet.display();
        this.scene.translate(0,0,-0.6);
        this.feet.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.x,this.y,this.y);
        this.scene.rotate(-Math.PI/6,0,0,1);
        this.scene.translate(-0.25,-0.5,0);
        this.antennaMaterial.apply();
        this.feet.display();
        this.scene.translate(0.15,0,0.3);
        this.feet.display();
        this.scene.translate(0,0,-0.6);
        this.feet.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.antennaMaterial.apply();
        this.scene.translate(this.x,this.y,this.y);
        this.scene.translate(0.55,-0.6,0);
        this.feet.display();
        this.scene.translate(-1.1,0,0);
        this.feet.display();
        this.scene.translate(0.15,0,0.3);
        this.feet.display();
        this.scene.translate(0.8,0,0);
        this.feet.display();

        this.scene.popMatrix();

    }
}



