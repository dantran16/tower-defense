import * as me from 'melonjs';
import AllyEntity from './ally.js';
import HitBoxEntity from './HitBoxEntity.js';
import TowerBounds from './TowerBounds.js';

class FoodieEntity extends AllyEntity {

    constructor(x, y, idx, orientation) {
        // call the parent constructor
        super(x, y, {
            image: "foodie", 
            width: 32, 
            height: 64,

        });
        
        // // initialize idle animations
        this.renderable.addAnimation("right_sit", [224,225,226,227,228,229]);
        this.renderable.addAnimation("left_sit", [230,231,232,233,234,235]);
        this.renderable.addAnimation("front", [74,75,76,77,78,79]);
        this.renderable.addAnimation("back", [62,63,64,65,66,67]);

        this.className = 'Foodie'
        // set default stats of foodie unit
        this.indeces = idx
        this.orientation = orientation
        this.updateAllyStats()
        this.value = this.allyCost;

        // Create hitbox
        this.hitbox = new HitBoxEntity(x, y + this.center, {width: this.allyRange, height: this.allyRange}, this);
        me.game.world.addChild(this.hitbox, 5);

        // Create bounds for onclick method
        this.bounding = new TowerBounds(x, y, {width: 32, height: 32}, this)
        me.game.world.addChild(this.bounding)
    }

    updateAllyStats() {
        // Update ally statistics based on this.tier value
        if (this.tier == 1) {
            this.allyCost = 250;
            this.upgradeCost = 250;
            this.allyATK = 15;
            this.allyASPD = 7;
            this.allyRange = 1.5;
        }
        else if (this.tier == 2) {
            this.allyCost = 500;
            this.upgradeCost = 250;
            this.allyATK = 25;
            this.allyASPD = 10;
            this.allyRange = 1.5
        }
        else if (this.tier == 3) {
            this.allyCost = 750;
            this.upgradeCost = 0;
            this.allyATK = 40;
            this.allyASPD = 10;
            this.allyRange = 1.5
        }
    }

    // tower orientation depenedent on direction matrix values
    playAnimation() {
        if (this.orientation == 1) {
            this.renderable.setCurrentAnimation("right_sit");            
        }
        else if (this.orientation == 2) {
            this.renderable.setCurrentAnimation("left_sit");         
        }
        else if (this.orientation == 3) {
            this.renderable.setCurrentAnimation("front")          
        }
        else {
            this.renderable.setCurrentAnimation("back")    
        }
    } 
};

export default FoodieEntity;
