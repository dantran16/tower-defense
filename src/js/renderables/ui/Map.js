import * as me from 'melonjs';

class Map extends me.Sprite{
    constructor(x, y){
        super(x, y, {   
            image: me.loader.getImage("map")
        })
    }
}

export default Map;
//TODO Possibly add element/type