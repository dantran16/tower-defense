import { Stage, game, ColorLayer, BitmapText  } from "melonjs";
import PlayButton from "../buttons/PlayButton";
import MenuButton from "../buttons/MenuButton";
import { params } from "../params";

class DefeatScreen extends Stage {
    onResetEvent() {
        game.world.addChild(new ColorLayer("background", "#202020"));


		// add a font text display object
        game.world.addChild(new BitmapText(game.viewport.width / 2, game.viewport.height / 2,  {
            font : "PressStart2P",
            size : 5.0,
            textBaseline : "middle",
            textAlign : "center",
            text : "Closed!"
        }));


        game.world.addChild(new PlayButton(game.viewport.width / 2 - params.playButton.borderSize, game.viewport.height / 1.15));
        game.world.addChild(new MenuButton(game.viewport.width / 3 - params.playButton.borderSize, game.viewport.height / 1.15))
    }
}


export default DefeatScreen;