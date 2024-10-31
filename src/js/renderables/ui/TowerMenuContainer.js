import * as me from 'melonjs';
import applicationState from '../../applicationState';
import PauseButton from '../../buttons/PauseButton';
import SellButton from '../../buttons/SellButton';
import ResumeButton from '../../buttons/ResumeButton';

// a Panel type container
class TowerMenuContainer extends me.UIBaseElement {
    constructor(x, y, width, height, tower) {
        // call the constructor
        super(x, y, width, height);

        this.anchorPoint.set(0, 0);

        this.name = "TowerMenu";
        this.tower = tower

        // [0, 0] as origin
        this.anchorPoint.set(0, 0);

        // give a name
        this.name = "TowerMenu";

        // Initialize currency score and always update
        this.score = applicationState.data.currency;

        this.currencyText = new me.Text(this.width / 6, this.height / 24, {
            font: "PressStart2P",
            size: 20,
            fillStyle: "white",
            textAlign: "left",
            textBaseline: "top",
            bold: true,
            text: `$${this.score}`
        })
        this.towerText = new me.Text(this.width / 6, this.height / 12, {
            font: "PressStart2P",
            size: 20,
            fillStyle: "white",
            textAlign: "left",
            textBaseline: "top",
            bold: true,
            text: `${tower !== null ? tower.className : ''}`
        })

        this.sellButton = new SellButton(this.width / 6, this.height / 6, tower)
        
        this.addChild(this.currencyText);
        if(!applicationState.isPaused){
            this.addChild(new PauseButton(this.width / 2, this.height / 24))
        }else{
            this.addChild(new ResumeButton(this.width / 2, this.height / 24))
        }
        this.addChild(this.towerText)
        this.addChild(this.sellButton)

    }

    update(dt) {
        if (this.score !== applicationState.data.currency) {
            this.score = applicationState.data.currency;
            this.currencyText.setText(`$${applicationState.data.currency}`);
            this.isDirty = true;
        } else {
            this.isDirty = false;
        }
        if(!applicationState.isTowerMenu){
            this.ancestor.removeChild(this)
        }
        return super.update(dt);
    }

    sell(){
        this.destroy
    }

};
export default TowerMenuContainer;