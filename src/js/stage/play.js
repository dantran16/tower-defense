import * as me from 'melonjs';
import SideMenuContainer from "../renderables/ui/SideMenuContainer";
import GameHUD from "../renderables/ui/GameHUD";
import Map from '../renderables/ui/Map';
import applicationState from '../applicationState';
import validMatrix from '../validMatrix';
//import { ImageLayer } from '../../../node_modules/melonjs/dist/types/index';


class PlayScreen extends me.Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        const width = me.game.viewport.width;
        const height = me.game.viewport.height;

        // reset application state data on game restart
        applicationState.data.playerHealth = 0;
        applicationState.data.currency = 200;
        applicationState.data.level = 1;
        applicationState.data.wave = 0;
        applicationState.data.enemies = '';
        applicationState.isPaused = false;
        applicationState.towerMenu = null;
        applicationState.texture = null;
        applicationState.creation = false;
        applicationState.validMatrix = JSON.parse(JSON.stringify(validMatrix));

        const game_map = new Map(width / 2.5, height / 1.75);
        const panel = new SideMenuContainer(width * 5/6, 0, width / 6, height);
        const gameHud = new GameHUD(0, 0, width * 5 / 6, height);
        
        if (!applicationState.pauseMusic) {
            me.audio.playTrack("play_screen")
        }
        me.game.world.addChild(new me.ColorLayer("background", "#202020"));
        me.game.world.addChild(game_map);
        me.game.world.addChild(panel);
        me.game.world.addChild(gameHud);
        
    }

    onDestroyEvent() {
        me.audio.stopTrack()
    }

};

export default PlayScreen;
