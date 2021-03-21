// @ts-nocheck

// Entry scene 
import EntryScene from "./scenes/EntryScene";

// Space scenes
import SpaceScene from "./scenes/space/SpaceScene";
import SpaceCameraControllerScene from "./scenes/space/SpaceCameraControllerScene";
import SpaceDebugScene from "./scenes/space/SpaceDebugScene";
import SpaceUIDebugScene from "./scenes/space/SpaceUIDebugScene";

// Planet scene(s)
import PlanetScene from "./scenes/planet/PlanetScene";

/*
    Started CartesianSystem: 2/19/2021

    Note: When I finish this I need to properly release it meaning: 
    1. Final check for bugs
    2. Final playtest
    3. Build in production mode
    4. Move ./dist/PlanetSearch3.min.js to ./www/js
    5. Make sure I can play this only with resources from the www folder
    6. Properly copyright this game
*/

let config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 450,
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    disableContextMenu: true,
    scene: [
        // Entry scene 
        EntryScene,

        // Space scenes
        SpaceScene, SpaceCameraControllerScene, SpaceDebugScene, SpaceUIDebugScene,

        // Planet scene(s)
        PlanetScene
    ],
}

var game: Phaser.Game = new Phaser.Game(config);

window.game = game;