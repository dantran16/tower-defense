import { Stage, game, ColorLayer, BitmapText  } from "melonjs";
import PlayButton from "../buttons/PlayButton";
import MenuButton from "../buttons/MenuButton";
import { params } from "../params";

class DefeatScreen extends Stage {
    onResetEvent() {
        game.world.addChild(new ColorLayer("background", "#202020"));


	    // add a font text display object
        // add a font text display object
        game.world.addChild(new BitmapText(game.viewport.width / 2, game.viewport.height / 4,  {
            font : "PressStart2P",
            size : 3.0,
            textBaseline : "middle",
            textAlign : "center",
            text : "[CLOSED]"
        }));

        game.world.addChild(new BitmapText(game.viewport.width / 2, game.viewport.height * 2.5 / 5,  {
            font : "PressStart2P",
            size : 1.0,
            lineHeight: 4,
            textBaseline : "middle",
            textAlign : "center",
            text : "Your dreams of having a conveyor belt sushi restaurant \nare throttled. The customers could not eat everything \nand you lost so much money you wonder if you should have \njust become a doctor like your parents always wanted you \nto."
        }));


        game.world.addChild(new MenuButton(game.viewport.width / 2 - params.playButton.borderSize * 3 / 2, game.viewport.height * 4 / 5));
    }
}


export default DefeatScreen;
