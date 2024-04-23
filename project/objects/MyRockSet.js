import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyRock } from './MyRock.js';

export class MyRockSet extends CGFobject {

    constructor(scene) {
        super(scene)
        this.rock1 = new MyRock(scene, 1, 6, 6)
        this.rock2 = new MyRock(scene, 1, 6, 6)
        this.rock3 = new MyRock(scene, 1, 6, 6)
        this.rock4 = new MyRock(scene, 1, 6, 6)
        this.rock5 = new MyRock(scene, 1, 6, 6)

        this.r1 = 1 + Math.random()
        this.r2 = 1 + Math.random()
        this.r3 = 1 + Math.random()
    }

    display() {
        this.scene.pushMatrix()
        this.scene.translate(2, 0, 0)
        this.scene.scale(this.r1, this.r2, this.r3)
        this.scene.rotate(this.r1, this.r2, this.r3, 1)
        this.rock1.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.translate(-2, 0, 0)
        this.scene.scale(this.r2, this.r2, this.r1)
        this.scene.rotate(this.r2, this.r2, this.r1, 1)
        this.rock2.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.translate(0, 0, -2)
        this.scene.scale(this.r2, this.r1, this.r1)
        this.scene.rotate(this.r3, this.r1, this.r2, 1)
        this.rock3.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.translate(0, 0, 2)
        this.scene.scale(this.r3, this.r1, this.r2)
        this.scene.rotate(this.r1, this.r3, this.r2, 1)
        this.rock4.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.translate(0, 2, 0)
        this.scene.scale(this.r1, this.r3, this.r2)
        this.scene.rotate(this.r3, this.r3, this.r2, 1)
        this.rock4.display()
        this.scene.popMatrix()
    }
}