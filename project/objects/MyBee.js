import {CGFappearance, CGFobject, CGFtexture} from "../../lib/CGF.js";

import { MyEllipsoid } from "./MyEllipsoid.js";
import { MyCone } from "./MyCone.js";
import { MyEllipse } from "./MyEllipse.js";


export class MyBee extends CGFobject{
    constructor(scene,x,y,z,orientation){
        super(scene);

        this.x = x;
        this.y = y;
        this.z = z;



        this.orientation = orientation;
        this.speed = 0;
        this.size = 1;
        this.velocity = [0,0,0];
        this.wingRotation = Math.PI/4;

        this.speedIncrement = 0.25;

        this.orientationIncrement = Math.PI/12;

        this.torso = new MyEllipsoid(scene,0.5,0.5,0.8,12,12);
        this.tail = new MyEllipsoid(scene,0.6,0.6,1,12,12);
        this.head = new MyEllipsoid(scene,0.5,0.3,0.6,7,7);
        this.eye = new MyEllipsoid(scene,0.2,0.2,0.35,7,7);
        this.antenna = new MyEllipsoid(scene,0.05,0.05,0.2,7,7);
        this.feet = new MyEllipsoid(scene,0.05,0.25,0.05,7,7);
        this.sting = new MyCone(scene,8,8);
        this.wing = new MyEllipse(scene,0.3,0.7,10);


        this.initMaterials();
    }

    initMaterials() {

        this.beeBodyTexture = new CGFtexture(this.scene, "./images/beeTexture.jpg");

        this.torsoMaterial = new CGFappearance(this.scene);
        this.torsoMaterial.setAmbient(1.0, 1.0, 0.0, 1.0);
        this.torsoMaterial.setDiffuse(1.0, 1.0, 0.0, 1.0);
        this.torsoMaterial.setSpecular(1.0, 1.0, 0.0, 1.0);
        this.torsoMaterial.setTexture(this.beeBodyTexture);
        this.torsoMaterial.setTextureWrap('MIRRORED_REPEAT', 'MIRRORED_REPEAT');

    
        this.headMaterial = new CGFappearance(this.scene);
        this.headMaterial.setAmbient(0.8, 0.8, 0.0, 1.0);
        this.headMaterial.setDiffuse(0.8, 0.8, 0.0, 1.0);
        this.headMaterial.setSpecular(0.8, 0.8, 0.0, 1.0);
        this.headMaterial.setTexture(this.beeBodyTexture);
        this.headMaterial.setTextureWrap('REPEAT', 'REPEAT');
    
        this.eyeMaterial = new CGFappearance(this.scene);
        this.eyeMaterial.setAmbient(1.0, 1.0, 1.0, 1.0); 
        this.eyeMaterial.setDiffuse(1.0, 1.0, 1.0, 1.0); 
        this.eyeMaterial.setSpecular(1.0, 1.0, 1.0, 1.0); 
    
        this.antennaMaterial = new CGFappearance(this.scene);
        this.antennaMaterial.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.antennaMaterial.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.antennaMaterial.setSpecular(0.0, 0.0, 0.0, 1.0);
        this.antennaMaterial.setShininess(0);
    
        this.stingMaterial = new CGFappearance(this.scene);
        this.stingMaterial.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.stingMaterial.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.stingMaterial.setSpecular(0.0, 0.0, 0.0, 1.0);
        this.stingMaterial.setShininess(0);
    
        this.wingMaterial = new CGFappearance(this.scene);
        this.wingMaterial.setAmbient(1.0, 1.0, 1.0, 0.25);
        this.wingMaterial.setDiffuse(1.0, 1.0, 1.0, 0.25);
        this.wingMaterial.setSpecular(1.0, 1.0, 1.0, 0.25);
        this.wingMaterial.setEmission(0,0,0,0);
    }

    update(time,keysPressed){


        //wing and body animations
        const bodyAmplitude = 0.2;
        const bodyPeriod = 2000;
        const wingAmplitude = Math.PI / 4;
        const wingPeriod = bodyPeriod / 1.5;
    
        const bodyDisplacement = bodyAmplitude * Math.sin(2 * Math.PI * time / bodyPeriod);
        const wingDisplacement = wingAmplitude * Math.sin(2 * Math.PI * time / wingPeriod);
    
        this.y += bodyDisplacement;
        this.wingRotation = wingDisplacement;


        if(!keysPressed.empty){
            if(keysPressed.includes('W')){
                this.accelerate(this.speedIncrement); // Use 'this' to refer to the object's method
            }
            if(keysPressed.includes('S')){
                this.accelerate(-this.speedIncrement); // Use 'this' to refer to the object's method
            }
            if(keysPressed.includes('A')){
                this.turn(this.orientationIncrement);
            }
            if(keysPressed.includes('D')){
                this.turn(-this.orientationIncrement);
            }
        }
        
        

        //velocity handler
        this.x += this.velocity[0];
        this.y += this.velocity[1];
        this.z += this.velocity[2];

    }
    
