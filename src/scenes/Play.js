/**
 * Oran Shadian
 */
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        /* load images */
        // general
        this.load.image('wall', 'assets/img/background_wall.png');
        this.load.image('table1', 'assets/img/table_tall.png');
        this.load.image('table2', 'assets/img/table_wide.png');

        // obstacles
        this.load.image('catnip', 'assets/img/obstacle_catnip.png');
        this.load.image('feather', 'assets/img/obstacle_feather.png');
        this.load.image('yarn', 'assets/img/obstacle_yarn.png');

        // value objects
        this.load.image('lamp', 'assets/img/value_lamp');
        this.load.image('picframe1', 'assets/img/value_pictureframe1');
        this.load.image('picframe2', 'assets/img/value_pictureframe2');
        this.load.image('vase', 'assets/img/value_vase_empty');
        this.load.image('flower_vase', 'assets/img/value_vase_flower');

        /* load audio */
        this.load.audio('music', 'background song.mp3');
        this.load.audio('land', 'cat landing.wav');
        this.load.audio('glass', 'glass break.wav');
        this.load.audio('lose_life', 'Distressed_Meow.mp3');
        this.load.audio('game_over', 'LoseCondition1.wav');
        this.load.audio('game_over_music', 'game over song.mp3');
    }

    create() {
        // wall background
        this.hallway = this.add.tilesprite(0, 0, 640, 480, 'wall').setOrigin(0, 0);



    }
}