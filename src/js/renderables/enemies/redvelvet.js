import * as me from 'melonjs';
import Enemy from "./enemy";
import applicationState from '../../applicationState';


class RedVelvet extends Enemy{
    constructor(x, y){
        // Properties for Red Velevet
        super(x, y, {image: "red-dot", width: 25, height: 25});
        this.health = 50;
        this.speed = 3;
        this.reward = 50;
        // Set the velocity for movement
        this.body.setMaxVelocity(this.speed, this.speed); // Movement speed in x and y directions
    }
}

export default RedVelvet
//TODO Possibly add element/type