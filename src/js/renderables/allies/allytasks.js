import * as me from 'melonjs';
import applicationState from '../../applicationState.js';
import ChildEntity from 'child.js';
import AdultEntity from 'adult.js';
import FoodieEntity from 'foodie.js';

class SpawnAllies extends me.Entity {

    constructor(x, y, settings) {
        // call the parent constructor
        super(x, y , settings);

        // Use this file to handle space indicators (whether ally unit position interferes with the path or goes off the map)
        // Also handle the spawning of a new ally unit when "buy" button is pressed
        // Also handle the removal of an existing ally unit when "sell" button is pressed
    }

    update(dt) {
        // update ally unit per frame
        return super.update(dt);
    }

    createAlly() {
        // me.game.world.addChild(mainObject);
        // make sure currency decreases using ally class methods
        // make sure player has enough currency to buy desired unit
        return True
    }
    
    destroyAlly() {
        // me.game.world.removeChild(mainObject);
        // make sure currency increases using ally class methods
        return True
    }

    onCollision(response, other) {
        // if ally unit interferes with path or goes off the screen
        return True
};

}

export default SpawnAllies;
