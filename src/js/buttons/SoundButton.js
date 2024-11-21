import * as me from "melonjs";
import { params } from "../params";

class SoundButton extends me.UITextButton {
    constructor(x,y) {
        super(x,y, {
            font: 'PressStart2P',
            text: "Sound",
            backgroundColor: '#00aa0080',
            hoverColor: '#00ff00ff',
            textAlign: 'center',
            size: params.soundButton.size,
            borderHeight: params.soundButton.borderSize,
            borderWidth: params.soundButton.borderSize * 2
        });
    }
    
    // TODO: figure out how to unpause soundtrack
    onClick(){
        me.audio.pauseTrack()
    }
}

export default SoundButton