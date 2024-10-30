import * as me from 'melonjs';
import applicationState from '../../applicationState';
import Enemy from './enemy';
import Coffee from "./coffee.js";
import RedVelvet from './redvelvet.js';
import Sushi from './sushi.js';

class EnemyTasks {
    sendWave() {
        // var level = applicationState.data.level;
        // var wave = applicationState.data.wave;


        var temp = new Coffee(740, 145, {image: "blue-dot", width: 25, height: 25},)
        console.log(temp)
        me.game.world.addChild(temp)
    }
}

export default EnemyTasks;