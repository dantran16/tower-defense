import { Stage, game, ColorLayer, BitmapText  } from "melonjs";
import PlayButton from "../buttons/PlayButton";
import { params } from "../params";


class VictoryScreen extends Stage {
    onResetEvent() {
        game.world.addChild(new ColorLayer("background", "#000000"));


        // add a font text display object
        // add a font text display object
        game.world.addChild(new BitmapText(game.viewport.width / 2, game.viewport.height / 4,  {
            font : "PressStart2P",
            size : 3.0,
            textBaseline : "middle",
            textAlign : "center",
            text : "Congratulations!"
        }));

        game.world.addChild(new BitmapText(game.viewport.width / 2, game.viewport.height * 2.5 / 5,  {
            font : "PressStart2P",
            size : 1.0,
            lineHeight: 4,
            textBaseline : "middle",
            textAlign : "center",
            text : "Your dream of having a conveyor belt sushi restaurant \nis a success. The customers had some food poisoning, \nbut they ate everything and your parents are proud of you."
        }));


        game.world.addChild(new MenuButton(game.viewport.width / 2 - params.playButton.borderSize * 3, game.viewport.height / 1.15));
    }
}


export default VictoryScreen;
