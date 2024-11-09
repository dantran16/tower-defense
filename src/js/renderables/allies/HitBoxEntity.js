import * as me from 'melonjs';

import applicationState from '../../applicationState';
import { state } from "melonjs";

class HitBoxEntity extends me.Entity {

    constructor(x, y, settings, parent) {
        // call the parent constructor
        super(x, y, settings);
        this.body.ignoreGravity = true;
        this.range = settings.width * 50;
        this.body.collisionType = me.collision.types.PLAYER_OBJECT;
        this.body.setCollisionMask(me.collision.types.ENEMY_OBJECT);
        this.body.addShape(new me.Ellipse(this.range/2, this.range/2, this.range, this.range));
        this.parent = parent;
    }



    draw(renderer) {
        // Set the fill style color
        renderer.setColor(`rgba(255, 0, 0, 0.3)`);
        // Draw the hitbox area
        renderer.fillEllipse(0, 0, this.range, this.range);
    }

    onCollision(response, other) {
        if (other.body.collisionType === me.collision.types.ENEMY_OBJECT) {
            console.log(other.health)
            other.takeDamage(this.parent.allyATK);
            // enemies subtracted is 0.25 because it subtracts 4 at a time. not sure why yet
            // TODO: figure it out :)
            applicationState.data.enemies -= 0.25
            if (applicationState.data.enemies == 0) {
                state.change(state.GAME_END)
            }
        }
        return false;
    }
};

export default HitBoxEntity;
