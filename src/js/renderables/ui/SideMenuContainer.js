import * as me from 'melonjs';
import TowerButton from '../../buttons/TowerButton';
import PauseButton from '../../buttons/PauseButton';
import DefeatButton from '../../buttons/DefeatButton';
import VictoryButton from '../../buttons/VictoryButton';
import applicationState from '../../applicationState';

// a Panel type container
class SideMenuContainer extends me.UIBaseElement {
    constructor(x, y, width, height) {
        // call the constructor
        super(x, y, width, height);

        // [0, 0] as origin
        this.anchorPoint.set(0, 0);

        // give a name
        this.name = "SideMenu";

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
        
        this.addChild(this.currencyText);
        this.addChild(new PauseButton(this.width / 2, this.height / 24))
        this.addChild(new TowerButton(this.width * 3 / 10, this.height / 8, "Child", {width: 50, height: 25}))
        this.addChild(new TowerButton(this.width * 7 / 10, this.height / 8, "Adult", {width: 50, height: 25}))
        this.addChild(new TowerButton(this.width * 3 / 10, this.height / 4, "Foodie", {width: 50, height: 25}))

        this.addChild(new DefeatButton(this.width * 3/10, this.height / 1.15, 'Defeat', {width: 50, height: 25}))
        this.addChild(new VictoryButton(this.width * 3/10, this.height / 1.2, 'Defeat', {width: 50, height: 25}))
    }

    update(dt) {
        if (this.score !== applicationState.data.currency) {
            this.score = applicationState.data.currency;
            this.currencyText.setText(`$${applicationState.data.currency}`);
            this.isDirty = true;
        } else {
            this.isDirty = false;
        }
        return super.update(dt);
    }

};
export default SideMenuContainer;