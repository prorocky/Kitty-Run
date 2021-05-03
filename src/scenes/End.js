/**
 * Oran Shadian
 */
 class End extends Phaser.Scene {
    constructor() {
        super("endScene");
    }

    preload() {
        this.load.image('endScene', 'assets/img/EndScene.png');
        this.load.audio('gameOver', 'assets/aud/game over song.mp3');
    }
    create() {
        // add background image
        this.back = this.add.image(0, 0, 'endScene').setOrigin(0, 0);

        // key P to restart
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        //playing game over song
        this.song = this.sound.add('gameOver', {volume: 0.5, loop: true});
        this.song.play(); 

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyP)) {
            this.sound.play('meow');
            this.scene.start('playScene');
        }
    }
 }