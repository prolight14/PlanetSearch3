//@ts-nocheck

// Title scene
import TitleScene from "./scenes/TitleScene";


// Entry scene 
import EntryScene from "./scenes/EntryScene";

// Space scenes
import SpaceScene from "./scenes/space/SpaceScene";
import SpaceCameraControllerScene from "./scenes/space/SpaceCameraControllerScene";
import SpaceDebugScene from "./scenes/space/SpaceDebugScene";
import SpaceUIDebugScene from "./scenes/space/SpaceUIDebugScene";
import StarSceneControllerScene from "./scenes/space/StarSceneControllerScene";
import SpaceBackgroundScene from "./scenes/space/SpaceBackgroundScene";

// Planet scene(s)
import PlanetScene from "./scenes/planet/PlanetScene";
import SpaceLogicScene from "./scenes/space/SpaceLogicScene";
import PlanetLogicScene from "./scenes/planet/PlanetLogicScene";
import PlanetEffectsScene from "./scenes/planet/PlanetEffectsScene";
import PlanetUIScene from "./scenes/planet/PlanetUIScene";
import PlanetBackScene from "./scenes/planet/PlanetBackScene";
import PlanetLoaderScene from "./scenes/planet/PlanetLoaderScene";
import SpaceUIScene from "./scenes/space/SpaceUIScene";

/*
    Started CartesianSystem: 2/19/2021

    Note: When I finish this I need to properly release it meaning: 
    Do this checklist:
    1. Final check for bugs
    2. Final playtest
    3. Build in production mode
    4. Move ./dist/PlanetSearch3.min.js to ./www/js
    5. Make sure I can play this only with resources from the www folder
    6. Properly copyright this game
    7. Market this game correctly
    8. Remove all unneeded assets

    Note: Do testing! LOTS of testing!
*/

let config: Phaser.Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    width: 800,
    height: 450,
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    disableContextMenu: true,
    scene: [
        // TitleScene,
 
        // Entry scene 
        EntryScene,

        // Space scenes
        SpaceBackgroundScene, SpaceScene, SpaceCameraControllerScene, SpaceDebugScene, SpaceUIScene,
        /*SpaceUIDebugScene,*/ StarSceneControllerScene, SpaceLogicScene, 

        // Planet scene(s)
        PlanetScene, PlanetBackScene, PlanetLogicScene, PlanetLoaderScene, PlanetUIScene, PlanetEffectsScene
    ],
    seed: "explorationHelix1"
}
var game: Phaser.Game = new Phaser.Game(config);

window.game = game;
 