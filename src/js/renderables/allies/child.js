import * as me from 'melonjs';
import AllyEntity from './ally.js';
import HitBoxEntity from './HitBoxEntity.js';
import TowerBounds from './TowerBounds.js';

class ChildEntity extends AllyEntity {

    constructor(x, y, idx, orientation) {
        // call the parent constructor
        super(x, y, {
            image: "child", 
            width: 32, 
            height: 64
        });
        this.center = 30
        
        // initialize idle animations
        this.renderable.addAnimation("right", [24,25,26,27,28,29]);
        this.renderable.addAnimation("left", [36,37,38,39,40,41]);
        this.renderable.addAnimation("front", [42,43,44,45,46,47]);
        this.renderable.addAnimation("back", [30,31,32,33,34,35]);
        
        this.className = 'Child'
        // set default stats of child unit
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
            this.allyCost = 50;
            this.upgradeCost = 50;
            this.allyATK = 8;
            this.allyASPD = 1.4;
            this.allyRange = 1;
        }
        else if (this.tier == 2) {
            this.allyCost = 100;
            this.upgradeCost = 50;
            this.allyATK = 15;
            this.allyASPD = 1.4;
            this.allyRange = 1;
        }
        else if (this.tier == 3) {
            this.allyCost = 150;
            this.upgradeCost = 0;
            this.allyATK = 25;
            this.allyASPD = 1.4;
            this.allyRange = 1
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

};

export default ChildEntity;
