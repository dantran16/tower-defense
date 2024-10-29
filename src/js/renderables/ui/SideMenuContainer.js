import * as me from 'melonjs';
import TowerButton from '../../buttons/TowerButton';
import PauseButton from '../../buttons/PauseButton';
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

        const currencyText = new me.Text(this.width / 6, this.height / 24, {
            font: "PressStart2P",
            size: 20,
            fillStyle: "white",
            textAlign: "left",
            textBaseline: "top",
            bold: true,
            text: `$${applicationState.data.currency}`
        })
        this.addChild(currencyText);
        this.updateCurrency = () => currencyText.setText(`$${applicationState.data.currency}`);
        

        this.addChild(new PauseButton(this.width / 2, this.height / 24))
        this.addChild(new TowerButton(this.width * 3 / 10, this.height / 8, "Child", {width: 50, height: 25}))
        this.addChild(new TowerButton(this.width * 7 / 10, this.height / 8, "Adult", {width: 50, height: 25}))
        this.addChild(new TowerButton(this.width * 3 / 10, this.height / 4, "Foodie", {width: 50, height: 25}))
    }

};
export default SideMenuContainer;