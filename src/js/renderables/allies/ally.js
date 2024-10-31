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
        me.input.registerPointerEvent("pointerdown", this, this.onClick.bind(this));
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

    onClick(){
    }

    onDestroyEvent() {
        me.input.releasePointerEvent("pointerdown", this);
    }
};

export default AllyEntity;
