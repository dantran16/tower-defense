import * as me from 'melonjs';
import Enemy from "./enemy";
import applicationState from '../../applicationState';


class Sushi extends Enemy{
    constructor(x, y){
        // Properties for Sushi
        super(x, y, {image: "white-dot", width: 25, height: 25});
        this.health = 10;
        this.speed = 1;
        this.reward = 10;
        // Set the velocity for movement
        this.body.setMaxVelocity(0, 0); // Movement speed in x and y directions
        this.changeX = -this.speed * 2
        this.changeY = -this.speed * 2
    }
}

export default Sushi;
//TODO Possibly add element/type