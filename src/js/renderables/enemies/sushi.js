import * as me from 'melonjs';
import Enemy from "./enemy";
import applicationState from '../../applicationState';


class Sushi extends Enemy{
    constructor(x, y){
        // Properties for Sushi
        const settings = { width: 32, height: 32, image: 'sushi' };
        const health = 10;
        const speed = 4;
        const reward = 10;
        super (x, y, settings, health, speed, reward);
    }
    // Get method for Sushi stats
    getEnemyStats() {
        return{
            health: this.health,
            speed: this.speed,
            reward: this.reward,

        }
    }
}

export default Sushi;
//TODO Possibly add element/type