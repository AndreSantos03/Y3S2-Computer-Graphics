import { CGFobject, CGFappearance, CGFtexture } from '../../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
import { MySphere } from './MySphere.js';

export class MyHive extends CGFobject {
    constructor(scene,x,y,z){
        super(scene);

        this.x = x;
        this.y = y;
        this.z = z;

        this.body = new MyCylinder(scene,15,15);
        this.top = new MySphere(scene,5,15,15);
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
        this.hiveMaterial.setShininess(10.0);

    }

    display(){
        // body
        this.scene.pushMatrix();
        this.scene.translate(this.x,this.y,this.z);
        this.scene.translate(0,10,0);
        this.scene.scale(5,10,5);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.hiveMaterial.apply();
        this.body.display();
        this.scene.popMatrix();

        //top
        this.scene.pushMatrix();
        this.scene.translate(this.x,this.y,this.z);
        this.scene.translate(0,9.5,0);
        this.hiveMaterial.apply();
        this.top.display();
        this.scene.popMatrix();

    }
}