    turn(v){
        this.orientation += v;

        this.velocity[0] = Math.sin(this.orientation) * this.speed;
        this.velocity[2] = Math.cos(this.orientation) * this.speed;
    }
    
    accelerate(v){

        //check to see if we're going over the max speed
        //or if we're going to go backwards
        if((v > 0 && (this.speed == 0)) || ((v < 0) && (this.speed + v >= 0))){
            this.speed += v;
            this.velocity[0] = Math.sin(this.orientation) * this.speed;
            this.velocity[2] = Math.cos(this.orientation) * this.speed;
        }
       
    }
    setSpeed(speed) {
        this.speedIncrement = speed;
       
    }
    setSize(size) {
        this.size = size;

    }

    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.x,this.y,this.z);
        this.scene.scale(this.size,this.size,this.size);
        this.scene.rotate(this.orientation,0,1,0);
        //torso
        this.scene.pushMatrix();
        this.torsoMaterial.apply();
        this.torso.display();
        this.scene.popMatrix();

        //tail
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/10,1,0,0);
        this.scene.translate(0,0,-1.3);
        this.torsoMaterial.apply();
        this.tail.display();
        this.scene.popMatrix();

        //head
        this.scene.pushMatrix();

        this.scene.translate(0,0,1);
        this.scene.rotate(Math.PI/2.5,1,0,0);
        this.headMaterial.apply();
        this.head.display();
        this.scene.popMatrix();


        //eyes
        this.scene.pushMatrix();
        this.eyeMaterial.apply();

        this.scene.translate(0.3,0.25,1.2);
        this.scene.rotate(Math.PI/2.5,1,0,0);
        this.eye.display();
        this.scene.popMatrix();

        //second eye
        this.scene.pushMatrix();
        this.eyeMaterial.apply();

        this.scene.translate(-0.3,0.25,1.2);
        this.scene.rotate(Math.PI/2.5,1,0,0);
        this.eye.display();
        this.scene.popMatrix();
    

        //antennas
        this.scene.pushMatrix();
        this.scene.translate(0.1,0.55,1);
        this.scene.rotate(-Math.PI/5,1,0,0);
        this.antennaMaterial.apply();
        this.antenna.display();
        this.scene.translate(-0.2,0,0);
        this.antenna.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.1,0.62,1.23);
        this.antennaMaterial.apply();
        this.antenna.display();
        this.scene.translate(-0.2,0,0);
        this.antenna.display();
        this.scene.popMatrix();

        //feet , uses the same texture as the antennas
        this.scene.pushMatrix();
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
        this.scene.translate(0.55,-0.6,0);
        this.feet.display();
        this.scene.translate(-1.1,0,0);
        this.feet.display();
        this.scene.translate(0.15,0,0.3);
        this.feet.display();
        this.scene.translate(0.8,0,0);
        this.feet.display();
        this.scene.translate(0,0,-0.6);
        this.feet.display();
        this.scene.translate(-0.8,0,0);
        this.feet.display();
        this.scene.popMatrix();

        //sting
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI*5/8,1,0,0);
        this.scene.scale(0.1,0.5,0.1);
        this.scene.translate(0,4.5,1.5);
        this.sting.display();
        this.scene.popMatrix();


        //wings
        this.scene.pushMatrix();
        this.wingMaterial.apply();
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.scene.rotate(this.wingRotation, 1, 0,0);
        this.scene.translate(0,0,0.2);
        this.scene.translate(0.35,1,0);
        this.wing.display();
        this.scene.translate(-0.6,0,0);
        this.wing.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.wingMaterial.apply();
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.scene.rotate(-this.wingRotation, 1, 0,0);

        this.scene.translate(0,0,0.2);
        this.scene.translate(0.35,-1,0);
        this.wing.display();
        this.scene.translate(-0.6,0,0);
        this.wing.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }

}



