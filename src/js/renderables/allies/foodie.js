import * as me from 'melonjs';
import AllyEntity from './ally.js';
import HitBoxEntity from './HitBoxEntity.js';

class FoodieEntity extends AllyEntity {

    constructor(x, y) {
        // call the parent constructor
        super(x, y, {
            image: "foodie", 
            width: 32, 
            height: 65,

        });
        // right idle animation
        // this.renderable.addAnimation("right_sit", [0,1,2,3,4,5]);
        // this.renderable.setCurrentAnimation("right_sit");

        // facing left
        // this.renderable.addAnimation("left_sit_animation", [6,7,8,9,10,11]);
        // this.renderable.setCurrentAnimation("left_sit_animation");

        this.className = 'Foodie'
        // set default stats of foodie unit
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
};

export default FoodieEntity;
