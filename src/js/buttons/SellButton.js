import * as me from "melonjs";
import { params } from "../params";
import applicationState from "../applicationState";
import SideMenuContainer from "../renderables/ui/SideMenuContainer";

class SellButton extends me.UITextButton {
    constructor(x,y, tower) {
        super(x,y, {
            font: 'PressStart2P',
            text: `Sell for $${tower.allyCost / 2}`,
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
        applicationState.isTowerMenu = false
        const panel = new SideMenuContainer(me.game.viewport.width * 5/6, 0, me.game.viewport.width / 6, me.game.viewport.height);
        me.game.world.addChild(panel, 100)
    }
}

export default SellButton;