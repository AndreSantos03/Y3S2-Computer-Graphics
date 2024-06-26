import {CGFappearance, CGFobject, CGFtexture} from "../../lib/CGF.js";

import { MyEllipsoid } from "../geometry/MyEllipsoid.js";
import { MyCone } from "../geometry/MyCone.js";
import { MyEllipse } from "../geometry/MyEllipse.js";


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
        this.speedIncrement;
        this.orientationIncrement = Math.PI/12;
        this.descending = false;
        this.ascending = false;
        this.atBottom = false;
        this.tripHive = false;
        this.moving = false;

        //variables for circle descent and ascent
        this.circleSpeed= 0.1;
        this.angleCircleIncrement = 0; //stores the angle increment for when ascending and descending
        this.verticalCircleSpeed = 0.10;
        this.circlingSpeed = 0.01;

        this.torso = new MyEllipsoid(scene,0.5,0.5,0.8,12,12);
        this.tail = new MyEllipsoid(scene,0.6,0.6,1,12,12);
        this.head = new MyEllipsoid(scene,0.5,0.3,0.6,7,7);
        this.eye = new MyEllipsoid(scene,0.2,0.2,0.35,7,7);
        this.antenna = new MyEllipsoid(scene,0.05,0.05,0.2,7,7);
        this.feet = new MyEllipsoid(scene,0.05,0.25,0.05,7,7);
        this.sting = new MyCone(scene,8,8);
        this.wing = new MyEllipse(scene,0.3,0.7,10);
        this.pollen = null;
        this.garden;
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

        this.pollenMaterial = new CGFappearance(this.scene);
        this.pollenMaterial.setAmbient(1.0, 0.5, 0.0, 1.0);
        this.pollenMaterial.setDiffuse(1.0, 0.5, 0.0, 1.0);
        this.pollenMaterial.setSpecular(1.0, 0.5, 0.0, 1.0);
        this.pollenMaterial.setShininess(10);
        this.pollenMaterial.setTexture(this.pollenTexture);
        this.pollenMaterial.setTextureWrap('REPEAT', 'REPEAT');    
    }

    update(time,keysPressed){

        if(!keysPressed.empty && !this.tripHive && !this.ascending && !this.descending){ //disable commands on the trip hive
            //go forward
            if(keysPressed.includes('W') && !this.moving ){
                this.accelerate();
                this.moving = true; 
            }
            //go backwards
            if(keysPressed.includes('S') && this.moving){
                this.stop();
                this.moving = false;
            }
            //lean torwards the left
            if(keysPressed.includes('A')){
                this.turn(this.orientationIncrement);
            }
            //lean torwards the right
            if(keysPressed.includes('D')){
                this.turn(-this.orientationIncrement);
            }
            //go down
            if(keysPressed.includes('F') && this.pollen == null && !this.atBottom){
                //reset speed
                this.velocity = [0,0,0];
                this.descending = true;
                this.velocity[1] = -this.verticalCircleSpeed; //descending velocity
                //take into account that the bottom position is 4
                let framesToReachBottom = (this.y - 4) / this.verticalCircleSpeed;
                this.angleCircleIncrement = Math.PI * 2 / framesToReachBottom;
                this.accelerate(this.circlingSpeed)
            }
            //pick pollen
            if(keysPressed.includes('P') && this.atBottom){
                this.tryGetPollen();
                this.ascending = true;
                this.atBottom = false;
                //reset speed
                this.velocity = [0,0,0];
                this.velocity[1] = this.verticalCircleSpeed; // set velocity up
                //take into account that the bottom position is 4
                let framesToReachTop = (10 - this.y) / this.verticalCircleSpeed;
                this.angleCircleIncrement = Math.PI * 2 / framesToReachTop;
                this.accelerate(this.circlingSpeed)
            }
            //go to hive
            if(keysPressed.includes('O') && this.pollen != null){
                this.tripHive = true;
                
                // Calculate the offset from the hive position
                var x_offset = -10 - this.x; // hive position is -10
                var z_offset = -10 - this.z; // hive position is -10

                var angle = Math.atan2(z_offset, x_offset);
                this.accelerate(this.circlingSpeed);            
                this.turn(angle);
            }
        }
    
        if (this.descending) {
            //check if descent is done
            if (this.y <=  4) {
                this.atBottom = true;
                this.descending = false;
                this.stop(); //reset velocity
                this.velocity[1] = 0;//reset vertical velocity
            } else {
                this.turn(this.angleCircleIncrement);
            }     
        }   
        //check to see if ascent is done
        else if(this.ascending){
            if(this.y >= 10){
                this.ascending = false;
                this.velocity[1] = 0;
                this.stop(); //reset velocity

            }
            else {
                this.turn(this.angleCircleIncrement);
            }     
        }
        //check to see if it's currently going to the hive
        else if(this.tripHive){
            //check fi it arrived to the hive
            if(this.x <= -10  && this.z <= -10){
                this.garden.getHive().addPollen(this.pollen);
                this.pollen = null;
                this.tripHive = false;
                this.stop() //reset speed
            }
        }
        //normal oscilation animations
        else{
            let bodyAmplitude, bodyPeriod;

            //animation at bottom is lower
            if (this.atBottom) {
                bodyAmplitude = 0.05; 
                bodyPeriod = 4000;  
            }
             else {
                bodyAmplitude = 0.2;
                bodyPeriod = 2000;
            }
          
        
            const bodyDisplacement = bodyAmplitude * Math.sin(2 * Math.PI * time / bodyPeriod);
        
            this.y += bodyDisplacement;
        }


        //wing animations
        const wingAmplitude = Math.PI / 4;
        const wingPeriod = 1500;
        const wingDisplacement = wingAmplitude * Math.sin(2 * Math.PI * time / wingPeriod);
        this.wingRotation = wingDisplacement;

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
    
    accelerate(){
        this.speed += this.speedIncrement;
        this.velocity[0] = Math.sin(this.orientation) * this.speed;
        this.velocity[2] = Math.cos(this.orientation) * this.speed;       
    }
    stop(){
        this.speed = 0;
        this.velocity[0] = 0;
        this.velocity[2] = 0;
    }
    setSpeed(speed) {
        this.speedIncrement = speed;
       
    }
    setSize(size) {
        this.size = size;

    }

    setGarden(garden){
        this.garden = garden;
    }

    tryGetPollen() {
        let flowerSpacing = this.garden.getFlowerSpacing();
        const threshold = 2.5; // Threshold value
    
        // Calculate the nearest flower positions along the x and z axes
        let nearestFlowerX = Math.round(this.x / flowerSpacing) * flowerSpacing;
        let nearestFlowerZ = Math.round(this.z / flowerSpacing) * flowerSpacing;
    
        // Calculate the distance between the current position and the nearest flower positions
        let distanceX = Math.abs(this.x - nearestFlowerX);
        let distanceZ = Math.abs(this.z - nearestFlowerZ);
    
        // Check if the distances are within the threshold
        if (distanceX <= threshold && distanceZ <= threshold) {
            const flowerX = Math.round(this.x / flowerSpacing);
            const flowerZ = Math.round(this.z / flowerSpacing);
    
            let flower = this.garden.getFlower(flowerX, flowerZ);
            if (flower != null) {
                // It got a flower
                this.pollen = flower.givePollen();
            }
        }
    }
    

    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.x,this.y,this.z);

        this.scene.scale(this.size,this.size,this.size);
        this.scene.rotate(this.orientation,0,1,0);

        //pollen
        if(this.pollen != null){
            this.scene.pushMatrix();
            this.pollenMaterial.apply();
            this.scene.translate(0,-0.5,0);
            this.pollen.display();
            this.scene.popMatrix();
        }

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



