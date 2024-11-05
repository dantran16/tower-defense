import * as me from 'melonjs';
import Enemy from "./enemy";
import applicationState from '../../applicationState';


class Coffee extends Enemy{
    constructor(x, y){
        // Properties for Coffee
        super(x, y, {image: "red-dot", width: 25, height: 25});
        this.health = 100;
        this.speed = 1;
        this.reward = 100;
        // Set the velocity for movement
        this.body.setMaxVelocity(this.speed, this.speed); // Movement speed in x and y directions
       
    }
}

export default Coffee;
//TODO Possibly add element/type