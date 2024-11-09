import { Stage, game, ColorLayer, BitmapText  } from "melonjs";
import PlayButton from "/src/js/buttons/PlayButton";
import { params } from "../params";

class TitleScreen extends Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        game.world.addChild(new ColorLayer("background", "#202020"));

        // add a font text display object
        game.world.addChild(new BitmapText(game.viewport.width / 2, game.viewport.height / 4,  {
            font : "PressStart2P",
            size : 3.0,
            textBaseline : "middle",
            textAlign : "center",
            text : "BeltchTD"
        }));

        game.world.addChild(new PlayButton(game.viewport.width / 2 - params.playButton.borderSize, game.viewport.height / 2));
    }

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent() {
        ; // TODO
    }
};

export default TitleScreen;
