// responsible for starting the wave
import { UITextButton, state } from "melonjs";
import { params } from "../params";
import EnemyTasks from "../renderables/enemies/EnemyTasks";

class WaveButton extends UITextButton {
    constructor(x,y) {
        super(x,y, {
            font: 'PressStart2P',
            text: "Begin Wave",
            backgroundColor: '#00aa0080',
            hoverColor: '#00ff00ff',
            textAlign: 'center',
            size: params.pauseButton.size,
            borderHeight: params.pauseButton.borderSize,
            borderWidth: params.pauseButton.borderSize * 2
        });
    }

    // button click will spawn wave no matter what
    // TODO: need to add check or something to only spawn 1 wave at a time
    onClick(){
        const newWave = new EnemyTasks()
        newWave.startWave()
    }
}

export default WaveButton;