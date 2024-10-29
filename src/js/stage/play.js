import * as me from 'melonjs';
import { Stage, game, ColorLayer, BitmapText  } from "melonjs";
import SideMenuContainer from "../renderables/ui/SideMenuContainer";
import GameHUD from "../renderables/ui/GameHUD";
import DataManifest from '../../manifest';
//import { ImageLayer } from '../../../node_modules/melonjs/dist/types/index';


class PlayScreen extends Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        game.world.addChild(new ColorLayer("background", "#202020"));

        var panel = new SideMenuContainer(game.viewport.width * 5/6, 0, game.viewport.width / 6, game.viewport.height);
        var gameHud = new GameHUD(0, 0, game.viewport.width * 5 / 6, game.viewport.height);

        const width = game.viewport.width;
        const height = game.viewport.height;

        var game_map = new me.Sprite(width / 2.5, height / 1.75, 
            {   
                image: me.loader.getImage("map"), 
                spritewidth: 32, 
                spriteheight: 32
            });

        me.game.world.addChild(game_map);

        
        game.world.addChild(panel);
        game.world.addChild(gameHud);

        // temp code that serves as a map placeholder
        // game.world.addChild(new BitmapText(game.viewport.width / 2.5, game.viewport.height / 1.8,  {
        //     font : "PressStart2P",
        //     size : 2.8,
        //     textBaseline : "middle",
        //     textAlign : "center",
        //     text : "Map Placeholder"
        // }));

    }
};

export default PlayScreen;
