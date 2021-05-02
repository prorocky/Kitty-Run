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
    scene: [Play, Menu, Instructions]
}

// game variable
let game = new Phaser.Game(config);

// game config variables
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// keyboard input
let keySPACE;

// variables needed for game
let lives, score, obstacles, pointObjects;