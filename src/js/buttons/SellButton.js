import * as me from "melonjs";
import applicationState from "../applicationState";

class SellButton extends me.UITextButton {
    constructor(x,y, tower) {
        super(x,y, {
            font: 'PressStart2P',
            text: `Sell for $${tower.value / 2}`,
            backgroundColor: '#00aa0080',
            hoverColor: '#00ff00ff',
            textAlign: 'center',
            size: .5,
            borderHeight: 75,
            borderWidth: 150
        });
        this.tower = tower
    }

    onClick(){
        this.tower.sell()
        applicationState.towerMenu = null
        me.game.world.removeChild(this.ancestor)
    }
}

export default SellButton;