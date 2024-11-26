import { UITextButton, state } from "melonjs";
import { params } from "../params";

class MenuButton extends UITextButton {
    constructor(x,y) {
        super(x,y, {
            font: 'PressStart2P',
            text: 'Play Again',
            backgroundColor: '#00aa0080',
            hoverColor: '#00ff00ff',
            textAlign: 'center',
            size: 1,
            borderHeight: params.playButton.borderSize,
            borderWidth: params.playButton.borderSize * 3
        });
    }

    onClick(){
        state.change(state.MENU);
    }
}

export default MenuButton;