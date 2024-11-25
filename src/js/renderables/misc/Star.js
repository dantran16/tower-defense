import * as me from "melonjs";

class Star extends me.Sprite {
    // super constructor that creates a star
    constructor(x, y) {
        super(x, y, {
            image: me.loader.getImage('star'),
            framewidth: 32,
            frameheight: 32,
            anchorPoint : new me.Vector2d(0.5, 0.5)
        });

        this.scale(0.6)
    }

}


export default Star;