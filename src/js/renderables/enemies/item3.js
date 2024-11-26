import Enemy from "./enemy";

class Item3 extends Enemy{
    constructor(x, y, lane){
        // Properties for Sushi
        super(x, y, {image: "sushi", width: 16, height: 16}, lane);
        this.health = 125;
        this.speed = 2;
        this.reward = 15;
        this.penalty = 10;
        // Set the velocity for movement
        this.body.setMaxVelocity(0, 0); // Movement speed in x and y directions
        this.changeX = -this.speed * 2
        this.changeY = -this.speed * 2
    }
}

export default Item3;