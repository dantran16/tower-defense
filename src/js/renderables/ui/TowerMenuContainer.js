import * as me from 'melonjs';
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

        this.towerText = new me.Text(this.width / 6, this.height / 9, {
            font: "PressStart2P",
            size: 20,
            fillStyle: "white",
            textAlign: "left",
            textBaseline: "top",
            bold: true,
            text: `${tower !== null ? `${tower.className} - Tier ${tower.tier}` : ''}`
        })

        this.towerTier = tower.tier
        this.sellButton = new SellButton(this.width / 6, this.height / 6, tower)
        this.upgradeButton = new UpgradeButton(this.width / 6, this.height / 3, tower)

        this.addChild(this.towerText)
        this.addChild(this.sellButton)
        this.addChild(this.upgradeButton)
    }

    update(dt) {
        this.isDirty = false
        if (this.towerTier !== this.tower.tier) {
            // Update the tower tier description
            this.towerTier = this.tower.tier;
            this.towerText.setText(`${this.tower !== null ? `${this.tower.className} - Tier ${this.tower.tier}` : ''}`);

            // Update the button values (Text on buttons cannot be edited once made)
            this.removeChild(this.sellButton)
            this.removeChild(this.upgradeButton)
            this.sellButton = new SellButton(this.width / 6, this.height / 6, this.tower)
            this.upgradeButton = new UpgradeButton(this.width / 6, this.height / 3, this.tower)
            this.addChild(this.sellButton)
            this.addChild(this.upgradeButton)

            this.isDirty = true;
        }
        super.update()
    }

};
export default TowerMenuContainer;