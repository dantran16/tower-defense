import * as me from 'melonjs';
import SideMenuContainer from "../renderables/ui/SideMenuContainer";
import GameHUD from "../renderables/ui/GameHUD";
import Map from '../renderables/ui/Map';
import GoldCoin from '../renderables/misc/GoldCoin';
import applicationState from '../applicationState';
//import { ImageLayer } from '../../../node_modules/melonjs/dist/types/index';


class PlayScreen extends me.Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        const width = me.game.viewport.width;
        const height = me.game.viewport.height;

        // reset application state data every time play is started
        applicationState.data.playerHealth = 10;
        applicationState.data.currency = 100;
        applicationState.data.level = 1;
        applicationState.data.wave = 1;
        applicationState.data.enemies = 10;


        const game_map = new Map(width / 2.5, height / 1.75);
        const panel = new SideMenuContainer(width * 5/6, 0, width / 6, height);
        const gameHud = new GameHUD(0, 0, width * 5 / 6, height);
        const gold_coin = new GoldCoin(width / 1.17, height / 18);

        me.game.world.addChild(new me.ColorLayer("background", "#202020"));
        me.game.world.addChild(game_map);
        me.game.world.addChild(panel);
        me.game.world.addChild(gameHud);
        me.game.world.addChild(gold_coin);
        
    }

};

export default PlayScreen;
