import * as me from 'melonjs';
import AllyEntity from './ally.js';
import HitBoxEntity from './HitBoxEntity.js';
import TowerBounds from './TowerBounds.js';

class AdultEntity extends AllyEntity {

    constructor(x, y, idx) {
        // call the parent constructor
        super(x, y, {
            image: "adult", 
            width: 32, 
            height: 64});

        // right idle animation
        this.renderable.addAnimation("right_sit", [0,1,2,3,4,5]);
        this.renderable.setCurrentAnimation("right_sit");

        this.className = 'Adult'
        // set default stats of adult unit
        this.indeces = idx
        this.updateAllyStats()
        this.value = this.allyCost;

        // Create hitbox
        this.hitbox = new HitBoxEntity(x, y+25, {width: this.allyRange, height: this.allyRange}, this);
        me.game.world.addChild(this.hitbox, 5);
        
        // Create bounds for onclick method
        this.bounding = new TowerBounds(x, y, {width: 32, height: 32}, this)
        me.game.world.addChild(this.bounding)
    }

    updateAllyStats() {
        // Update ally statistics based on this.tier value
        if (this.tier == 1) {
            this.allyCost = 200;
            this.upgradeCost = 300;
            this.allyATK = 40;
            this.allyASPD = 2;
            this.allyRange = 1.1;
        }
        else if (this.tier == 2) {
            this.allyCost = 300;
            this.upgradeCost = 400;
            this.allyATK = 80;
            this.allyASPD = 2.5;
            this.allyRange = 1.2
        }
        else if (this.tier == 3) {
            this.allyCost = 400;
            this.upgradeCost = 0;
            this.allyATK = 100;
            this.allyASPD = 3;
            this.allyRange = 1.3
        }
    }
};

export default AdultEntity;
