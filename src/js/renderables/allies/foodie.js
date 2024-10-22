import * as me from 'melonjs';
import AllyEntity from 'ally.js';
import applicationState from '../../applicationState.js';

class FoodieEntity extends AllyEntity {

    constructor(x, y, settings) {
        // call the parent constructor
        super(x, y, settings);

        // set default stats of foodie unit
        this.updateAllyStats()
        this.allyCost = 100;
        this.allyATK = 30;
        this.allyASPD = 1.75;
        this.allyRange = 2;
    }

    getAllyStats() {
        // Return ally statistics
        return {
            allyTier: this.tier,
            allyCost: this.allyCost,
            allyATK: this.allyATK,
            allyASPD: this.allyASPD,
            allyRange: this.allyRange
        }
    }

    updateAllyStats() {
        // Update ally statistics based on this.tier value
        if (this.tier == 2) {
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
        // Increments this.tier value up until 3
        if (this.tier < 3) {
            this.tier++
            this.updateAllyStats()
        }
    }
};

export default FoodieEntity;
