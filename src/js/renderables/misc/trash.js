import * as me from "melonjs";

class TrashCan extends me.Sprite {
    // super constructor that creates a trash can
    constructor(x, y) {
        super(x, y, {
            image: me.loader.getImage('trash'),
            anchorPoint : new me.Vector2d(0.5, 0.5)
        });

        this.scale(0.22)

    }

}


export default TrashCan;