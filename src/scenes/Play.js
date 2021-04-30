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
        this.load.image('lamp', 'assets/img/value_lamp.png');
        this.load.image('picframe1', 'assets/img/value_pictureframe1.png');
        this.load.image('picframe2', 'assets/img/value_pictureframe2.png');
        this.load.image('vase', 'assets/img/value_vase_empty.png');
        this.load.image('flower_vase', 'assets/img/value_vase_flower.png');

        /* load audio */
        this.load.audio('music', '/assets/aud/background song.mp3');
        this.load.audio('land', '/assets/aud/cat landing.wav');
        this.load.audio('glass', '/assets/aud/glass break.wav');
        this.load.audio('lose_life', '/assets/aud/Distressed_Meow.mp3');
        this.load.audio('game_over', '/assets/aud/LoseCondition1.wav');
        this.load.audio('game_over_music', '/assets/aud/game over song.mp3');
    }

    create() {
        // wall background
        this.hallway = this.add.tileSprite(0, 0, 860, 500, 'wall').setOrigin(0, 0);

        // play music
        // this.sound.play('music'); // this music kinda annoying so uncomment for now XD

        // code to make running cat

        // spawn obstacles on random interval
        this.makingObstacle = false;
        game.settings = {
            speed: 1.5
        }

        

        // "destroyed" objects are invisible and "stored" to the left of the 
        // main play screen. When we want to reuse/reset them, we move their x
        // to the very right and then change the destroyed flag

        // tall table
        this.table1 = new Obstacle(
            this, 
            game.config.width * 4 / 3,
            game.config.height / 2,
            'table1',
            0
        ).setOrigin(0.5, 0);

        // wide table
        this.table2 = new Obstacle(
            this, 
            game.config.width * 4 / 3,
            game.config.height / 2,
            'table2',
            0
        ).setOrigin(0.5, 0);

        // yarn
        this.yarn = new Obstacle(
            this, 
            game.config.width * 4 / 3,
            game.config.height / 2,
            'yarn',
            0
        ).setOrigin(0.5, 0);

        // feather
        this.feather = new Obstacle(
            this, 
            game.config.width * 4 / 3,
            game.config.height / 2,
            'feather',
            0
        ).setOrigin(0.5, 0);

        // catnip
        this.catnip = new Obstacle(
            this, 
            game.config.width * 4 / 3,
            game.config.height / 2,
            'catnip',
            0
        ).setOrigin(0.5, 0);

        this.obstacles = [this.catnip, this.feather, this.yarn];





    }

    makeObstacle() {
        // rng from 0-2 for the 3 potential obstacles
        let rng = Math.floor(Math.random() * 3);
        console.log(rng);
        let obs = this.obstacles[rng];
        if (obs.destroyed) {
            this.makingObstacle = true;
            obs.destroyed = false;
            obs.reset();
            this.table1.reset();
        }
        
    }



    update() {
        // make background move
        this.hallway.tilePositionX -= 4; // doesn't really do anything because background is still image
        
        // spawn obstacle if flag is false
        if (!this.makingObstacle) {
            this.makingObstacle = true;
            this.makeObstacle();
        }
        this.table1.update();
        this.table2.update();
        this.feather.update();
        this.yarn.update();
        this.catnip.update();
        // this.table1.update();
        if (this.yarn.destroyed && this.feather.destroyed && this.catnip.destroyed) {
            this.makingObstacle = false;
        }
    
    
    
    }
}