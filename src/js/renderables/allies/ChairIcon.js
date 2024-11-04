import * as me from "melonjs";
import ChildEntity from './child.js';
import AdultEntity from './adult.js';
import FoodieEntity from './foodie.js';

// temporary test
import EnemyTasks from '../enemies/EnemyTasks.js';

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
        this.body.addShape(new me.Rect(settings.framewidth/2, settings.frameheight/2, settings.framewidth, settings.frameheight));
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        this.body.ignoreGravity = true;

        // Initialize parameters to allow drag
        this.dragging = true;
        this.isDraggable = true;
        this.grabOffset = new me.Vector2d(0, 0);

        // Create event listener
        me.input.registerPointerEvent("pointerdown", this, (e) => this.dragEnd(e));
    }

    // Update the sprite position based on the cursor
    update(dt) {
        super.update(dt);
        if (this.dragging && this.isDraggable) {
            this.pos.x += (me.input.pointer.gameX - this.pos.x)
            this.pos.y += (me.input.pointer.gameY - this.pos.y)
        }
        return true
    }

    // Places the chair at the cursor, disables movement and creates an ally unit
	dragEnd(e) {
        // Add a check to determine if it is a valid location
		if (this.dragging === true) {
			this.dragging = false;
            this.isDraggable = false
            setTimeout(this.createAlly(), 2000);
            return false
		}
	}

    // Removes this icon from the game
	destroy() {
		me.input.releasePointerEvent("pointerdown", this);
		super.destroy();
	}

    // Creates a new ally based on tower name
    createAlly() {
        switch(this.name) {
            case "child":
                this.ally = new ChildEntity(this.pos.x, this.pos.y)
                break;
            case "adult":
                this.ally = new AdultEntity(this.pos.x, this.pos.y)
                break;
            case "foodie":
                this.ally = new FoodieEntity(this.pos.x, this.pos.y)
                break;
        }

        me.game.world.addChild(this.ally);

        // temporary test
        const enemy = new EnemyTasks();
        enemy.sendWave();
    }
};

export default ChairIcon;