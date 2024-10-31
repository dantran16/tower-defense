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
        var temp = new Coffee(760, 145)
        me.game.world.addChild(temp)
    }
}

export default EnemyTasks;