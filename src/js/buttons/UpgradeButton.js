import * as me from "melonjs";
import { params } from "../params";
import applicationState from "../applicationState";
import SideMenuContainer from "../renderables/ui/SideMenuContainer";

class UpgradeButton extends me.UITextButton {
    constructor(x,y, tower) {
        super(x,y, {
            font: 'PressStart2P',
            text: `Upgrade for $${tower.upgradeCost}`,
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
        this.tower.upgradeTier()
    }
}

export default UpgradeButton;