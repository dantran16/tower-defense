import * as me from 'melonjs';
import applicationState from '../../applicationState';
import TowerMenuContainer from '../ui/TowerMenuContainer';

class TowerBounds extends me.Entity {

    constructor(x, y, settings, parent) {
        // call the parent constructor
        super(x-16, y+16, settings);
        this.body.collisionType = me.collision.types.NONE;
        this.body.ignoreGravity = true;
        this.body.addShape(new me.Rect(0, 0, 32, 32))
        this.parent = parent
        me.input.registerPointerEvent("pointerdown", this, (e) => this.onClick(e));
    }

    // draw(renderer) {
    //     // Set the fill style color
    //     renderer.setColor(`rgba(255, 255, 255, 1)`);
    //     // Draw the hitbox area
    //     renderer.fillRect(0, 0, 32, 32);
    // }


    onClick(e){
        if (applicationState.creation) {
            return true
        }
        var world = me.game.world;
        var width = me.game.viewport.width;
        var height = me.game.viewport.height;
        if(!applicationState.towerMenu){
            this.parent.selected = true;
            applicationState.towerMenu = new TowerMenuContainer(width * 5/6, 0, width / 6, height, this.parent);
            world.addChild(applicationState.towerMenu, 100)
        } else if (applicationState.towerMenu !== this.parent) {
            this.parent.selected = true;
            world.removeChild(applicationState.towerMenu)
            applicationState.towerMenu = new TowerMenuContainer(width * 5/6, 0, width / 6, height, this.parent);
            world.addChild(applicationState.towerMenu, 100)
            
        } else {
            this.parent.selected = false
            world.removeChild(applicationState.towerMenu)
            applicationState.towerMenu = null
        }
        return false
    }

    onDestroyEvent() {
        me.input.releasePointerEvent("pointerdown", this);
    }
};

export default TowerBounds;