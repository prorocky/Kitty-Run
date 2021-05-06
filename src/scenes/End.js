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

        // config for text
        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '92px',
            backgroundColor: '',
            color: '#000',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 10000
        }

        // key R to restart
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // key Q to quit/see credits
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

        // add score display
        this.add.text((game.config.width * 2 / 9) - 26, (game.config.height * 3 / 4) + 8, score, textConfig);

        // add time display
        let min = Math.floor(runningTime / 600);
        let sec = Math.floor(runningTime / 10) % 60;
        this.add.text((game.config.width * 7 / 10) - 26, (game.config.height * 3 / 4) + 8, min + ":" + (sec < 10 ? "0" + sec : sec), textConfig);

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
        if (Phaser.Input.Keyboard.JustDown(keyQ)) {
            this.sound.play('meow');
            this.song.mute = true;
            this.scene.start('creditScene');
        }
    }
 }