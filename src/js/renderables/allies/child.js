import * as me from 'melonjs';
import AllyEntity from './ally.js';
import HitBoxEntity from './HitBoxEntity.js';

class ChildEntity extends AllyEntity {

    constructor(x, y, idx) {
        // call the parent constructor
        super(x, y, {
            image: "child", 
            width: 32, 
            height: 64
        });
        
        // idle animations
        this.renderable.addAnimation("right_sit", [24,25,26,27,28,29]);
        this.renderable.addAnimation("left_sit", [36,37,38,39,40,41]);
        this.renderable.addAnimation("front", [42,43,44,45,46,47]);
        this.renderable.addAnimation("back", [30,31,32,33,34,35]);
        
        this.className = 'Child'
        // set default stats of child unit
        this.indeces = idx
        this.updateAllyStats()
        this.value = this.allyCost;
        this.hitbox = new HitBoxEntity(x, y+30, {width: this.allyRange, height: this.allyRange}, this);
        me.game.world.addChild(this.hitbox);
    }

    updateAllyStats() {
        // Update ally statistics based on this.tier value
        if (this.tier == 1) {
            this.allyCost = 50;
            this.upgradeCost = 100;
            this.allyATK = 5;
            this.allyASPD = 2;
            this.allyRange = 1;
        }
        else if (this.tier == 2) {
            this.allyCost = 100;
            this.upgradeCost = 100;
            this.allyATK = 10;
            this.allyASPD = 2.5;
            this.allyRange = 1.1;
        }
        else if (this.tier == 3) {
            this.allyCost = 100;
            this.upgradeCost = 0;
            this.allyATK = 30;
            this.allyASPD = 3;
            this.allyRange = 1.2
        }
    }

    playAnimation() {
        if (this.orientation == 2) {
            this.renderable.setCurrentAnimation("right_sit");            
        }
        else if (this.orientation == 3) {
            this.renderable.setCurrentAnimation("left_sit");         
        }
        else if (this.orientation == 4) {
            this.renderable.setCurrentAnimation("front")          
        }
        else {
            this.renderable.setCurrentAnimation("back")    
        }
    }
};

export default ChildEntity;
