class Kitty extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, health){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.health = health;
    }
    update(){
        
    }
}