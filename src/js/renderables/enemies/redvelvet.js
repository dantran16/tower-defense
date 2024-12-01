import Enemy from "./enemy";
import * as me from 'melonjs';

class RedVelvet extends Enemy{
    constructor(x, y, lane){
        // Properties for Red Velevet
        super(x, y, {width: 16, height: 16}, lane);

        this.renderable = new me.Sprite(0, 0, {
            anchorPoint: new me.Vector2d(),
            image: "red-velvet",   // Image source (16x16 in this case)
        });
        this.health = 20;
        this.speed = 1.5;
        this.reward = 10;
        this.penalty = 15;
        // Set the velocity for movement
        this.body.setMaxVelocity(0, 0); // Movement speed in x and y directions
        this.changeX = -this.speed * 2
        this.changeY = -this.speed * 2
        
        // Allow biting
        this.fullhp = this.health;
        this.bite = "red-velvet-bite"
    }
}

export default RedVelvet