import * as me from 'melonjs';
import game from '../../game.js';

class AllyEntity extends me.Entity {

    constructor(x, y, settings) {
        // call the parent constructor
        super(x, y , settings);
        
        // set a "player object" type
        this.body.collisionType = me.collision.types.PLAYER_OBJECT;

        // set default stats of ally unit
        this.tier = 1;
        this.allyCost;
        this.allyATK;
        this.allyASPD;
        this.allyRange;
    }

    update(dt) {
        // update ally unit per frame
        return super.update(dt);
    }

    buyAlly() {
        game.data.currency -= this.allyCost;
    }
    
    sellAlly() {
        game.data.currency += Math.floor(this.allyCost/2);
    }
};

export default AllyEntity;
