import { Stage, game, ColorLayer, BitmapText  } from "melonjs";
import SideMenuContainer from "../renderables/ui/SideMenuContainer";
import GameHUD from "../renderables/ui/GameHUD";


class PlayScreen extends Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        game.world.addChild(new ColorLayer("background", "#202020"));

        var panel = new SideMenuContainer(game.viewport.width * 5/6, 0, game.viewport.width / 6, game.viewport.height);
        var gameHud = new GameHUD(0, 0, game.viewport.width * 5 / 6, game.viewport.height);

        game.world.addChild(panel)
        game.world.addChild(gameHud)
    }
};

export default PlayScreen;
