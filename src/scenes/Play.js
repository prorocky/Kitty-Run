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
        this.load.image('wall', 'assets/img/kittyrun_prop_wall.png');
        this.load.image('table1', 'assets/img/table_tall.png');
        this.load.image('table2', 'assets/img/table_wide.png');

        // bad obstacles (lose life)
        this.load.image('catnip', 'assets/img/obstacle_catnip.png');
        this.load.image('feather', 'assets/img/obstacle_feather.png');
        this.load.image('yarn', 'assets/img/obstacle_yarn.png');

        // good obstacles (+1 point)
        this.load.image('lamp', 'assets/img/value_lamp.png');
        this.load.image('vase', 'assets/img/value_vase_empty.png');
        this.load.image('flower_vase', 'assets/img/value_vase_flower.png');
            // list of all different possible pictures
        // this.load.image

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
        this.hallway = this.add.tileSprite(0, 0, 1920, 1080, 'wall').setOrigin(0, 0);

        // play music
        // this.sound.play('music'); // this music kinda annoying so uncomment for now XD

        // code to make running cat

        // obstacle spawn flags
        this.makingObstacle = false;
        this.makingPoint = false;

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
            game.config.height * 9 / 11,
            'yarn',
            0
        ).setOrigin(0.5, 0);

        // feather
        this.feather = new Obstacle(
            this, 
            game.config.width * 4 / 3,
            game.config.height * 9 / 11,
            'feather',
            0
        ).setOrigin(0.5, 0);

        // catnip
        this.catnip = new Obstacle(
            this,
            game.config.width * 4 / 3,
            game.config.height * 9 / 11,
            'catnip',
            0
        ).setOrigin(0.5, 0);

        obstacles = [this.catnip, this.feather, this.yarn];

        // vase without flowers
        this.emptyVase = new Obstacle(
            this,
            game.config.width * 4 / 3,
            this.table1.y + 10,
            'vase',
            0
        ).setOrigin(0.5, 1);

        // vase with flowers
        this.flowerVase = new Obstacle(
            this,
            game.config.width * 4 / 3,
            this.table1.y + 6,
            'flower_vase',
            0
        ).setOrigin(0.5, 1);

        // lamp
        this.lamp = new Obstacle(
            this,
            game.config.width * 4 / 3,
            this.table1.y + 6,
            'lamp',
            0
        ).setOrigin(0.5, 1);

        pointObjects = [this.flowerVase, this.emptyVase, this.lamp];

        // this.table1.activate();
        // this.emptyVase.activate();
        // this.flowerVase.activate();
        // this.lamp.activate();




        // every 10 seconds increase speed of game until a cap of 5 is reached
        this.speedTimer = this.time.addEvent({
            delay: 10 * 1000,
            callback: this.increaseSpeed,
            loop: true
        });



    }

    // create random object from array of obstacles
    makeObstacle() {
        // rng from 0-2 for the 3 potential obstacles
        let rng = Math.floor(Math.random() * 3);
        let obs = obstacles[rng];
        obs.activate();
    }

    makePoint(table) {
        // rng from 0-2 for the 3 potential obstacles
        let rng = Math.floor(Math.random() * 3);
        let ptObj = pointObjects[rng];
        ptObj.activate();
        table.activate();
    }



    // at some interval, increase speed (difficulty) of game
    increaseSpeed() {
        if (game.settings.speed < 5) {
            game.settings.speed += .1;
        }
    }


    update() {
        // make background move
        this.hallway.tilePositionX -= 4; // doesn't really do anything because background is still image
        
        // spawn obstacle on delay if flag is false
        if (!this.makingObstacle && this.yarn.destroyed && this.feather.destroyed && this.catnip.destroyed) {
            this.makingObstacle = true;
            this.obsTimer = this.time.addEvent({
                delay: Math.floor((Math.random() * 4) + 2) * 1000,
                callback: this.makeObstacle,
                loop: true
            });
        }

        // spawn obstacle on delay if flag is false
        if (!this.makingPoint && !this.table1.destroyed && this.table2.destroyed) {
            let table;
            if (Math.floor(Math.random() * 2)) {
                table = this.table1;
            }
            else {
                table = this.table2;
            }
            this.makingPoint = true;
            this.ptTimer = this.time.addEvent({
                delay: Math.floor((Math.random() * 7) + 3) * 1000,
                callback: this.makePoint(table),
                loop: true
            });
        }

        // update all objects
        this.table1.update();
        this.table2.update();
        this.feather.update();
        this.yarn.update();
        this.catnip.update();
        this.emptyVase.update();
        this.flowerVase.update();
        this.lamp.update();
        // this.table1.update();


        // collision code with yarn, feather, catnip
        // if (collision)
        //      lives--

        // if (lives == 0) {
        //     game over
        // }
        
        // collision code with lamp, empty vase, flower vase, picture frame
        // if (collision)
        //      score++
    
    }
}