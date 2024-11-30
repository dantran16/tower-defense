import * as me from 'melonjs';
import applicationState from '../../applicationState';
import HitBoxEntity from './HitBoxEntity';
import TowerBounds from './TowerBounds.js';

class AllyEntity extends me.Entity {

    constructor(x, y, settings) {
        // call the parent constructor
        super(x, y, settings);

        // set a "player object" type
        this.body.collisionType = me.collision.types.NONE;
        this.body.ignoreGravity = true;
        this.anchorPoint.set(0.5,0.5)
        // set hitbox
        this.hitbox = null;
        this.chair = null;
        this.center = 25

        // set default stats of ally unit
        this.tier = 1;
        this.allyCost = 0;
        this.allyATK = 0;
        this.allyASPD = 0;
        this.allyRange = 0;
        this.sold = false;
        this.value = 0
        this.indeces = null;
        this.selected = false;

        // Create bounds for onclick method
        this.bounding = new TowerBounds(x + 13, y + 25, {width: 32, height: 32}, this)
        me.game.world.addChild(this.bounding)
        
        // play sound cue any time an ally is created
        me.audio.play("place-chair")
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

    sell(){
        if(this.hitbox != null){
            me.game.world.removeChild(this.hitbox)
        }
        me.game.world.removeChild(this.bounding)
        me.game.world.removeChild(this.chair);
        me.game.world.removeChild(this);
        applicationState.data.currency += Math.round(this.allyCost / 2)
        applicationState.validMatrix[this.indeces.x][this.indeces.y] = 0
    }

    upgradeTier() {
        if (this.tier < 3 && applicationState.data.currency >= this.upgradeCost) {
            this.value += this.upgradeCost
            applicationState.data.currency -= this.upgradeCost
            this.tier++
            this.updateAllyStats()
            this.updateHitbox()
        }
    }

    updateHitbox(){
        if(this.hitbox != null){
            me.game.world.removeChild(this.hitbox);
        }
        this.hitbox = new HitBoxEntity(this.pos.x + this.center/2, this.pos.y + this.center * 2, {width: this.allyRange, height: this.allyRange}, this);
        me.game.world.addChild(this.hitbox, 5);
    }

    onDestroyEvent() {
        me.input.releasePointerEvent("pointerdown", this);
    }
};

export default AllyEntity;
