import Enemy from "./enemy";

class RedVelvet extends Enemy{
    constructor(x, y, lane){
        // Properties for Red Velevet
        super(x, y, {image: "red-velvet", width: 16, height: 16}, lane);
        this.health = 50;
        this.speed = 3;
        this.reward = 50;
        // Set the velocity for movement
        this.body.setMaxVelocity(0, 0); // Movement speed in x and y directions
        this.changeX = -this.speed * 2
        this.changeY = -this.speed * 2
    }
}

export default RedVelvet
//TODO Possibly add element/type