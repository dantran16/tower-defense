import Enemy from "./enemy";

class RedVelvet extends Enemy{
    constructor(x, y, lane){
        // Properties for Red Velevet
        super(x, y, {image: "red-velvet", width: 16, height: 16}, lane);
        this.health = 30;
        this.speed = 1.5;
        this.reward = 10;
        this.penalty = 5;
        // Set the velocity for movement
        this.body.setMaxVelocity(0, 0); // Movement speed in x and y directions
        this.changeX = -this.speed * 2
        this.changeY = -this.speed * 2
    }
}

export default RedVelvet