import Enemy from "./enemy";
import * as me from 'melonjs';

class Egg extends Enemy{
    constructor(x, y, lane){
        // Properties for Sushi
        super(x, y, { width: 16, height: 16}, lane);

        this.renderable = new me.Sprite(0, 0, {
            anchorPoint: new me.Vector2d(),
            image: "egg",   // Image source (16x16 in this case)
        });
        this.health = 200;
        this.speed = 2.5;
        this.reward = 5;
        this.penalty = 15;
        // Set the velocity for movement
        this.body.setMaxVelocity(0, 0); // Movement speed in x and y directions
        this.changeX = -this.speed * 2
        this.changeY = -this.speed * 2

        // Allow biting
        this.fullhp = this.health;
        this.bite = "egg-bite"
    }
}

export default Egg;