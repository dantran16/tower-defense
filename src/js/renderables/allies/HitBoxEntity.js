import * as me from 'melonjs';

class HitBoxEntity extends me.Entity {

    constructor(x, y, settings, parent) {
        // call the parent constructor
        const radius = (settings.width * 32) + 16
        super(x-radius, y-radius, settings);
        this.range = radius;
        this.body.ignoreGravity = true;
        this.body.collisionType = me.collision.types.PLAYER_OBJECT;
        this.body.setCollisionMask(me.collision.types.ENEMY_OBJECT);
        this.body.addShape(new me.Ellipse(this.range-2, this.range-2, this.range*2-8, this.range*2-8));        this.parent = parent;
        this.parent = parent;
        this.secondCount = 0;
        this.ready = true
        // console.log(x, y)
        // console.log(this.getBounds())

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
            renderer.fillEllipse(45, 45, this.range, this.range);
        } else if(this.parent.className == 'Adult'){
            renderer.fillEllipse(80, 80, this.range, this.range);
        } else{
            renderer.fillEllipse(65, 65, this.range, this.range);
        }
    }

    onCollision(response, other) {
        // console.log("this", this.getBounds())
        // console.log("sushi", other.getBounds())
        // console.log(this.getBounds().contains(other.getBounds().x+8, other.getBounds().y+8))
        if (!this.getBounds().contains(other.getBounds().x, other.getBounds().y)) {
            return false;
        }

        if ((other.body.collisionType === me.collision.types.ENEMY_OBJECT) && this.ready) {
            console.log("hit")
            this.ready = false;
            this.secondCount = 0;
            other.takeDamage(this.parent.allyATK);
        }
        return false;
    }
};

export default HitBoxEntity;
