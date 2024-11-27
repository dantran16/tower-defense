import Enemy from "./enemy";

class Coffee extends Enemy{
    constructor(x, y, lane){
        // Properties for Coffee
        super(x, y, {image: "coffee", width: 16, height: 16}, lane);
        this.health = 60;
        this.speed = 2;
        this.reward = 10;
        this.penalty = 10;
        // Set the velocity for movement
        this.body.setMaxVelocity(0, 0); // Movement speed in x and y directions
        this.changeX = -this.speed * 2
        this.changeY = -this.speed * 2
       
    }
}

export default Coffee;