import * as me from 'melonjs';
import ChildEntity from './child.js';
import AdultEntity from './adult.js';
import FoodieEntity from './foodie.js';

class AllyTasks {

    createAlly(name, x, y) {
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
    }
    
    destroyAlly() {
        // me.game.world.removeChild(mainObject);
        // make sure currency increases using ally class methods
        return True
    }

}

export default AllyTasks;
