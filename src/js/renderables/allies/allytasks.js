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
            temp = new ChildEntity(x, y, {image: "white-dot", width: 25, height: 25})
        }
        else if (name == "Adult") {
            temp = new AdultEntity(x, y, {image: "gray-dot", width: 25, height: 25})
        }
        else if (name == "Foodie") {
            temp = new FoodieEntity(x, y, {image: "black-dot", width: 25, height: 25})
        }

        me.game.world.addChild(temp);

        // temporary test
        const enemy = new EnemyTasks();
        console.log(enemy)
        enemy.sendWave();
    }
    
    destroyAlly() {
        // me.game.world.removeChild(mainObject);
        // make sure currency increases using ally class methods
        return True
    }

}

export default AllyTasks;
