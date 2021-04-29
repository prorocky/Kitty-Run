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
    width: 640,
    height: 480,
    scene: [Play, Menu, Instruction],
}

// game variable
let game = new Phaser.Game(config);

// game config variables
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// keyboard input
