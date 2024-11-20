import * as me from "melonjs";

class UpgradeButton extends me.UITextButton {
    constructor(x,y, tower) {
        super(x,y, {
            font: 'PressStart2P',
            text: `Upgrade for $${tower.upgradeCost}`,
            backgroundColor: '#00aa0080',
            hoverColor: '#00ff00ff',
            textAlign: 'center',
            wordWrapWidth: 140,
            lineHeight: 3,
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