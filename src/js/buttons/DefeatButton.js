import { UITextButton, state } from "melonjs";
import { params } from "../params";

class DefeatButton extends UITextButton {
    constructor(x,y) {
        super(x,y, {
            font: 'PressStart2P',
            text: "death",
            backgroundColor: '#00aa0080',
            hoverColor: '#00ff00ff',
            textAlign: 'center',
            size: params.pauseButton.size,
            borderHeight: params.pauseButton.borderSize,
            borderWidth: params.pauseButton.borderSize * 2
        });
    }

    onClick(){
        state.change(state.GAMEOVER);
    }
}

export default DefeatButton;