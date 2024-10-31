import * as me from 'melonjs';
import SideMenuContainer from "../renderables/ui/SideMenuContainer";
import GameHUD from "../renderables/ui/GameHUD";
import DataManifest from '../../manifest';
//import { ImageLayer } from '../../../node_modules/melonjs/dist/types/index';


class PlayScreen extends me.Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        me.game.world.addChild(new me.ColorLayer("background", "#202020"));

        var panel = new SideMenuContainer(me.game.viewport.width * 5/6, 0, me.game.viewport.width / 6, me.game.viewport.height);
        var gameHud = new GameHUD(0, 0, me.game.viewport.width * 5 / 6, me.game.viewport.height);

        var game_map = new me.Sprite(450,350, 
            {   
                image: me.loader.getImage("map")
            });

        me.game.world.addChild(game_map);

        
        me.game.world.addChild(panel);
        me.game.world.addChild(gameHud);
    }

};

export default PlayScreen;
