/**
 * Oran Shadian
 */
class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.destroyed = true;
    }

    update() {
        if (!this.destroyed) {
            this.x -= game.settings.speed;
        }
        
        // reset "destroyed" object at right of screen
        if (this.x < -this.width) {
            this.reset();
        }
    }

    activate() {
        this.destroyed = false;
        // console.log("activated");
    }

    reset() {
        this.x = game.config.width * 4 / 3;
        this.destroyed = true;
    }
}