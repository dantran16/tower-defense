import * as me from 'melonjs';
import MenuButton from '../buttons/MenuButton';
import { params } from '../params';
import { ColorLayer } from '../../../node_modules/melonjs/dist/types/index';

class PauseScreen extends Stage {
    onResetEvent() {
        game.world.addChild(new ColorLayer("background", "#202020"));

        // text display
        game.world.addChild(new BitmapText(game.viewport.width / 2, game.viewport.height / 2,  {
            font : "PressStart2P",
            size : 5.0,
            textBaseline : "middle",
            textAlign : "center",
            text : "Pause"
        }));

        game.world.addChild(new MenuButton(game.viewport.width / 3 - params.playButton.borderSize, game.viewport.height / 1.15))
    }


}

export default PauseScreen;