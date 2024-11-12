import * as me from "melonjs";
import { params } from "../params";
import applicationState from "../applicationState";

class PauseButton extends me.UITextButton {
    constructor(x,y) {
        super(x,y, {
            font: 'PressStart2P',
            text: `${!applicationState.isPaused ? '||' : '|>'}`,
            backgroundColor: '#00aa0080',
            hoverColor: '#00ff00ff',
            textAlign: 'center',
            size: params.pauseButton.size,
            borderHeight: params.pauseButton.borderSize,
            borderWidth: params.pauseButton.borderSize * 2
        });
    }

    onClick(){
        if (!applicationState.isPaused) {
            applicationState.isPaused = true
            // not sure what this does below
            this.ancestor.addChild(new PauseButton(this.pos.x, this.pos.y))
            this.ancestor.removeChild(this)
        }
        else {
            applicationState.isPaused = false
        }
    }
}

export default PauseButton;