import * as me from "melonjs";
import { params } from "../params";
import applicationState from "../applicationState";
import PauseButton from "./PauseButton";

class ResumeButton extends me.UITextButton {
    constructor(x,y) {
        super(x,y, {
            font: 'PressStart2P',
            text: "|>",
            backgroundColor: '#00aa0080',
            hoverColor: '#00ff00ff',
            textAlign: 'center',
            size: params.resumeButton.size,
            borderHeight: params.resumeButton.borderSize,
            borderWidth: params.resumeButton.borderSize * 2
        });
    }

    onClick(){
        applicationState.isPaused = false
        this.ancestor.addChild(new PauseButton(this.pos.x, this.pos.y))
        this.ancestor.removeChild(this)
    }
}

export default ResumeButton;