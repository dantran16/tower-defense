import * as me from "melonjs";
import { params } from "../params";
import applicationState from "../applicationState";

class SoundButton extends me.UITextButton {
    constructor(x,y) {
        super(x,y, {
            font: 'PressStart2P',
            text: "Sound",
            backgroundColor: '#00aa0080',
            hoverColor: '#00ff00ff',
            textAlign: 'center',
            size: params.soundButton.size,
            borderHeight: params.soundButton.borderSize / 1.3,
            borderWidth: params.soundButton.borderSize * 2
        });
    }
    
    // TODO: figure out how to unpause soundtrack
    onClick(){
        if (!applicationState.pauseMusic) {
            me.audio.pauseTrack();
            applicationState.pauseMusic = true
        }
        else {
            me.audio.resumeTrack()
            applicationState.pauseMusic = false
        }
    }
}

export default SoundButton