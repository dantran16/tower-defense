import * as me from 'melonjs';
import AllyEntity from './ally.js';
import HitBoxEntity from './HitBoxEntity.js';

class FoodieEntity extends AllyEntity {

    constructor(x, y, idx) {
        // call the parent constructor
        super(x, y, {
            image: "foodie", 
            width: 32, 
            height: 64,

        });
        this.renderable.addAnimation("right_sit", [0,1,2,3,4,5]);
        this.renderable.addAnimation("left_sit", [6,7,8,9,10,11]);
        // this.renderable.addAnimation("front", [47,48,49,50,51,52]);
        // this.renderable.addAnimation("back", [59,60,61,62,63,64]);

        this.className = 'Foodie'
        // set default stats of foodie unit
        this.indeces = idx
        this.updateAllyStats()
        this.value = this.allyCost;
        this.hitbox = new HitBoxEntity(x, y+25, {width: this.allyRange, height: this.allyRange}, this);
        me.game.world.addChild(this.hitbox);
    }

    updateAllyStats() {
        // Update ally statistics based on this.tier value
        if (this.tier == 1) {
            this.allyCost = 200;
            this.upgradeCost = 150;
            this.allyATK = 30;
            this.allyASPD = 1.75;
            this.allyRange = 1.3;
        }
        else if (this.tier == 2) {
            this.allyCost = 400;
            this.upgradeCost = 200;
            this.allyATK = 50;
            this.allyASPD = 2;
            this.allyRange = 1.4
        }
        else if (this.tier == 3) {
            this.allyCost = 600;
            this.upgradeCost = 0
            this.allyATK = 80;
            this.allyASPD = 2.5;
            this.allyRange = 1.5
        }
    }

    playAnimation() {
        if (this.orientation == 2) {
            this.renderable.setCurrentAnimation("right_sit");            
        }
        else if (this.orientation == 3) {
            this.renderable.setCurrentAnimation("left_sit");         
        }
        // else if (this.orientation == 4) {
        //     this.renderable.setCurrentAnimation("front")          
        // }
        // else {
        //     this.renderable.setCurrentAnimation("back")    
        // }

        console.log(this.orientation)
    }

    // createSprite() {
    //     this.spriteImage = me.loader.getImage("foodie")
    //     this.sprite = new me.Sprite(this.pos.x + 25, this.pos.y - 5, {
    //         image: this.spriteImage,
    //         framewidth: 32,
    //         frameheight:64
    //     })
    //     this.sprite.addAnimation("left_sit", [6,7,8,9,10,11]);
    //     this.sprite.addAnimation("right_sit", [0,1,2,3,4,5]);
    //     if (this.orientation == 2) {
    //         this.sprite.setCurrentAnimation("right_sit")
    //         console.log('testing right')
    //     }
    //     else if (this.orientation == 3) {
    //         this.sprite.setCurrentAnimation("left_sit"); 
    //         console.log('testing left')
    //     }
    //     console.log('testing')
    // }
};

export default FoodieEntity;
