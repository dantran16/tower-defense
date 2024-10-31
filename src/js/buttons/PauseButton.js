import * as me from "melonjs";
import { params } from "../params";
import applicationState from "../applicationState";
import ResumeButton from "./ResumeButton";

class PauseButton extends me.UITextButton {
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
        applicationState.isPaused = true
        this.ancestor.addChild(new ResumeButton(this.pos.x, this.pos.y))
        this.ancestor.removeChild(this)
    }
}

export default PauseButton;