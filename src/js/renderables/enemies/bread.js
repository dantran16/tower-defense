import Enemy from "./enemy";

class Bread extends Enemy{
    constructor(x, y, lane){
        // Properties for Sushi
        super(x, y, {image: "bread", width: 16, height: 16}, lane);
        this.health = 200;
        this.speed = 1;
        this.reward = 10;
        this.penalty = 15;
        // Set the velocity for movement
        this.body.setMaxVelocity(0, 0); // Movement speed in x and y directions
        this.changeX = -this.speed * 2
        this.changeY = -this.speed * 2

        // Allow biting
        this.fullhp = this.health;
        this.bite = "bread-bite"
    }
}

export default Bread;