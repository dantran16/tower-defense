import * as me from 'melonjs';
import AllyEntity from 'ally.js';
import game from '../../game.js';

class FoodieEntity extends AllyEntity {

    constructor(x, y, settings) {
        // call the parent constructor
        super(x, y , settings);

        // set default stats of foodie unit
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
            this.allyCost = 100;
            this.allyATK = 30;
            this.allyASPD = 1.75;
            this.allyRange = 2
        }
        else if (this.tier == 2) {
            this.allyCost = 150;
            this.allyATK = 50;
            this.allyASPD = 2;
            this.allyRange = 2.5
        }
        else if (this.tier == 3) {
            this.allyCost = 200;
            this.allyATK = 80;
            this.allyASPD = 2.5;
            this.allyRange = 3
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

export default FoodieEntity;
