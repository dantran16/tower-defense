import * as me from "melonjs";

class GoldCoin extends me.Sprite {
    // super constructor that creates a spinning gold coin icon
    constructor(x, y) {
        super(x, y, {
            image: me.loader.getImage('gold-coin'),
            framewidth: 16,
            frameheight: 16,
            anchorPoint : new me.Vector2d(0.5, 0.5)
        });

    }

}


export default GoldCoin;