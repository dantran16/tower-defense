import * as me from 'melonjs';
import game from '../../applicationState.js';
import HitBoxEntity from './hitbox.js';

class AllyEntity extends me.Entity {

    constructor(x, y, settings) {
        // call the parent constructor
        super(x, y, settings);
        
        // set a "player object" type
        this.body.collisionType = me.collision.types.PLAYER_OBJECT;
        
        // set hitbox
        this.hitbox = null;

        // set default stats of ally unit
        this.tier = 1;
        this.allyCost = 0;
        this.allyATK = 0;
        this.allyASPD = 0;
        this.allyRange = 0;
    }

    buyAlly() {
        if (game.data.currency >= this.allyCost) {
            game.data.currency -= this.allyCost;
            return true;
        }
        return false;
    }
    
    sellAlly() {
        game.data.currency += Math.floor(this.allyCost/2);
    }
};

export default AllyEntity;
