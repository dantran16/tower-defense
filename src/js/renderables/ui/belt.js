import * as me from "melonjs";

class ConveyorBelt extends me.Entity {

    constructor() {
        // call the super constructor and select an image based on name
        super(176, 187, {
            width: 1,
            height: 1
        });

        // Initialize properties for chair's physical body
        this.body = new me.Body(this);
        this.body.collisionType = me.collision.types.WORLD_SHAPE;
        this.body.setCollisionMask(me.collision.types.ACTION_OBJECT);
        this.polygon = new me.Polygon(0, 0, [
            {x: 0, y: 0},
            {x: 384, y: 0},
            {x: 384, y: 352},
            {x: 384+224, y: 352},
            {x: 384+224, y: 0},
            {x: 384+224+64, y: 0},
            {x: 384+224+64, y: 416},
            {x: 384-64, y: 416},
            {x: 384-64, y: 64},
            {x: 64, y: 64},
            {x: 64, y: 512},
            {x: 0, y: 512},
        ])
        this.body.addShape(this.polygon);
        this.body.ignoreGravity = true;
    }

    draw(renderer) {
        // Set the fill style color
        renderer.setColor(`rgba(255, 0, 0, 0.3)`);
        // Draw the hitbox area
        renderer.fillPolygon(this.polygon);
    }
}

export default ConveyorBelt;