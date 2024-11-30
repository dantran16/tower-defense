import Enemy from "./enemy";
import * as me from 'melonjs';

class Sushi extends Enemy{
    constructor(x, y, lane){
        // Properties for Sushi
        super(x, y, {width: 16, height: 16}, lane);

        this.renderable = new me.Sprite(0, 0, {
            anchorPoint: new me.Vector2d(),
            image: "sushi",   // Image source (16x16 in this case)
        });
        // console.log(this.body.getBounds())
        // console.log(this.getBounds())

        this.health = 15;
        this.speed = 1;
        this.reward = 5;
        this.penalty = 8;

        // Set the velocity for movement
        this.body.setMaxVelocity(0, 0); // Movement speed in x and y directions
        this.changeX = -this.speed * 2
        this.changeY = -this.speed * 2

        // Allow biting
        this.fullhp = this.health;
        this.bite = "sushi-bite"
    }
}

export default Sushi;