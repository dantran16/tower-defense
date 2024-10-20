import { Stage, game, ColorLayer, BitmapText  } from "melonjs";
import SideMenuContainer from "../renderables/ui/SideMenuContainer";


class PlayScreen extends Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        game.world.addChild(new ColorLayer("background", "#202020"));

        var panel = new SideMenuContainer(game.viewport.width * 5/6, 0, game.viewport.width / 6, game.viewport.height);

        game.world.addChild(panel)
    }
};

export default PlayScreen;
