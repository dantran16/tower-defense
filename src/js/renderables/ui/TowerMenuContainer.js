import * as me from 'melonjs';
import SellButton from '../../buttons/SellButton';
import UpgradeButton from '../../buttons/UpgradeButton';
// a Panel type container
class TowerMenuContainer extends me.Container {
    constructor(x, y, width, height, tower) {
        // call the constructor
        super(x, y, width, height);
        this.anchorPoint.set(0, 0);
        this.name = "TowerMenu";
        this.tower = tower
        this.floating = true
        // [0, 0] as origin
        this.anchorPoint.set(0, 0);

        // give a name
        this.name = "TowerMenu";
        this.towerTier = tower.tier
        this.background = new me.Sprite(this.width / 12 + 75, 365, { image: me.loader.getImage("ui-background") })
        this.addChild(this.background)

        this.displayTowerStats()
        this.sellButton = new SellButton(this.width / 6 - 15, this.height / 6, tower)
        this.upgradeButton = new UpgradeButton(this.width / 6 - 15, this.height / 3, tower)
        this.addChild(this.sellButton)
        this.addChild(this.upgradeButton)
    }

    displayTowerStats(){
        const stats = this.tower.getAllyStats();

        this.towerText = new me.Text(this.width / 6, this.height / 9, {
            font: "PressStart2P",
            size: 20,
            fillStyle: "white",
            textAlign: "left",
            textBaseline: "top",
            bold: true,
            text: `${this.tower !== null ? `${this.tower.className} - Tier ${stats.allyTier}` : ''}`
        })

        this.statsHeader = new me.Text(this.width / 12, this.height / 2 - 20, {
            font: "PressStart2P",
            size: 20,
            fillStyle: "white",
            textAlign: "left",
            textBaseline: "top",
            bold: true,
            text: 'STATISTICS'
        }) 
        this.statsSeparator = new me.Text(this.width / 12, this.height / 2, {
            font: "PressStart2P",
            size: 20,
            fillStyle: "white",
            textAlign: "left",
            textBaseline: "top",
            bold: true,
            text: '=============='
        }) 

        this.towerAttack = new me.Text(this.width / 12, this.height / 2 + 20, {
            font: "PressStart2P",
            size: 16,
            fillStyle: "white",
            textAlign: "left",
            textBaseline: "top",
            bold: true,
            text: `Attack: ${stats.allyATK}`
        })
        this.towerASPD = new me.Text(this.width / 12, this.height / 2 + 40, {
            font: "PressStart2P",
            size: 16,
            fillStyle: "white",
            textAlign: "left",
            textBaseline: "top",
            bold: true,
            text: `Speed: ${stats.allyASPD}`
        })
        this.towerRange = new me.Text(this.width / 12, this.height /2 + 60, {
            font: "PressStart2P",
            size: 16,
            fillStyle: "white",
            textAlign: "left",
            textBaseline: "top",
            bold: true,
            text: `Range: ${stats.allyRange}`
        })

        this.addChild(this.statsHeader)
        this.addChild(this.statsSeparator)
        this.addChild(this.towerText)
        this.addChild(this.towerAttack)
        this.addChild(this.towerASPD)
        this.addChild(this.towerRange)
    }

    update(dt) {
        this.isDirty = false
        if (this.towerTier !== this.tower.tier) {
            const stats = this.tower.getAllyStats(); 
            // Update the tower tier description
            this.towerText.setText(`${this.tower !== null ? `${this.tower.className} - Tier ${stats.allyTier}` : ''}`);
            this.towerAttack.setText(`Attack: ${stats.allyATK}`)
            this.towerASPD.setText(`Speed: ${stats.allyASPD}`);
            this.towerRange.setText(`Range: ${stats.allyRange}`)

            // Update the button values (Text on buttons cannot be edited once made)
            this.removeChild(this.sellButton)
            this.removeChild(this.upgradeButton)
            this.sellButton = new SellButton(this.width / 6 - 15, this.height / 6, this.tower)
            this.upgradeButton = new UpgradeButton(this.width / 6 - 15, this.height / 3, this.tower)
            this.addChild(this.sellButton)
            this.addChild(this.upgradeButton)
            this.isDirty = true;
        }
        super.update()
    }
};
export default TowerMenuContainer;