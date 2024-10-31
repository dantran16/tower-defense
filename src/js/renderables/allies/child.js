import * as me from 'melonjs';
import AllyEntity from './ally.js';
import HitBoxEntity from './HitBoxEntity.js';

class ChildEntity extends AllyEntity {

    constructor(x, y) {
        // call the parent constructor
        super(x, y, {image: "white-dot", width: 25, height: 25});
        this.className = 'Child'
        // set default stats of child unit
        this.updateAllyStats()
        this.hitbox = new HitBoxEntity(x, y, {width: this.allyRange, height: this.allyRange}, this);
        me.game.world.addChild(this.hitbox);
    }

    updateAllyStats() {
        // Update ally statistics based on this.tier value
        if (this.tier == 1) {
            this.allyCost = 50;
            this.allyATK = 5;
            this.allyASPD = 2;
            this.allyRange = 1;
        }
        else if (this.tier == 2) {
            this.allyCost = 100;
            this.allyATK = 10;
            this.allyASPD = 2.5;
            this.allyRange = 1.1;
        }
        else if (this.tier == 3) {
            this.allyCost = 100;
            this.allyATK = 30;
            this.allyASPD = 3;
            this.allyRange = 1.2
        }
    }

    upgradeTier() {
        // Increments this.tier value up until 3
        if (this.tier < 3) {
            this.tier++
            this.updateAllyStats()
            this.hitbox.updateHitbox(this.allyRange)
        }
    }
};

export default ChildEntity;
