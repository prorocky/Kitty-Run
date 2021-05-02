/**
 * Oran Shadian
 */
 class Instructions extends Phaser.Scene {
    constructor() {
        super("instrScene");
    }

    preload() {
        this.load.image('scene', 'assets/img/.png');
    }

    create() {
        this.add.image()
    }
 }