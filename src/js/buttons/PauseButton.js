import { UITextButton } from "melonjs";
import { params } from "../params";

class PauseButton extends UITextButton {
    constructor(x,y) {
        super(x,y, {
            font: 'PressStart2P',
            text: "||",
            backgroundColor: '#00aa0080',
            hoverColor: '#00ff00ff',
            textAlign: 'center',
            size: params.pauseButton.size,
            borderHeight: params.pauseButton.borderSize,
            borderWidth: params.pauseButton.borderSize * 2
        });
    }

    onClick(){
        
    }
}

export default PauseButton;