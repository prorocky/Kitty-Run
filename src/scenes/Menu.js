/**
 * Oran Shadian
 */
 class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('scene', 'assets/img/menu_resize.png');
        this.load.audio('meow', 'assets/aud/Button_Meow.mp3');
        this.load.audio('music1', 'assets/aud/main_menu.wav');
    }

    create() {
        // add background image
        this.back = this.add.image(0, 0, 'scene').setOrigin(0, 0);

        // key P to start
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        //playing game over song
        this.song = this.sound.add('music1', {volume: 0.6, loop: true});
        this.song.play(); 

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyP)) {
            this.sound.play('meow');
            this.song.mute = true;
            this.scene.start('playScene');
        }
    }
 }