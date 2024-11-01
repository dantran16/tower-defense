import * as me from 'melonjs';

class AllyEntity extends me.Entity {

    constructor(x, y, settings) {
        // call the parent constructor
        super(x, y, settings);
        
        // set a "player object" type
        this.body.collisionType = me.collision.types.PLAYER_OBJECT;
        this.body.setCollisionMask(me.collision.types.WORLD_SHAPE);
        this.body.ignoreGravity = true;
        
        // set hitbox
        this.hitbox = null;

        // set default stats of ally unit
        this.tier = 1;
        this.allyCost = 0;
        this.allyATK = 0;
        this.allyASPD = 0;
        this.allyRange = 0;
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
};

export default AllyEntity;
