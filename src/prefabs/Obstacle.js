/**
 * Oran Shadian
 */
class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
    }

    update() {
        this.x -= game.settings.speed;

        if (this.x < -this.width) {
            this.destroy();
        }
    }
}