import { UITextButton, state } from "melonjs";
import { params } from "../params";

class PlayButton extends UITextButton {
    constructor(x,y) {
        super(x,y, {
            font: 'PressStart2P',
            text: 'Play',
            backgroundColor: '#00aa0080',
            hoverColor: '#00ff00ff',
            textAlign: 'center',
            size: 1,
            borderHeight: params.buttonBorderSize,
            borderWidth: params.buttonBorderSize * 2 
        });
    }

    onClick(){
        state.change(state.PLAY);
    }
}

export default PlayButton;