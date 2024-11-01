import * as me from 'melonjs';
import ChildEntity from './child.js';
import AdultEntity from './adult.js';
import FoodieEntity from './foodie.js';

// temporary test
import EnemyTasks from '../enemies/EnemyTasks.js';
import Enemy from '../enemies/enemy.js';

class AllyTasks {

    createAlly(name, x, y) {
        // Create new ally unit based on the name of the tower
        let temp = null;
        if (name == "Child") {
            temp = new ChildEntity(x, y)
        }
        else if (name == "Adult") {
            temp = new AdultEntity(x, y)
        }
        else if (name == "Foodie") {
            temp = new FoodieEntity(x, y)
        }

        me.game.world.addChild(temp);

        // temporary test
        const enemy = new EnemyTasks();
        enemy.sendWave();
    }
    
    destroyAlly() {
        // me.game.world.removeChild(mainObject);
        // make sure currency increases using ally class methods
        return True
    }

}

export default AllyTasks;
