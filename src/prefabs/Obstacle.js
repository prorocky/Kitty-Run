/**
 * Oran Shadian
 */
class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, value) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.hidden = true;
        this.value = value;
        this.copyValue = this.value;
        this.destroyed = false;
        this.copyTexture = texture;
    }

    update() {
        if (!this.hidden) {
            this.x -= game.settings.speed;
        }
        
        // reset "destroyed" object at right of screen
        if (this.x < -this.width) {
            this.reset();
        }
    }

    activate() {
        this.hidden = false;
    }

    collide() {
        this.value = 0;
        this.destroyed = true;
    }

    reset() {
        this.x = game.config.width * 4 / 3;
        this.hidden = true;
        this.value = this.copyValue;
        this.destroyed = false;
        this.setTexture(this.copyTexture);
    }
}