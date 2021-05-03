class Kitty extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, health){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.health = health;

        this.gravity = 1;
        this.lift = 35; 
        this.velocity = 0;
    }

    update(){  
        this.velocity += this.gravity;
        this.y += this.velocity;
        
        if(this.y > game.config.height - 125){
            this.y = game.config.height - 125;
            this.velocity = 0;
        }

      
    }

    jump(){ 
        this.velocity -= this.lift;
    }
}