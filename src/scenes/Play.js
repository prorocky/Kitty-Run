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
        this.preload.image('wall', 'assets/img/background_wall.png');
        this.preload.image('table1', 'assets/img/table_tall.png');
        this.preload.image('table2', 'assets/img/table_wide.png');

        // obstacles
        this.preload.image('catnip', 'assets/img/obstacle_catnip.png');
        this.preload.image('feather', 'assets/img/obstacle_feather.png');
        this.preload.image('yarn', 'assets/img/obstacle_yarn.png');

        // value objects
        this.preload.image('lamp', 'assets/img/value_lamp');
        this.preload.image('picframe1', 'assets/img/value_pictureframe1');
        this.preload.image('picframe2', 'assets/img/value_pictureframe2');
        this.preload.image('vase', 'assets/img/value_vase_empty');
        this.preload.image('flower_vase', 'assets/img/value_vase_flower');

        /* load audio */
        this.preload.audio('music', 'background song.mp3');
        this.preload.audio('land', 'cat landing.wav');
        this.preload.audio('glass', 'glass break.wav');
        

    }
}