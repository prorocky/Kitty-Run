/**
 * Oran Shadian
 */
class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, value) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.destroyed = true;
        this.value = value;
        this.copyValue = this.value;
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
    }

    collide() {
        this.value = 0;
    }

    reset() {
        this.x = game.config.width * 4 / 3;
        this.destroyed = true;
        this.value = this.copyValue;
    }
}