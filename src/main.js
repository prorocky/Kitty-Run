/**
 * Kitty Run
 * 
 * Our design team, Gabriella Flores and Makkenzie Zepeda, formalized the game's style by doing outside studies of the cult classic cartoon, Tom and Jerry. 
 * The creative influence is notable in the simplistic lineart and color palette used throughout the props, main characters, and backdrops. 
 * The design goal was a stylized cartoon experience. All the music was made with real instruments and sounds by Makkenzie Zepeda and her boyfriend Dominic Castelli (sound designer). 
 * The music was designed to enhance the cat chase, the doom of a cat bath, and the jazzy relaxation state of a sleeping cat.
 * 
 * For programming, Oran made some interesting choices for how to spawn new objects (both obstacles and points).
 * Oran created a function that takes 2 numbers and another function as an argument, and calls it with a delay between
 * the two numbers that were sent. Another interesting feature is how the objects change to their shattered form then
 * get restored when they appear again, Oran accomplished this by storing a copy of the texture when the object is constructed
 * and when the reset function for the object is called, it restores the original texture. (Oran: looking back, I would have done things a little diffrently,
 * but I made it work with the knowledge I had). 
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
            debug: false
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