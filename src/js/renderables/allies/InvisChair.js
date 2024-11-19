import * as me from "melonjs";

class InvisChair extends me.Entity {

    constructor(x, y) {
        // call the super constructor and select an image based on name
        super(x, y, {
            width: 28, 
            height: 100, 
        });

        // Initialize properties for chair's physical body
        this.body = new me.Body(this);
        this.body.addShape(new me.Rect(0, 0, this.width, this.height));
        this.body.collisionType = me.collision.types.WORLD_SHAPE;
        this.body.setCollisionMask(me.collision.types.ACTION_OBJECT);
        this.body.ignoreGravity = true;
    }
}

export default InvisChair;