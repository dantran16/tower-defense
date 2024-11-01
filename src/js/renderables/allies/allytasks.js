import * as me from 'melonjs';
import ChairIcon from "./ChairIcon";
import applicationState from '../../applicationState';

class AllyTasks {

    // Creates an ally unit if there is enough currency
    createChair(x, y, name) {
        if (applicationState.data.currency >= 10) {
            applicationState.data.currency -= 10;
            let seat = new ChairIcon(x, y, name);
            me.game.world.addChild(seat);
            return true;
        }
        else {
            return false;
        }
    }
    
    destroyAlly() {
        // me.game.world.removeChild(mainObject);
        // make sure currency increases using ally class methods
        return True
    }

}

export default AllyTasks;
