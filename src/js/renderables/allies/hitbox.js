import * as me from 'melonjs';

class HitBoxEntity extends me.Renderable {

    constructor(x, y, size) {
        // call the parent constructor
        super(x, y, size, size);
        this.body = new me.Body(this);
        this.body.ignoreGravity = true;
        this.Xpos = x;
        this.Ypos = y;
        this.updateHitBox(size);
        this.body.collisionType = me.collision.types.PLAYER_OBJECT;
    }

    updateHitBox(response) {
        this.range = response;
        this.body.addShape(new me.Ellipse(this.Xpos, this.Ypos, this.width * this.range, this.height * this.range));
    }

    onCollision(response, other) {
        if (other.body.collisionType === me.collision.types.ENEMY_OBJECT) {
            //other.takeDMG(this.unit[allyATK])
        }
        return false;
    }
};

export default HitBoxEntity;
