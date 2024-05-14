import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture,CGFshader } from "../../lib/CGF.js";
import { MyFlower } from "./objects/MyFlower.js";
import { MyGrassLeaf } from "./objects/MyGrassLeaf.js";
import { MyHive } from "./objects/MyHive.js";
import { MyRockSet } from "./objects/MyRockSet.js";

export class MyGarden extends CGFscene {
    constructor( scene) {
        super();
        this.scene =scene;
        this.flowers = [];
        this.flowerSpacing = 10;
        this.grass = []
        this.grassSpacing = 0.5;
        this.width = 50;
        this.length = 50;
        this.rockset = new MyRockSet(scene,-10,0,-10);
        this.hive = new MyHive(scene,-10,0,-10);


        this.init();
    }

    init() {

        //rockMaterial
        this.rockAppearance = new CGFappearance(this.scene);
        this.rockAppearance.setAmbient(0.3, 0.3, 0.3, 1);
        this.rockAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
        this.rockAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.rockAppearance.setShininess(1);
        this.rockTexture = new CGFtexture(this.scene,"./images/rockTexture.jpg")
        this.rockAppearance.setTexture(this.rockTexture);
        this.rockAppearance.setTextureWrap('REPEAT', 'REPEAT');


    
        //we're loading here the textures and shaders so that we don't have to load them throughout the whole project


        //grassAppearance
        this.grassTexture = new CGFtexture(this.scene, './images/grassTexture.jpg');

        //grass Shader
        this.grassShader = new CGFshader(this.scene.gl, "./shaders/grass.vert", "./shaders/grass.frag");
        this.grassShader.setUniformsValues({ uWindDirection: [0, 0, 0], uWindStrength: 0 });

        //Flower Texutres
        this.stemTexture = new CGFtexture(this.scene, "./images/stemTexture.jpg");
        this.diskTexture = new CGFtexture(this.scene, "./images/diskTexture.jpg");
        this.floretTexture = new CGFtexture(this.scene, "./images/petalTexture.jpg");
        this.leafTexture = new CGFtexture(this.scene, "./images/leafTexture.jpg");
        this.pollenTexture = new CGFtexture(this.scene, "./images/pollenTexture.jpg");  

        // Create flowers and position them in the garden of 50x50
        for (let i = 0; i <= this.width; i += this.flowerSpacing) {
            for (let j = 0; j <= this.length; j += this.flowerSpacing) {
                let flower = new MyFlower(this.scene, i,0,j,this.stemTexture,this.diskTexture,this.floretTexture,this.leafTexture,this.pollenTexture);
                this.flowers.push(flower);
            }
        }

        // Create grass and position them in the garden of 50x50
        for (let i = 0; i <= this.width; i += this.grassSpacing) {
            for (let j = 0; j <= this.length; j += this.grassSpacing) {
                //check to see if its not in a flower occupied position
                if( !((i % 10 == 0) && (j % 10 == 0))){
                    let grassLeaf = new MyGrassLeaf(this.scene, i,0,j,this.grassTexture,this.grassShader);
                    this.grass.push(grassLeaf);
                }
            }
        }


        // let grassLeaf = new MyGrassLeaf(this.scene, 2,0,2,this.grassTexture,this.grassShader);
        // this.grass.push(grassLeaf);
    }

    getNumRows(){
        return this.numRows;
    }
    getNumCols(){
        return this.numCols;
    }
    getFlowerSpacing(){
        return this.flowerSpacing;
    }

    getFlower(x,z){
        let flowerOffset = Math.floor(this.width / this.flowerSpacing) * z + x; 

        if(flowerOffset < this.flowers.length){
            return this.flowers[flowerOffset];
        }
        return null;
    }

    getHive(){
        return this.hive;
    }
    display() {
        // Display flowers
        for (let i = 0; i < this.flowers.length; i++) {
            this.flowers[i].display();
        }
        // Display grass
        // this.scene.setActiveShader(this.grassShader);
        for (let i = 0; i < this.grass.length; i++) {
            this.grass[i].display();
        }
        // this.scene.setActiveShader(this.scene.defaultShader)

        this.hive.display();

        this.scene.pushMatrix();
        this.rockAppearance.apply()
        this.rockset.display();
        this.scene.popMatrix();
    }
}
