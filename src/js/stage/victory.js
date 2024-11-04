import { Stage, game, ColorLayer, BitmapText  } from "melonjs";
import PlayButton from "../buttons/PlayButton";
import MenuButton from "../buttons/MenuButton";
import { params } from "../params";


class VictoryScreen extends Stage {
    onResetEvent() {
        game.world.addChild(new ColorLayer("background", "#000000"));


        // add a font text display object
        game.world.addChild(new BitmapText(game.viewport.width / 2, game.viewport.height / 2,  {
            font : "PressStart2P",
            size : 5.0,
            textBaseline : "middle",
            textAlign : "center",
            text : "5 Stars"
        }));


        game.world.addChild(new PlayButton(game.viewport.width / 2 - params.playButton.borderSize, game.viewport.height / 1.15));
    }
}


export default VictoryScreen;