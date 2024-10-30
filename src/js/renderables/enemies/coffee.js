import * as me from 'melonjs';
import Enemy from "./enemy";
import applicationState from '../../applicationState';


class Coffee extends Enemy{
    constructor(x, y){
        // Properties for Coffee
        const settings = { width: 32, height: 32, image: 'red-dot' };
        const health = 100;
        const speed = 5;
        const reward = 100;
        super (x, y, settings, health, speed, reward);
    }
    // Get method for Coffee stats
    getEnemyStats() {
        return{
            health: this.health,
            speed: this.speed,
            reward: this.reward,

        }
    }
}

export default Coffee;
//TODO Possibly add element/type