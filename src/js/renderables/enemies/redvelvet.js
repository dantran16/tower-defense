import * as me from 'melonjs';
import Enemy from "./enemy";
import applicationState from '../../applicationState';


class RedVelvet extends Enemy{
    constructor(x, y){
        // Properties for Red Velevet
        const settings = { width: 32, height: 32, image: 'redvelvet' };
        const health = 75;
        const speed = 50;
        const reward = 50;
        super (x, y, settings, health, speed, reward);
    }
    // Get method for Red Velvet stats
    getEnemyStats() {
        return{
            health: this.health,
            speed: this.speed,
            reward: this.reward,

        }
    }
}

export default RedVelvet
//TODO Possibly add element/type