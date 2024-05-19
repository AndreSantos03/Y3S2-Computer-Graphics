import { CGFobject, CGFappearance, CGFtexture } from '../../lib/CGF.js';
import { MyCylinder } from '../geometry/MyCylinder.js';
import { MyPollen } from '../geometry/MyPollen.js';
import { MySphere } from '../geometry/MySphere.js';

export class MyHive extends CGFobject {
    constructor(scene,x,y,z){
        super(scene);

        this.x = x;
        this.y = y;
        this.z = z;

        this.body = new MyCylinder(scene,15,15);
        this.top = new MySphere(scene,2,15,15);
        this.pollens = []
        this.pollensPositions = []
        this.initMaterials();
    }


    initMaterials(){
        this.hiveMaterial = new CGFappearance(this.scene);
        this.hiveTexture = new CGFtexture(this.scene,"./images/hiveTexture.jpg")
        this.hiveMaterial.setTexture(this.hiveTexture);
        this.hiveMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.hiveMaterial.setAmbient(0.5, 0.5, 0.5, 1);
        this.hiveMaterial.setDiffuse(0.8, 0.8, 0.8, 1);
        this.hiveMaterial.setSpecular(0.2, 0.2, 0.2, 1);
        this.hiveMaterial.setShininess(5);


        this.pollenMaterial = new CGFappearance(this.scene);
        this.pollenMaterial.setAmbient(1.0, 0.5, 0.0, 1.0);
        this.pollenMaterial.setDiffuse(1.0, 0.5, 0.0, 1.0);
        this.pollenMaterial.setSpecular(1.0, 0.5, 0.0, 1.0);
        this.pollenMaterial.setShininess(10);
        this.pollenTexture = new CGFtexture(this.scene, "./images/pollenTexture.jpg");
        this.pollenMaterial.setTexture(this.pollenTexture);
        this.pollenMaterial.setTextureWrap('REPEAT', 'REPEAT');    

    }

    addPollen(pollen){
        let angleIncrement = Math.PI / 10;
        let radius = 2; 
        let angle = angleIncrement * this.pollens.length;
        let randomX = Math.cos(angle) * radius;
        let randomZ = Math.sin(angle) * radius;
        let randomY = 5.5 + Math.random() * 0.5; 
        this.pollens.push(pollen);
        this.pollensPositions.push({ x: randomX, y: randomY, z: randomZ });
    }

    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.x,this.y,this.z);
        // body
        this.scene.pushMatrix();
        this.scene.translate(0,6,0);
        this.scene.scale(2,6,2);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.hiveMaterial.apply();
        this.body.display();
        this.scene.popMatrix();

        //top
        this.scene.pushMatrix();
        this.scene.translate(0,5.5,0);
        this.hiveMaterial.apply();
        this.top.display();
        this.scene.popMatrix();


        //pollen
        for (let i = 0; i < this.pollens.length; i++) {
            let position = this.pollensPositions[i];
            this.scene.pushMatrix();
            this.scene.translate(position.x, position.y, position.z);
            this.pollenMaterial.apply();
            this.pollens[i].display();
            this.scene.popMatrix();
        }

        this.scene.popMatrix();
    }
}
