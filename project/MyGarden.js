import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture, CGFshader } from "../../lib/CGF.js";
import { MyFlower } from "./objects/MyFlower.js";
import { MyGrassLeaf } from "./objects/MyGrassLeaf.js";
import { MyHive } from "./objects/MyHive.js";
import { MyRockSet } from "./objects/MyRockSet.js";

export class MyGarden extends CGFscene {
    constructor(scene) {
        super();
        this.scene = scene;
        this.flowers = [];
        this.flowerSpacing = 10;
        this.grass = [];
        this.grassSpacing = 0.5;
        this.width = 50;
        this.length = 50;
        this.rockset = new MyRockSet(scene, -10, 0, -10);
        this.hive = new MyHive(scene, -10,  0, -10);
        this.windIntensity = 0;
        this.windAngle = 0;

        this.init();
    }

    init() {
        // Initialize appearances and textures
        this.initAppearances();

        // Create flowers and position them in the garden
        this.createFlowers();

        // Create grass and position them in the garden
        this.createGrass();
    }

    initAppearances() {
        // Initialize rock appearance
        this.rockAppearance = new CGFappearance(this.scene);
        this.rockAppearance.setAmbient(0.3, 0.3, 0.3, 1);
        this.rockAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
        this.rockAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.rockAppearance.setShininess(1);
        this.rockTexture = new CGFtexture(this.scene, "./images/rockTexture.jpg");
        this.rockAppearance.setTexture(this.rockTexture);
        this.rockAppearance.setTextureWrap('REPEAT', 'REPEAT');

        // Initialize grass texture
        this.grassTexture = new CGFtexture(this.scene, './images/grassTexture.jpg');

        // Initialize grass shader
        this.grassShader = new CGFshader(this.scene.gl, "./shaders/grass.vert", "./shaders/grass.frag");
    }

    createFlowers() {
        for (let i = 0; i <= this.width; i += this.flowerSpacing) {
            for (let j = 0; j <= this.length; j += this.flowerSpacing) {
                let flower = new MyFlower(this.scene, i, 0, j, this.stemTexture, this.diskTexture, this.floretTexture, this.leafTexture, this.pollenTexture);
                this.flowers.push(flower);
            }
        }
    }

    getFlowerSpacing(){
        return this.flowerSpacing;
    }

    getFlower(x,z){
        let flowerOffset = Math.floor(this.width / this.flowerSpacing) * x + z; 

        if(flowerOffset < this.flowers.length){
            return this.flowers[flowerOffset];
        }
        return null;
    }



    getHive(){
        return this.hive;
    }

    setWindIntensity(intesity){
        this.windIntensity = intesity;
    }
    
    setWindAngle(angle){
        this.windAngle = angle;
    }

    createGrass() {
        for (let i = 0; i <= this.width; i += this.grassSpacing) {
            for (let j = 0; j <= this.length; j += this.grassSpacing) {
                // Check to see if it's not in a flower occupied position
                if (!((i % 10 === 0) && (j % 10 === 0))) {
                    let grassLeaf = new MyGrassLeaf(this.scene, i, 0, j, this.grassTexture);
                    this.grass.push(grassLeaf);
                }
            }
        }
    }

    update(time) {

        let frequency = 2;
        let timeDisplacement = Math.sin(time / 1000.0 * frequency);        


        this.grassShader.setUniformsValues({
            timeOscilation: timeDisplacement,
            windIntensity: this.windIntensity,
            windAngle: this.windAngle,
        });
    }

    display() {
        // Display flowers
        for (let i = 0; i < this.flowers.length; i++) {
            this.flowers[i].display();
        }

        // Display grass
        this.scene.setActiveShader(this.grassShader);
        for (let i = 0; i < this.grass.length; i++) {
            this.grass[i].display();
        }
        this.scene.setActiveShader(this.scene.defaultShader);

        // Display hive
        this.hive.display();

        // Display rocks
        this.scene.pushMatrix();
        this.rockAppearance.apply();
        this.rockset.display();
        this.scene.popMatrix();
    }
}
