/**
 * Oran Shadian
 */
 class Credits extends Phaser.Scene {
    constructor() {
        super("creditScene");
    }

    preload() {
        this.load.image('creditScene', 'assets/img/creditscard.png');
        this.load.audio('musc', 'assets/aud/main_menu.wav');
        this.load.audio('meow', 'assets/aud/Button_Meow.mp3');
    }
    create() {
        // add background image
        this.cred = this.add.image(0, 0, 'creditScene').setOrigin(0, 0);

        // key R to restart
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //playing game over song
        this.song = this.sound.add('musc', {volume: 0.5, loop: true});
        this.song.play(); 

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.sound.play('meow');
            this.song.mute = true;
            this.scene.start('menuScene');
        }
    }
 }