import * as me from "melonjs";

class ConveyorBelt extends me.Entity {

    constructor(x, y, settings) {
        // call the super constructor and select an image based on name
        super(x, y, settings);
        this.settings = settings
        // Initialize properties for chair's physical body
        this.body.collisionType = me.collision.types.WORLD_SHAPE;
        this.body.setCollisionMask(me.collision.types.ACTION_OBJECT);
        this.rectangle = new me.Rect(0, 0, settings.width, settings.length)
        this.body.addShape(this.rectangle)
        this.body.ignoreGravity = true;
    }

    // draw(renderer) {
    //     renderer.setColor(`rgba(255, 255, 0, 0.3)`);
    //     renderer.fillRect(0, 0, this.settings.width, this.settings.height);
    // }
}

export default ConveyorBelt;