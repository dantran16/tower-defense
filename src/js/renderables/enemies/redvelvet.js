import * as me from 'melonjs';
import Enemy from "./enemy";
import applicationState from '../../applicationState';


class RedVelvet extends Enemy{
    constructor(x, y){
        // Properties for Red Velevet
        super(x, y, {image: "red-velvet", width: 25, height: 25});
        this.health = 50;
        this.speed = 4.5;
        this.reward = 50;
        // Set the velocity for movement
        this.body.setMaxVelocity(0, 0); // Movement speed in x and y directions
        this.changeX = -this.speed * 2
        this.changeY = -this.speed * 2
    }
}

export default RedVelvet
//TODO Possibly add element/type