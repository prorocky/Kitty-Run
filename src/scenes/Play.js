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
        this.load.image('pic1', 'assets/img/p1.png');
        this.load.image('pic2', 'assets/img/p2.png');
        this.load.image('pic3', 'assets/img/p3.png');
        this.load.image('pic4', 'assets/img/p4.png');
        this.load.image('pic5', 'assets/img/p5.png');
        this.load.image('pic6', 'assets/img/p6.png');
        this.load.image('pic7', 'assets/img/p7.png');
        this.load.image('pic8', 'assets/img/p8.png');
        this.load.image('pic9', 'assets/img/p9.png');
        this.load.image('pic10', 'assets/img/p10.png');


        /* load audio */
        this.load.audio('music', '/assets/aud/background song.mp3');
        this.load.audio('land', '/assets/aud/cat landing.wav');
        this.load.audio('glass', '/assets/aud/glass break.wav');
        this.load.audio('lose_life', '/assets/aud/Distressed_Meow.mp3');
        this.load.audio('game_over', '/assets/aud/LoseCondition1.wav');
        this.load.audio('game_over_music', '/assets/aud/game over song.mp3');
        this.load.audio('jump','/assets/aud/CatJump.wav');

        // loading kitty run animation
        this.load.spritesheet('kitty_run', './assets//img/kitty_run02.png',{frameWidth: 95, frameHeight: 100, startFrame: 0, endFrame: 8});
    }

    create() {
        //defining SPACE
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
       
        // wall background
        console.log("Test");
        this.hallway = this.add.tileSprite(0, 0, 1920, 1080, 'wall').setOrigin(0, 0);

        // play music
        //this.sound.play('music'); // this music kinda annoying so uncomment for now XD

        // kitty run animation config
        this.anims.create({
            key:'run',
            frames: this.anims.generateFrameNumbers('kitty_run',{start: 0, end: 8, first:0}),
            frameRate: 15,
            repeat: -1
        });

        // creating player 1 Kitty instance
        this.p1Kitty = new Kitty(this, game.config.width/10, game.config.height - 125, 'kitty_run').setOrigin(0,0);
        
        //starting run animation on kitty
        this.p1Kitty.play('run');
        
        

        // obstacle spawn flags
        this.makingObstacle = false;
        this.makingPoint = false;

        game.settings = {
            speed: 4
        }
        

        // "destroyed" objects are invisible and "stored" to the left of the 
        // main play screen. When we want to reuse/reset them, we move their x
        // to the very right and then change the destroyed flag

        // tall table 1
        this.tableTall1 = new Obstacle(
            this, 
            game.config.width * 4 / 3,
            game.config.height * 2 / 3,
            'table1',
            0,
            0
        ).setOrigin(0.5, 0);

        // tall table 2
        this.tableTall2 = new Obstacle(
            this, 
            game.config.width * 4 / 3,
            game.config.height * 2 / 3,
            'table1',
            0,
            0
        ).setOrigin(0.5, 0);

        // tall table 3
        this.tableTall3 = new Obstacle(
            this, 
            game.config.width * 4 / 3,
            game.config.height * 2 / 3,
            'table1',
            0,
            0
        ).setOrigin(0.5, 0);

        // wide table 1
        this.tableWide1 = new Obstacle(
            this, 
            game.config.width * 4 / 3,
            game.config.height * 2 / 3,
            'table2',
            0,
            0
        ).setOrigin(0.5, 0);

        // wide table 2
        this.tableWide2 = new Obstacle(
            this, 
            game.config.width * 4 / 3,
            game.config.height * 2 / 3,
            'table2',
            0,
            0
        ).setOrigin(0.5, 0);

        // wide table 3
        this.tableWide3 = new Obstacle(
            this, 
            game.config.width * 4 / 3,
            game.config.height * 2 / 3,
            'table2',
            0,
            0
        ).setOrigin(0.5, 0);

        tables = [this.tableTall1, this.tableTall2, this.tableTall3, this.tableWide1, this.tableWide2, this.tableWide3];

        // yarn 1
        this.yarn1 = new Obstacle(
            this, 
            game.config.width * 4 / 3,
            game.config.height * 9 / 11,
            'yarn',
            0,
            1
        ).setOrigin(0.5, 0);

        // yarn 2
        this.yarn2 = new Obstacle(
            this, 
            game.config.width * 4 / 3,
            game.config.height * 9 / 11,
            'yarn',
            0,
            1
        ).setOrigin(0.5, 0);


        // yarn 3
        this.yarn3 = new Obstacle(
            this, 
            game.config.width * 4 / 3,
            game.config.height * 9 / 11,
            'yarn',
            0,
            1
        ).setOrigin(0.5, 0);

        // feather 1
        this.feather1 = new Obstacle(
            this, 
            game.config.width * 4 / 3,
            game.config.height * 9 / 11,
            'feather',
            0,
            1
        ).setOrigin(0.5, 0);

        // feather 2
        this.feather2 = new Obstacle(
            this, 
            game.config.width * 4 / 3,
            game.config.height * 9 / 11,
            'feather',
            0,
            1
        ).setOrigin(0.5, 0);


        // feather 3
        this.feather3 = new Obstacle(
            this, 
            game.config.width * 4 / 3,
            game.config.height * 9 / 11,
            'feather',
            0,
            1
        ).setOrigin(0.5, 0);

        // catnip 1
        this.catnip1 = new Obstacle(
            this,
            game.config.width * 4 / 3,
            game.config.height * 9 / 11,
            'catnip',
            0,
            1
        ).setOrigin(0.5, 0);

        // catnip 2
        this.catnip2 = new Obstacle(
            this,
            game.config.width * 4 / 3,
            game.config.height * 9 / 11,
            'catnip',
            0,
            1
        ).setOrigin(0.5, 0);


        // catnip 3
        this.catnip3 = new Obstacle(
            this,
            game.config.width * 4 / 3,
            game.config.height * 9 / 11,
            'catnip',
            0,
            1
        ).setOrigin(0.5, 0);

        obstacles = [this.catnip1, this.catnip2, this.catnip3, this.feather1, this.feather2, this.feather3, this.yarn1, this.yarn2, this.yarn3, ]

        // vase without flowers
        this.emptyVase = new Obstacle(
            this,
            game.config.width * 4 / 3,
            this.tableTall1.y + 10,
            'vase',
            0
        ).setOrigin(0.5, 1);

        // vase with flowers
        this.flowerVase = new Obstacle(
            this,
            game.config.width * 4 / 3,
            this.tableTall1.y + 6,
            'flower_vase',
            0
        ).setOrigin(0.5, 1);

        // lamp
        this.lamp = new Obstacle(
            this,
            game.config.width * 4 / 3,
            this.tableTall1.y + 6,
            'lamp',
            0
        ).setOrigin(0.5, 1);        

        this.picFrame1 = new Obstacle(
            this,
            game.config.width * 4 / 3,
            game.config.height * 1 / 3,
            'pic1',
            0
        ).setOrigin(0.5, 0.5);

        pointObjects = [this.emptyVase, this.lamp, this.flowerVase];

        this.picFrame1.activate();
        this.shuffle(obstacles);
        console.log(pointObjects);
        this.shuffle(pointObjects);
        console.log(pointObjects);
        this.shuffle(tables);



        // every 10 seconds increase speed of game until a cap of 5 is reached
        this.speedTimer = this.time.addEvent({
            delay: 10 * 1000,
            callback: this.increaseSpeed,
            loop: true
        });

        // every 5 seconds, attempt to make an obstacle
        this.obsTimer = this.time.addEvent({
            delay: 4000,
            callback: this.callWithDelay,
            args: [0, 10 - game.settings.speed, this.makeObstacle],
            loop: true
        });

        // every 7 seconds, attempt to make an point object
        this.ptTimer = this.time.addEvent({
            delay: 5350,
            callback: this.callWithDelay,
            args: [0, 13 - game.settings.speed, this.makePoint],
            loop: true
        });

    }
    // shuffle method from https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
    shuffle(a) {
        let j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    // Calls the function in parameter after an random delay between min and max seconds
    callWithDelay(min, max, func) {
        setTimeout(func, (Math.floor(Math.random() * max) + min) * 1000);
    }

    // make a timer that triggers every x seconds and calls a function that calls with a delay
    // create random object from array of obstacles
    makeObstacle() {
        console.log("Making obstacle");
        // select a random object from the array of objects
        // let obs = obstacles[Math.floor(Math.random() * obstacles.length)];
        let obs = obstacles[indexCount++ % obstacles.length];
        // make sure to select one that is not already on screen (3 of each type exist)
        // while (!obs.destroyed) {
        //     obs = obstacles[Math.floor(Math.random() * obstacles.length)];
        // }

        // activate obstacle
        obs.activate();
    }

    makePoint() {
        console.log("Making point");
        // select random point object from array of point objects
        // let ptObj = pointObjects[Math.floor(Math.random() * pointObjects.length)];
        let ptObj = pointObjects[indexCount++ % pointObjects.length];
        // make sure to select one that is not already on screen
        // while (!ptObj.destroyed) {
        //     ptObj = pointObjects[Math.floor(Math.random() * pointObjects.length)];
        // }

        // select table from array of tables if ptObj is not already activated
        if (ptObj.destroyed) {
            // let tbl = tables[Math.floor(Math.random() * tables.length)];
            let tbl = tables[indexCount++ % tables.length];
            while (!tbl.destroyed) {
                // tbl = tables[Math.floor(Math.random() * tables.length)];
                tbl = tables[indexCount++ % tables.length];
            }
            tbl.activate();
        }

        // activate object
        ptObj.activate();
       
    }



    // at some interval, increase speed (difficulty) of game
    increaseSpeed() {
        if (game.settings.speed < 10) {
            game.settings.speed += .5;
        }
    }


    update() {
        // make background move
        this.hallway.tilePositionX += game.settings.speed; // doesn't really do anything because background is still image

        this.obsTimer.delay = (Math.floor(Math.random() * 4) + 3) * 1000;

        tables.forEach(element => {
            element.update();
        });
        pointObjects.forEach(element => {
            element.update();
        });
        obstacles.forEach(element => {
            element.update();
        });


        this.picFrame1.update();

        this.p1Kitty.update();
        
        // SPACE to jump 
        if(Phaser.Input.Keyboard.JustDown(keySPACE) && this.p1Kitty.y == game.config.height - 125){
            this.p1Kitty.jump();
            this.sound.play('jump');
            
        }


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