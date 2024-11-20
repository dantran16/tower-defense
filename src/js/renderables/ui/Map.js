import * as me from 'melonjs';
import applicationState from '../../applicationState';

class Map extends me.UISpriteElement{
    constructor(x, y){
        super(x, y, {   
            image: me.loader.getImage("map")
        })
    }

    onClick() {
        if(applicationState.towerMenu) {
            me.game.world.removeChild(applicationState.towerMenu)
            applicationState.towerMenu = null
        }
        return true
    }
}

export default Map;
//TODO Possibly add element/type