// responsible for starting the wave
import { UITextButton, state } from "melonjs";
import { params } from "../params";
import EnemyTasks from "../renderables/enemies/EnemyTasks";
import applicationState from "../applicationState";

class WaveButton extends UITextButton {
    constructor(x,y) {
        super(x,y, {
            font: 'PressStart2P',
            text: "START",
            backgroundColor: '#00aa0080',
            hoverColor: '#00ff00ff',
            textAlign: 'center',
            size: params.waveButton.size,
            borderHeight: params.waveButton.borderSize / 2,
            borderWidth: params.waveButton.borderSize * 2
        });
        this.newWave = new EnemyTasks()
    }

    // button click will spawn wave no matter what
    // TODO: need to add check or something to only spawn 1 wave at a time
    onClick(){
        if (applicationState.data.enemies == 0) {
            this.newWave.startWave()     
        }  
    }
}

export default WaveButton;