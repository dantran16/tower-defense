import { UITextButton, state } from "melonjs";
import { params } from "../params";

class TowerButton extends UITextButton {
    constructor(x,y, label) {
        super(x,y, {
            font: 'PressStart2P',
            text: label,
            backgroundColor: '#00aa0080',
            hoverColor: '#00ff00ff',
            textAlign: 'center',
            size: params.towerButton.size,
            borderHeight: params.towerButton.borderSize,
            borderWidth: params.towerButton.borderSize * 2
        });
    }

    onClick(){
        
    }
}

export default TowerButton;