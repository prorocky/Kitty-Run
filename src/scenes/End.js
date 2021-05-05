/**
 * Oran Shadian
 */
 class End extends Phaser.Scene {
    constructor() {
        super("endScene");
    }

    preload() {
        this.load.image('endScene', 'assets/img/endcard.png');
        this.load.audio('gameOver', 'assets/aud/game_over_song.mp3');
    }
    create() {
        // add background image
        this.back = this.add.image(0, 0, 'endScene').setOrigin(0, 0);

        // key R to restart
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        //playing game over song
        this.song = this.sound.add('gameOver', {volume: 0.5, loop: true});
        this.song.play(); 

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.sound.play('meow');
            this.song.mute = true;
            this.scene.start('playScene');
        }
    }
 }