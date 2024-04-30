import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/

export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');
        const beeSpeedController = this.gui.add(this.scene, 'beeSpeed', 0.1, 3).name('Bee Speed');
        beeSpeedController.onChange((value) => {
            // Call the updateBeeSpeed method of the scene to update the bee's speed
            this.scene.updateBeeSpeed(value);
        });
        const beeSizeController = this.gui.add(this.scene, 'beeSize', 0.5, 3).name('Bee Size');
        beeSizeController.onChange((value) => {
            // Call the updateBeeSpeed method of the scene to update the bee's speed
            this.scene.updateBeeSize(value);
        });
        this.initKeys();

        return true;
    }
    initKeys() {
        this.scene.gui = this;
        this.processKeyboard = function () {};
        this.activeKeys = {};
    }
    
    processKeyDown(event) {
        this.activeKeys[event.code] = true;
    };
    
    processKeyUp(event) {
        this.activeKeys[event.code] = false;
    };
    
    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }
    
}