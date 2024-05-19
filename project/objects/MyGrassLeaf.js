import { CGFappearance, CGFobject, CGFtexture } from "../../lib/CGF.js";
import { MyTriangleMesh } from "../geometry/MyTriangleMesh.js";

export class MyGrassLeaf extends CGFobject {
    constructor(scene, x, y, z, grassTexture) {
        super(scene);
        this.x = x;
        this.y = y;
        this.z = z;
        this.grassTexture = grassTexture;

        let minWidth = 0.05;
        let maxWidth = 0.25;
        this.width = minWidth + Math.random() * (maxWidth - minWidth);

        let minHeight = 0.2;
        let maxHeight = 0.8;
        this.height = minHeight + Math.random() * (maxHeight - minHeight);

        this.triangle = new MyTriangleMesh(scene, 3);
        this.initMaterials();
    }

    initMaterials() {
        // Initialize grass appearance
        this.grassAppearance = new CGFappearance(this.scene);
        this.grassAppearance.setTexture(this.grassTexture);
        this.grassAppearance.setAmbient(0.2, 0.8, 0.2, 1);
        this.grassAppearance.setDiffuse(0.2, 0.8, 0.2, 1);
        this.grassAppearance.setSpecular(0.2, 0.8, 0.2, 1);
        this.grassAppearance.setShininess(2);
    }

    display() {
        this.scene.pushMatrix();        
        this.scene.translate(this.x, this.y, this.z);
        this.scene.scale(this.width, this.height, 1);
        this.grassAppearance.apply();
        this.triangle.display();
        this.scene.popMatrix();
    }
}
