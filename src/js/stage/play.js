import * as me from 'melonjs';
import SideMenuContainer from "../renderables/ui/SideMenuContainer";
import GameHUD from "../renderables/ui/GameHUD";
import Map from '../renderables/ui/Map';
import applicationState from '../applicationState';
import ConveyorBelt from '../renderables/ui/ConveyorBelt';
//import { ImageLayer } from '../../../node_modules/melonjs/dist/types/index';


class PlayScreen extends me.Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        const width = me.game.viewport.width;
        const height = me.game.viewport.height;

        // reset application state data on game restart
        applicationState.data.playerHealth = 10;
        applicationState.data.currency = 1000;
        applicationState.data.level = 1;
        applicationState.data.wave = 0;
        applicationState.data.enemies = '';
        applicationState.isPaused = false;
        applicationState.towerMenu = false;
        applicationState.texture = null;
        applicationState.creation = false;

        const game_map = new Map(width / 2.5, height / 1.75);
        const panel = new SideMenuContainer(width * 5/6, 0, width / 6, height);
        const gameHud = new GameHUD(0, 0, width * 5 / 6, height);

        const belt1 = new ConveyorBelt(784, 187, {width: 64, height: 416})
        const belt2 = new ConveyorBelt(176, 187, {width: 384, height: 64})
        const belt3 = new ConveyorBelt(176, 187+64, {width: 64, height: 449})
        const belt4 = new ConveyorBelt(496, 187+64, {width: 64, height: 352})
        const belt5 = new ConveyorBelt(496+64, 539, {width: 224, height: 64})
        

        me.game.world.addChild(new me.ColorLayer("background", "#202020"));
        me.game.world.addChild(game_map);
        me.game.world.addChild(belt1)
        me.game.world.addChild(belt2)
        me.game.world.addChild(belt3)
        me.game.world.addChild(belt4)
        me.game.world.addChild(belt5)
        me.game.world.addChild(panel);
        me.game.world.addChild(gameHud);
        
    }

};

export default PlayScreen;
