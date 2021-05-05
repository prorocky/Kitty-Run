/**
 * Oran Shadian
 */
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        /* load images */
        // UI
        this.load.image('lives', 'assets/img/kr_lives_red.png');
        this.load.image('score', 'assets/img/kr_score_red.png');
        this.load.image('human', 'assets/img/story1.png');

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
        this.load.audio('music', 'assets/aud/background_song.mp3');
        this.load.audio('land', 'assets/aud/cat_landing.wav');
        this.load.audio('glass', 'assets/aud/glass_break.wav');
        this.load.audio('lose_life', 'assets/aud/Distressed_Meow.mp3');
        this.load.audio('game_over', 'assets/aud/LoseCondition1.wav');
        this.load.audio('game_over_music', 'assets/aud/game_over_song.mp3');
        this.load.audio('jump','assets/aud/CatJump.wav');

        // loading kitty run animation
        //this.load.spritesheet('kitty_run', './assets//img/kitty_run02.png',{frameWidth: 90, frameHeight: 100, startFrame: 0, endFrame: 8});
        this.load.spritesheet('kitty_run', './assets//img/Kitty_Running_Sprite06.png',{frameWidth: 293, frameHeight: 225, startFrame: 0, endFrame: 7});
    }

    create() {
        // defining keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
       
        // wall background
        this.hallway = this.add.tileSprite(0, 0, 1920, 1080, 'wall').setOrigin(0, 0);

        // play music
        this.song = this.sound.add('music', {volume: 0.5, loop: true});
        this.song.play();

        // human
        this.human = this.add.sprite(game.config.width / 6 - 5, game.config.height / 2, "human");
        this.human.alpha = 0;

        let popupConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '64px',
            backgroundColor: '',
            color: '#000',
            align: 'center',
        }

        // volume indicator
        this.volumeIndicator = this.add.text(game.config.width / 20, borderPadding * 2, "Use (UP) and (DOWN) arrows to change volume of the music", popupConfig);

        game.settings = {
            speed: 5,
            spawnspeed: 2
        }

        runningTime = 0;
        score = 0;
        lives = 9;

        this.gameover = false;

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '72px',
            backgroundColor: '',
            color: '#e75751',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 200
        }

        // display lives
        this.add.sprite(borderUISize, borderPadding, "lives");
        this.displayLives = this.add.text(borderUISize + 10, borderPadding / 2, lives, scoreConfig);


        // display score
        this.add.sprite(game.config.width - borderUISize, borderPadding, "score");
        this.displayScore = this.add.text(game.config.width - borderUISize + 10, borderPadding / 2, score, scoreConfig)
        
        // UI elements (Score, Time, Lives)
        // Lives at top left
        this.scoreText = new Image(
            this,
            0,
            0,
            'score',
            0
        );

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
            game.config.height * 19 / 22,
            'yarn',
            0,
            -1
        ).setOrigin(0.5, 0);

        // yarn 2
        this.yarn2 = new Obstacle(
            this, 
            game.config.width * 4 / 3,
            game.config.height * 19 / 22,
            'yarn',
            0,
            -1
        ).setOrigin(0.5, 0);


        // yarn 3
        this.yarn3 = new Obstacle(
            this, 
            game.config.width * 4 / 3,
            game.config.height * 19 / 22,
            'yarn',
            0,
            -1
        ).setOrigin(0.5, 0);

        // feather 1
        this.feather1 = new Obstacle(
            this, 
            game.config.width * 4 / 3,
            game.config.height * 19 / 22,
            'feather',
            0,
            -1
        ).setOrigin(0.5, 0);

        // feather 2
        this.feather2 = new Obstacle(
            this, 
            game.config.width * 4 / 3,
            game.config.height * 19 / 22,
            'feather',
            0,
            -1
        ).setOrigin(0.5, 0);


        // feather 3
        this.feather3 = new Obstacle(
            this, 
            game.config.width * 4 / 3,
            game.config.height * 19 / 22,
            'feather',
            0,
            -1
        ).setOrigin(0.5, 0);

        // catnip 1
        this.catnip1 = new Obstacle(
            this,
            game.config.width * 4 / 3,
            game.config.height * 19 / 22,
            'catnip',
            0,
            -1
        ).setOrigin(0.5, 0);

        // catnip 2
        this.catnip2 = new Obstacle(
            this,
            game.config.width * 4 / 3,
            game.config.height * 19 / 22,
            'catnip',
            0,
            -1
        ).setOrigin(0.5, 0);


        // catnip 3
        this.catnip3 = new Obstacle(
            this,
            game.config.width * 4 / 3,
            game.config.height * 19 / 22,
            'catnip',
            0,
            -1
        ).setOrigin(0.5, 0);

        obstacles = [this.catnip1, this.catnip2, this.catnip3, this.feather1, this.feather2, this.feather3, this.yarn1, this.yarn2, this.yarn3]

        // vase without flowers
        this.emptyVase1 = new Obstacle(
            this,
            game.config.width * 4 / 3,
            this.tableTall1.y + 10,
            'vase',
            0,
            1
        ).setOrigin(0.5, 1);

        this.emptyVase2 = new Obstacle(
            this,
            game.config.width * 4 / 3,
            this.tableTall1.y + 10,
            'vase',
            0,
            1
        ).setOrigin(0.5, 1);

        // vase with flowers
        this.flowerVase1 = new Obstacle(
            this,
            game.config.width * 4 / 3,
            this.tableTall1.y + 6,
            'flower_vase',
            0,
            1
        ).setOrigin(0.5, 1);

        this.flowerVase2 = new Obstacle(
            this,
            game.config.width * 4 / 3,
            this.tableTall1.y + 6,
            'flower_vase',
            0,
            1
        ).setOrigin(0.5, 1);

        // lamp
        this.lamp1 = new Obstacle(
            this,
            game.config.width * 4 / 3,
            this.tableTall1.y + 6,
            'lamp',
            0,
            1
        ).setOrigin(0.5, 1);

        this.lamp2 = new Obstacle(
            this,
            game.config.width * 4 / 3,
            this.tableTall1.y + 6,
            'lamp',
            0,
            1
        ).setOrigin(0.5, 1);

        pointObjects = [this.emptyVase1, this.emptyVase2, this.lamp1, this.lamp2, this.flowerVase1, this.flowerVase2];

        // picture frame1
        this.picFrame1 = new Obstacle(
            this,
            game.config.width * 4 / 3,
            game.config.height * 1 / 3,
            'pic1',
            0,
            2
        ).setOrigin(0.5, 0.5);

        // picture frame2
        this.picFrame2 = new Obstacle(
            this,
            game.config.width * 4 / 3,
            game.config.height * 1 / 3,
            'pic2',
            0,
            2
        ).setOrigin(0.5, 0.5);

        // picture frame3
        this.picFrame3 = new Obstacle(
            this,
            game.config.width * 4 / 3,
            game.config.height * 1 / 3,
            'pic3',
            0,
            2
        ).setOrigin(0.5, 0.5);

        // picture frame4
        this.picFrame4 = new Obstacle(
            this,
            game.config.width * 4 / 3,
            game.config.height * 1 / 3,
            'pic4',
            0,
            2
        ).setOrigin(0.5, 0.5);

        // picture frame5
        this.picFrame5 = new Obstacle(
            this,
            game.config.width * 4 / 3,
            game.config.height * 1 / 3,
            'pic5',
            0,
            2
        ).setOrigin(0.5, 0.5);

        // picture frame6
        this.picFrame6 = new Obstacle(
            this,
            game.config.width * 4 / 3,
            game.config.height * 1 / 3,
            'pic6',
            0,
            2
        ).setOrigin(0.5, 0.5);

        // picture frame7
        this.picFrame7 = new Obstacle(
            this,
            game.config.width * 4 / 3,
            game.config.height * 1 / 3,
            'pic7',
            0,
            2
        ).setOrigin(0.5, 0.5);

        // picture frame8
        this.picFrame8 = new Obstacle(
            this,
            game.config.width * 4 / 3,
            game.config.height * 1 / 3,
            'pic8',
            0,
            2
        ).setOrigin(0.5, 0.5);

        // picture frame9
        this.picFrame9 = new Obstacle(
            this,
            game.config.width * 4 / 3,
            game.config.height * 1 / 3,
            'pic9',
            0,
            2
        ).setOrigin(0.5, 0.5);

        // picture frame10
        this.picFrame10 = new Obstacle(
            this,
            game.config.width * 4 / 3,
            game.config.height * 1 / 3,
            'pic10',
            0,
            2
        ).setOrigin(0.5, 0.5);

        frames = [this.picFrame1, this.picFrame2, this.picFrame3, this.picFrame4, this.picFrame5, this.picFrame6, this.picFrame7, this.picFrame8, this.picFrame9, this.picFrame10];

        this.shuffle(obstacles);
        this.shuffle(pointObjects);
        this.shuffle(tables);



        // every 10 seconds increase speed of game until a cap of 5 is reached
        this.speedTimer = this.time.addEvent({
            delay: 10 * 1000,
            callback: this.increaseSpeed,
            loop: true
        });

        // every 2 seconds, attempt to make an obstacle args: [0, 2 / (game.settings.speed / 2), this.makeObstacle],
        this.obsTimer = this.time.addEvent({
            delay: 2000,
            callback: this.callWithDelay,
            args: [0, 1, this.makeObstacle],
            loop: true
        });
        // every 3.5 seconds, attempt to make an obstacle args: [0, 2 / (game.settings.speed / 2), this.makeObstacle],
        this.obsTimer2 = this.time.addEvent({
            delay: 3500,
            callback: this.callWithDelay,
            args: [0, 1, this.makeObstacle],
            loop: true,
            paused: true
        });

        // every 3.5 seconds, attempt to make a point object
        this.ptTimer = this.time.addEvent({
            delay: 3500,
            callback: this.callWithDelay,
            args: [0, 2, this.makePoint],
            loop: true
        });

        // every 4 seconds, attempt to make a point object
        this.ptTimer2 = this.time.addEvent({
            delay: 4000,
            callback: this.callWithDelay,
            args: [0, 2, this.makePoint],
            loop: true,
            paused: true
        });

        // every 2 seconds, create a picture frame with a random picture
        this.picTimer = this.time.addEvent({
            delay: 2000,
            callback: this.callWithDelay,
            args: [0, 1, this.makePicture],
            loop: true
        });

        // timer to count delay between making point objects
        pointDelay = this.time.addEvent({
            delay: 500,
            callback: this.makePtsFlag,
            loop: true,
            paused: true
        });

        // timer to count delay between making obstacles
        obsDelay = this.time.addEvent({
            delay: 500,
            callback: this.makeObsFlag,
            loop: true,
            paused: true
        });

        // free running timer
        this.frt = this.time.addEvent({
            delay: 100,
            callback: this.incrementTime,
            loop: true
        });

        // kitty run animation config
        this.anims.create({
            key:'run',
            frames: this.anims.generateFrameNumbers('kitty_run',{start: 0, end: 7, first:0}),
            frameRate: 15,
            repeat: -1
        });

        // creating player 1 Kitty instance
        this.p1Kitty = new Kitty(this, game.config.width/10, game.config.height * 5 / 22, 'kitty_run').setOrigin(0.5,0);
        
        //starting run animation on kitty
        this.p1Kitty.play('run');
        
        

    }

    update() {
        if (lives < 1) {
            this.gameover = true;
            this.song.mute = true;
            this.frt.paused = true;
            this.scene.start('endScene');
            // this.sound.play('game_over'); // PLAY THIS ON NEXT SCENE
            // go to end screen scene
        }
        if (runningTime < 100) {
            this.volumeIndicator.alpha = 20 / runningTime;
        } else {
            this.volumeIndicator.destroy();
        }
        if (!this.gameover) {
            // make background move
            this.hallway.tilePositionX += game.settings.speed; // doesn't really do anything because background is still image

            this.obsTimer.delay = (Math.floor(Math.random() * 4) + 3) * 1000;

            tables.forEach(element => {
                element.update();
            });
            pointObjects.forEach(element => {
                element.update();
                if (this.checkCollision(this.p1Kitty, element)) {
                    score += element.value;
                    if (element.value) {
                        this.sound.play('glass');
                    }
                    element.collide();
                }
            });
            obstacles.forEach(element => {
                element.update();
                if (this.checkCollision(this.p1Kitty, element)) {
                    lives += element.value;
                    if (element.value) {
                        this.sound.play('lose_life');
                        this.humanAppear();
                        this.clock = this.time.delayedCall(1250, () => {
                            this.humanDisappear();
                        }, null, this);
                    }
                    element.collide();
                }
            });
            frames.forEach(element => {
                element.update();
                if (this.checkCollision(this.p1Kitty, element)) {
                    score += element.value;
                    if (element.value) {
                        this.sound.play('glass');
                    }
                    element.collide();
                }
            });

            this.p1Kitty.update();

            // create more points as game goes on
            if (game.settings.speed > 6) {
                this.ptTimer2.paused = false;
            }

            // create more obstacles as game goes on
            if (game.settings.speed > 8) {
                this.obsTimer2.paused = false;
            }
            
            // SPACE to jump 
            if(Phaser.Input.Keyboard.JustDown(keySPACE) && this.p1Kitty.y == game.config.height - 225){
                this.p1Kitty.jump();
                this.sound.play('jump');
                
            }

            // W to small jump
            if(Phaser.Input.Keyboard.JustDown(keyW) && this.p1Kitty.y == game.config.height - 225){
                this.p1Kitty.smallJump();
                this.sound.play('jump');
                
            }

            // UP and DOWN to control volume of music
            if (Phaser.Input.Keyboard.JustDown(keyUP) && this.song.volume < 1) {
                this.song.volume += .1;
            }
            if (Phaser.Input.Keyboard.JustDown(keyDOWN) && this.song.volume > .1) {
                this.song.volume -= .1;
            }
            // update display for lives and score
            this.displayLives.text = lives;
            this.displayScore.text = score;
        }
    }
    incrementTime() {
        runningTime++;
        console.log(runningTime);
    }

    makeObsFlag() {
        makingObstacle = false;
        obsDelay.paused = true;
    }

    makePtsFlag() {
        makingPoint = false;
        pointDelay.paused = true;
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
        setTimeout(func, (Math.floor(Math.random() * max / 4) + min) * 1000);
        if (game.settings.speed > 6) {
            setTimeout(func, (Math.floor(Math.random() * max * 1 / 2) + min) * 1000);
        }
        if (game.settings.speed > 8) {
            setTimeout(func, (Math.floor(Math.random() * max * 3 / 4) + min) * 1000);
        }

    }

    // make a timer that triggers every x seconds and calls a function that calls with a delay
    // create random object from array of obstacles
    makeObstacle() {
        // console.log("Making obstacle");
        if (!makingObstacle) {
            makingObstacle = true;
            obsDelay.paused = false;
            // select a random object from the array of objects
            let obs = obstacles[indexCount++ % obstacles.length];
            // make sure to select one that is not already on screen (3 of each type exist)
            while (!obs.destroyed) {
                obs = obstacles[indexCount++ % obstacles.length];
            }      
            // activate obstacle
            obs.activate();
        }
    }

    makePoint() {
        // console.log("Making point");
        if (!makingPoint) {
            makingPoint = true;
            pointDelay.paused = false;
            // select random point object from array of point objects
            let ptObj = pointObjects[Math.floor(Math.random() * pointObjects.length)];
            // make sure to select one that is not already on screen
            while (!ptObj.destroyed) {
                // ptObj = pointObjects[indexCount++ % pointObjects.length];
                ptObj = pointObjects[Math.floor(Math.random() * pointObjects.length)];
            }

            // select table from array of tables if ptObj is not already activated
            let tbl = tables[indexCount++ % tables.length];
            while (!tbl.destroyed) {
                tbl = tables[indexCount++ % tables.length];
            }

            // activate object
            ptObj.activate();
            tbl.activate();
        }
    }

    makePicture() {
        // console.log("Making pic");
        // select random picframe from array
        let picObj = frames[Math.floor(Math.random() * frames.length)];
        // make sure to select one that is not already on screen
        while (!picObj.destroyed) {
            picObj = frames[Math.floor(Math.random() * frames.length)];
        }

        // activate picObj
        picObj.activate();
    }

    

    // at some interval, increase speed (difficulty) of game
    increaseSpeed() {
        if (game.settings.speed < 10) {
            game.settings.speed += .5;
            game.settings.spawnspeed += 1.5;
        }
    }


    
    checkCollision(kitty, obstacle) {
        if (kitty.x < obstacle.x + obstacle.width &&
        kitty.x + kitty.width > obstacle.x &&
        kitty.y < obstacle.y + obstacle.height &&
        kitty.y + kitty.height > obstacle.y) {
            return true;
        }
        return false;
    }

    humanAppear() {
        console.log("human appear");
        this.human.alpha = 1;
    }

    humanDisappear() {
        console.log("human disappear");
        this.human.alpha = 0;
    }
}