import * as me from 'melonjs';
import AllyEntity from './ally.js';
import HitBoxEntity from './HitBoxEntity.js';
import TowerBounds from './TowerBounds.js';

class AdultEntity extends AllyEntity {

    constructor(x, y, idx, orientation) {
        // call the parent constructor
        super(x, y, {
            image: "adult", 
            width: 32, 
            height: 64});

        // initialize idle animations
        // this.renderable.addAnimation("right", [224,225,226,227,228,229]);
        // this.renderable.addAnimation("left", [230,231,232,233,234,235]);
        this.renderable.addAnimation("right", [56,57,58,59,60,61])
        this.renderable.addAnimation("left", [68,69,70,71,72,73])
        this.renderable.addAnimation("front", [74,75,76,77,78,79]);
        this.renderable.addAnimation("back", [62,63,64,65,66,67]);
        this.renderable.addAnimation("right_attack", [620,621,625,626,627])
        this.renderable.addAnimation("left_attack", [647,648,649,653,654])
        this.renderable.addAnimation("front_attack", [660,661,662,663,664])
        this.renderable.addAnimation("back_attack", [633,634,635,635,639])

        this.className = 'Adult';
        // set default stats of adult unit
        this.indeces = idx;
        this.orientation = orientation;
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
            this.allyCost = 150;
            this.upgradeCost = 100;
            this.allyATK = 20;
            this.allyASPD = 1.5;
            this.allyRange = 1.1;
        }
        else if (this.tier == 2) {
            this.allyCost = 250;
            this.upgradeCost = 100;
            this.allyATK = 20;
            this.allyASPD = 2;
            this.allyRange = 1.2
        }
        else if (this.tier == 3) {
            this.allyCost = 350;
            this.upgradeCost = 0;
            this.allyATK = 25;
            this.allyASPD = 2.5;
            this.allyRange = 1.3
        }
    }

    // tower orientation depenedent on direction matrix values
    idleAnimation() {
        if (this.orientation == 1) {
            this.renderable.setCurrentAnimation("right");            
        }
        else if (this.orientation == 2) {
            this.renderable.setCurrentAnimation("left");         
        }
        else if (this.orientation == 3) {
            this.renderable.setCurrentAnimation("front")          
        }
        else {
            this.renderable.setCurrentAnimation("back")    
        }
    } 

    attackAnimation() {
        if (this.orientation == 1) {
            this.renderable.setCurrentAnimation("right_attack", "right");            
        }
        else if (this.orientation == 2) {
            this.renderable.setCurrentAnimation("left_attack", "left");         
        }
        else if (this.orientation == 3) {
            this.renderable.setCurrentAnimation("front_attack", "front")          
        }
        else {
            this.renderable.setCurrentAnimation("back_attack", "back")    
        }
    }
};

export default AdultEntity;
