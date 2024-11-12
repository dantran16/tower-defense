import * as me from 'melonjs';
import applicationState from '../../applicationState';
import PauseButton from '../../buttons/PauseButton';
import SellButton from '../../buttons/SellButton';
import UpgradeButton from '../../buttons/UpgradeButton';

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
        this.upgradeButton = new UpgradeButton(this.width / 6, this.height / 3, tower)
        
        this.addChild(this.towerText)
        this.addChild(this.sellButton)
        this.addChild(this.upgradeButton)

    }

    update(dt) {
        if(!applicationState.isTowerMenu){
            this.ancestor.removeChild(this)
        }
        return super.update(dt);
    }

};
export default TowerMenuContainer;