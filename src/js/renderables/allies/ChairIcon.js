import * as me from "melonjs";
import ChildEntity from './child.js';
import AdultEntity from './adult.js';
import FoodieEntity from './foodie.js';
import InvisChair from './InvisChair.js';
import applicationState from "../../applicationState.js";

class ChairIcon extends me.Sprite {

    constructor(x, y, name) {
        // call the super constructor and select an image based on name
        let settings = {
            image: (function(){
                switch(name) {
                    case "child":
                        return "beige-chair"
                    case "adult":
                        return "yellow-chair"
                    case "foodie":
                        return "brown-chair"
                }
            })(),
            framewidth: 28, 
            frameheight: 28, 
            anchorPoint : new me.Vector2d(0.5, 0.5)
        };
        super(x, y, settings);

        // Initialize properties for chair's physical body
        this.name = name;
        this.body = new me.Body(this);
        this.body.addShape(new me.Rect(0, 0, settings.framewidth, settings.frameheight));
        this.body.collisionType = me.collision.types.ACTION_OBJECT;
        this.body.setCollisionMask(me.collision.types.WORLD_SHAPE);
        this.body.ignoreGravity = true;
        this.colliding = false;
        this.collisionXY = null;

        // Initialize parameters to allow drag
        this.dragging = true;
        this.isDraggable = true;
        this.grabOffset = new me.Vector2d(0, 0);

        this.invisChair = null;
        applicationState.creation = true;

        // Create event listener
        me.input.registerPointerEvent("pointerdown", this, (e) => this.dragEnd(e));
    }

    // Update the sprite position based on the cursor
    update(dt) {
        super.update(dt);
        if (this.dragging && this.isDraggable) {
            this.pos.x += (me.input.pointer.gameX - this.pos.x)
            this.pos.y += (me.input.pointer.gameY - this.pos.y)
            if (this.collisionXY != (this.pos.x, this.pos.y)) {
                this.colliding = false
                this.collisionXY = null;
            }
        }
        return true
    }

    // Places the chair at the cursor, disables movement and creates an ally unit
	dragEnd(e) {
        // Add a check to determine if it is a valid location
		if (this.dragging && !this.colliding) {
            if (this.pos.x >=14 && this.pos.x <=1000 && this.pos.y >= 122 && this.pos.y <= 700) {
                this.dragging = false;
                this.isDraggable = false
                this.body.collisionType = me.collision.types.NONE;
                this.body.setCollisionMask(me.collision.types.NONE);
                applicationState.creation = false;
                setTimeout(this.createAlly(), 2000);
                return false
            }
		}
	}

    onCollision(response, other) {
        console.log("hit")
        if ((other.body.collisionType === me.collision.types.WORLD_SHAPE)) {
            this.colliding = true
            this.collisionXY = (this.pos.x, this.pos.y)
    }
    return false;
    }

    // Removes this icon from the game
	destroy() {
		me.input.releasePointerEvent("pointerdown", this);
        me.game.world.removeChild(this.invisChair);
        super.destroy();
	}

    // Creates a new ally based on tower name
    createAlly() {
        switch(this.name) {
            case "child":
                this.ally = new ChildEntity(this.pos.x, this.pos.y-30)
                break;
            case "adult":
                this.ally = new AdultEntity(this.pos.x, this.pos.y-25)
                break;
            case "foodie":
                this.ally = new FoodieEntity(this.pos.x, this.pos.y-25)
                break;
        }
        this.invisChair = new InvisChair(this.pos.x, this.pos.y-50)
        this.ally.chair = this;
        me.game.world.addChild(this.ally);
        me.game.world.addChild(this.invisChair);
    }
};

export default ChairIcon;