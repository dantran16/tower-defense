import * as me from 'melonjs';
import TowerButton from '../../buttons/TowerButton';
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

        this.addChild(new TowerButton(this.width / 5, this.height / 20 * 4, "Child", {width: 100, height: 25}))
        this.addChild(new TowerButton(this.width / 5, this.height / 20 * 5, "Adult", {width: 100, height: 25}))
        this.addChild(new TowerButton(this.width / 5, this.height / 20 * 6, "Foodie", {width: 100, height: 25}))
    }

    update(dt) {
        if(applicationState.isTowerMenu){
            this.ancestor.removeChild(this)
        }
        return super.update(dt);
    }

};
export default SideMenuContainer;
