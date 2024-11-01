import {
    audio,
    loader,
    state,
    device,
    video,
    utils,
    plugin,
    pool
} from "melonjs";

import "./index.css";

import TitleScreen from "./js/stage/title.js";
import PlayScreen from "./js/stage/play.js";
import VictoryScreen from "./js/stage/victory.js";
import DefeatScreen from "./js/stage/defeat.js";
//import PlayerEntity from "./js/renderables/player.js";

import DataManifest from "./manifest.js";
// add enemies?


device.onReady(() => {

    // initialize the display canvas once the device/browser is ready
    if (!video.init(1280, 720, { parent: "screen", scale: "auto" })) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }

    // initialize the debug plugin in development mode.
    if (process.env.NODE_ENV === 'development') {
        import("@melonjs/debug-plugin").then((debugPlugin) => {
            // automatically register the debug panel
            utils.function.defer(plugin.register, this, debugPlugin.DebugPanelPlugin, "debugPanel");
        });
    }

    // Initialize the audio.
    audio.init("mp3,ogg");

    // allow cross-origin for image/texture loading
    loader.setOptions({crossOrigin: "anonymous"});

    // set and load all resources.
    loader.preload(DataManifest, function () {
        // set the user defined game stages
        state.set(state.MENU, new TitleScreen());
        state.set(state.PLAY, new PlayScreen());
        state.set(state.GAME_END, new VictoryScreen());
        state.set(state.GAMEOVER, new DefeatScreen());

        // add our player entity in the entity pool
        //pool.register("mainPlayer", PlayerEntity);
        // Start the game.
        state.change(state.MENU);
    });
});


