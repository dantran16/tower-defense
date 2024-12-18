import { Stage, game, ColorLayer, BitmapText  } from "melonjs";
import MenuButton from "../buttons/MenuButton";
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
            text : "1.5 Michelin Stars"
        }));

        game.world.addChild(new BitmapText(game.viewport.width / 2, game.viewport.height * 2.5 / 5,  {
            font : "PressStart2P",
            size : 1.0,
            lineHeight: 4,
            textBaseline : "middle",
            textAlign : "center",
            text : "Your dream of having a conveyor belt sushi restaurant \nis a success. The customers had some food poisoning, but \nthey ate everything and your parents are proud of you."
        }));


        game.world.addChild(new MenuButton(game.viewport.width / 2 - params.playButton.borderSize * 3 / 2, game.viewport.height * 4 / 5));
    }
}


export default VictoryScreen;
