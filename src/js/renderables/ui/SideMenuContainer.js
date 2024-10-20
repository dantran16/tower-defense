import * as me from 'melonjs';
import TowerButton from '../../buttons/TowerButton';
import PauseButton from '../../buttons/PauseButton';

// a Panel type container
class SideMenuContainer extends me.UIBaseElement {

    constructor(x, y, width, height) {
        // call the constructor
        super(x, y, width, height);

        // [0, 0] as origin
        this.anchorPoint.set(0, 0);

        // give a name
        this.name = "SideMenu";

        this.addChild(new me.Text(this.width / 6, 16, {
            font: "PressStart2P",
            size: 20,
            fillStyle: "white",
            textAlign: "left",
            textBaseline: "top",
            bold: true,
            text: "$0"
        }));

        this.addChild(new PauseButton(this.width / 2, 16))

        this.addChild(new TowerButton(this.width / 6, 48, "Tower1"))
        this.addChild(new TowerButton(this.width / 2, 48, "Tower2"))
        this.addChild(new TowerButton(this.width / 6, 80, "Tower3"))
        this.addChild(new TowerButton(this.width / 2, 80, "Tower3"))

        

    }
};
export default SideMenuContainer;