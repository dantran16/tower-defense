import * as me from 'melonjs';
import TowerMenuContainer from '../ui/TowerMenuContainer';
import SideMenuContainer from '../ui/SideMenuContainer';
import applicationState from '../../applicationState';
import HitBoxEntity from './HitBoxEntity';

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
        this.chair = null;

        // set default stats of ally unit
        this.tier = 1;
        this.allyCost = 0;
        this.allyATK = 0;
        this.allyASPD = 0;
        this.allyRange = 0;
        this.sold = false;
        this.value = 0
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

    sell(){
        if(this.hitbox != null){
            me.game.world.removeChild(this.hitbox)
        }
        me.game.world.removeChild(this.chair);
        me.game.world.removeChild(this);
        applicationState.data.currency += Math.round(this.allyCost / 2)
    }

    onClick(e){
        var world = me.game.world;
        var width = me.game.viewport.width;
        var height = me.game.viewport.height;
        
        if(!applicationState.isTowerMenu){
            applicationState.isTowerMenu = true
            const towerMenu = new TowerMenuContainer(width * 5/6, 0, width / 6, height, this);
            world.addChild(towerMenu, 100)
        } else {
            if(world.getChildByName('TowerMenu')[0].tower !== this){
                world.removeChild(world.getChildByName('TowerMenu')[0])
                const towerMenu = new TowerMenuContainer(width * 5/6, 0, width / 6, height, this);
                world.addChild(towerMenu, 100)
                return
            }
            applicationState.isTowerMenu = false
            const panel = new SideMenuContainer(width * 5/6, 0, width / 6, height);
            world.addChild(panel, 100)
        }
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
        this.ancestor.removeChild(this.hitbox);
        this.hitbox = new HitBoxEntity(this.pos.x, this.pos.y, {width: this.allyRange, height: this.allyRange}, this);
        me.game.world.addChild(this.hitbox);
    }

    onDestroyEvent() {
        me.input.releasePointerEvent("pointerdown", this);
    }
};

export default AllyEntity;
