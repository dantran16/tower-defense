import * as me from 'melonjs';
import AllyEntity from 'ally.js';
import game from '../../game.js';

class AdultEntity extends AllyEntity {

    constructor(x, y, settings) {
        // call the parent constructor
        super(x, y , settings);

        // set default stats of adult unit
        this.updateAllyStats()
    }

    getAllyStats() {
        return {
            allyTier: this.tier,
            allyCost: this.allyCost,
            allyATK: this.allyATK,
            allyASPD: this.allyASPD,
            allyRange: this.allyRange
        }
    }

    updateAllyStats() {
        if (this.tier == 1) {
            this.allyCost = 200;
            this.allyATK = 40;
            this.allyASPD = 2;
            this.allyRange = 1.25
        }
        else if (this.tier == 2) {
            this.allyCost = 300;
            this.allyATK = 80;
            this.allyASPD = 2.5;
            this.allyRange = 1.5
        }
        else if (this.tier == 3) {
            this.allyCost = 400;
            this.allyATK = 100;
            this.allyASPD = 3;
            this.allyRange = 1.75
        }
    }

    upgradeTier() {
        if (this.tier < 3) {
            this.tier++
            this.updateAllyStats()
        }
    }

    onCollision(response, other) {
        // if enemy unit enters range of ally unit
        if (other.body.collisionType == me.collision.types.ENEMY_OBJECT) {
            return True
        }
        // Something needs to be done here to decrease the hp of the enemy unit in question
        // Also needs to account for the attack speed
    }
};

export default AdultEntity;
