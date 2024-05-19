import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MySphere } from '../geometry/MySphere.js';

export class MySkySphere extends CGFobject {

    constructor(scene, texture) {
        super(scene)
        this.sphere = new MySphere(this.scene, 1, 30, 30)
        this.material = new CGFappearance(this.scene)
        this.material.setEmission(1, 1, 1, 1)
        this.material.setTexture(texture)
    }

    display() {
        this.scene.pushMatrix()
        this.material.apply()
        this.sphere.display()
        this.scene.popMatrix()
    }
}