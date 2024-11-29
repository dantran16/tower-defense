import * as me from 'melonjs';

class HitBoxEntity extends me.Entity {

    constructor(x, y, settings, parent) {
        // call the parent constructor
        super(x, y, settings);
        this.body.ignoreGravity = true;
        this.range = (settings.width * 32) + 16;
        this.anchorPoint.set(0.5, 0.5);
        this.body.removeShape(this.body.shapes[0])
        this.body.collisionType = me.collision.types.PLAYER_OBJECT;
        this.body.setCollisionMask(me.collision.types.ENEMY_OBJECT);
        this.body.addShape(new me.Ellipse(0, 0, this.range*2, this.range*2));
        this.parent = parent;
        this.secondCount = 0;
        this.ready = true
    }
    update(dt) {
        // update is called 60 times per second
        // Converts ASPD from att/sec to sec/att
        if ((this.secondCount / 60 >= (1/this.parent.allyASPD)) && (!this.ready)){
            this.ready = true;
        }
        this.secondCount++
        super.update(dt);
    }

    draw(renderer) {
        // Set the fill style color
        renderer.setColor(`rgba(255, 0, 0, 0.3)`);
        // Draw the hitbox area

        if(this.parent.className == 'Child'){
            renderer.fillEllipse(90, 90, this.range, this.range);
        } else if(this.parent.className == 'Adult'){
            renderer.fillEllipse(160, 160, this.range, this.range);
        } else{
            renderer.fillEllipse(130, 130, this.range, this.range);
        }
    }

    onCollision(response, other) {
        if ((other.body.collisionType === me.collision.types.ENEMY_OBJECT) && this.ready) {
            this.ready = false;
            this.secondCount = 0;
            other.takeDamage(this.parent.allyATK);
        }
        return false;
    }
};

export default HitBoxEntity;
