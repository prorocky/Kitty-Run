/**
 * Kitty Run
 * Oran Shadian
 * 
 * 
 * 
 * 
 */

// config
let config = {
    type: Phaser.CANVAS,
    width: 1920,
    height: 1080,
    scene: [Menu, Play, End],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
            // change to true to see hitboxes
        }
    }
}

// game variable
let game = new Phaser.Game(config);

// game config variables
let borderUISize = game.config.height / 5;
let borderPadding = borderUISize / 3;

// keyboard input
let keySPACE, keyP, keyW, keyR, keyUP, keyDOWN;

// variables needed for game
let lives = 9, score = 0, obstacles = [], pointObjects = [], tables = [], frames = [], indexCount = 0, makingObstacle = false, makingPoint = false, obsDelay, pointDelay, runningTime;