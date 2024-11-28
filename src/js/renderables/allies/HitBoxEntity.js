import * as me from 'melonjs';

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
        this.secondCount = 0;
        this.ready = true;
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
        renderer.fillEllipse(0, 0, this.range, this.range);
    }

    onCollision(response, other) {
        if ((other.body.collisionType === me.collision.types.ENEMY_OBJECT) && this.ready) {
            this.ready = false;
            this.secondCount = 0;
            other.takeDamage(this.parent.allyATK);
            me.audio.play("chomp", false, null, 0.3)
            this.parent.attackAnimation();
        }
        return false;
    }
};

export default HitBoxEntity;
