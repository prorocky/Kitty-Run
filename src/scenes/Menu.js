/**
 * Oran Shadian
 */
 class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('scene', 'assets/img/Kitty_Getaway_Menu.png');
    }

    create() {
        // add background image
        this.back = this.add.image(0, 0, 'scene').setOrigin(0, 0);

        // key P to start
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);


    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyP)) {
            this.scene.start('playScene');
        }
    }
 }