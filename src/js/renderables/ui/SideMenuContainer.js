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

        this.addChild(new TowerButton(this.width * 3.5/12, this.height / 20 * 4, "Child", {width: this.width * 5 /12, height: this.width * 5 /12}))
        this.addChild(new TowerButton(this.width * 3.5/12, this.height / 20 * 7, "Adult", {width: this.width * 5 /12, height: this.width * 5 /12}))
        this.addChild(new TowerButton(this.width * 3.5/12, this.height / 20 * 10, "Foodie", {width: this.width * 5 /12, height: this.width * 5 /12}))
    }

    update(dt) {
        if(applicationState.isTowerMenu){
            this.ancestor.removeChild(this)
        }
        return super.update(dt);
    }

};
export default SideMenuContainer;
