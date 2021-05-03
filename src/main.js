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
    scene: [Menu, Play]
}

// game variable
let game = new Phaser.Game(config);

// game config variables
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// keyboard input
let keySPACE, keyP, keyW;

// variables needed for game
let lives, score, obstacles = [], pointObjects = [], tables = [], frames = [], indexCount = 0, makingObstacle = false, makingPoint = false, obsDelay, pointDelay;