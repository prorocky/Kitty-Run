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
        this.back = this.add.image(game.config.width / 4, 0, 'scene').setOrigin(0, 0);
    }
 }