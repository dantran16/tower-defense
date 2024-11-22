import * as me from 'melonjs';
import ChairIcon from "./ChairIcon";
import applicationState from '../../applicationState';
import { params } from '../../params';

const { towerCost } = params;

class AllyTasks {

    // Creates an ally unit if there is enough currency
    createChair(x, y, name) {
        if (applicationState.data.currency >= towerCost[name]) {
            applicationState.data.currency -= towerCost[name];
            let seat = new ChairIcon(x, y, name);
            me.game.world.addChild(seat, 6);
            return true;
        }
        else {
            return false;
        }
    }

}

export default AllyTasks;
