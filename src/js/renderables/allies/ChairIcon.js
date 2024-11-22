import * as me from "melonjs";
import ChildEntity from './child.js';
import AdultEntity from './adult.js';
import FoodieEntity from './foodie.js';
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
        this.body.collisionType = me.collision.types.NONE;
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
                let indeces = this.getIndeces(this.pos.x+15, this.pos.y);
                if (this.validLocation(indeces.x, indeces.y)) {
                    this.dragging = false;
                    this.isDraggable = false
                    applicationState.creation = false;
                    let res = this.interpolateLocation(this.pos.x+15, this.pos.y)
                    this.pos.x = res.xCoor;
                    this.pos.y = res.yCoor;
                    setTimeout(this.createAlly(res.xCoor, res.yCoor, indeces), 2000);
                    return false
                }
            }
		}
	}

    getIndeces(x, y) {
        let yIndex = Math.floor(x / 32);
        let xIndex = Math.floor(y / 32)-3;
        return {x: xIndex-1, y: yIndex-1}
    }

    validLocation(x, y) {
        if (applicationState.validMatrix[x][y] == 0) {
            applicationState.validMatrix[x][y] = -1;
            return true
        }
        return false
    }

    interpolateLocation(x, y) {
        let coor =  {
            xCoor: Math.floor(x / 32) * 32,
            yCoor: Math.floor(y / 32) * 32
        }
        coor.xCoor -= 1
        coor.yCoor += 9
        
        return coor
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
        super.destroy();
	}

    // Creates a new ally based on tower name
    createAlly(x, y, indeces) {
        switch(this.name) {
            case "child":
                this.ally = new ChildEntity(x, y-30, indeces)
                break;
            case "adult":
                this.ally = new AdultEntity(x, y-25, indeces)
                break;
            case "foodie":
                this.ally = new FoodieEntity(x, y-25, indeces)
                break;
        }
        this.ally.chair = this;
        me.game.world.addChild(this.ally);
    }
};

export default ChairIcon;