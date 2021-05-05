class Kitty extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, health){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.health = health;

        this.gravity = .25;
        this.lift = 20; 
        this.velocity = 0;
    }

    update(){  
        this.velocity += this.gravity;
        this.y += this.velocity;
        
        //game floor border
        if(this.y > game.config.height - 225){
            this.y = game.config.height - 225;
            this.velocity = 0;
        }

      
    }

    jump(){ 
        this.velocity -= this.lift;
    }

    smallJump() {
        this.velocity -= this.lift * 4 / 5;
    }
}