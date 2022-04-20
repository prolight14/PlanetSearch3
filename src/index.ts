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
import SpaceLogicScene from "./scenes/space/SpaceLogicScene";

// Planet scene(s)
import PlanetScene from "./scenes/planet/PlanetScene";
import PlanetLogicScene from "./scenes/planet/PlanetLogicScene";
import PlanetEffectsScene from "./scenes/planet/PlanetEffectsScene";
import PlanetUIScene from "./scenes/planet/PlanetUIScene";
import PlanetBackScene from "./scenes/planet/PlanetBackScene";
import PlanetLoaderScene from "./scenes/planet/PlanetLoaderScene";
import SpaceUIScene from "./scenes/space/SpaceUIScene";
import SpaceEffectsScene from "./scenes/space/SpaceEffectsScene";

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
    8. Remove all unneeded asset
    9. Use bitmap text

    Note: Do testing! LOTS of testing!
*/

/*
    Bugs to fix:
    1. Xp and crests spawn a ton sometimes when an enemy ship is shotdown (Fixed?)
    
    2. Enemy ship's thruster particle effect sometimes disappears and reappears (Fixed)

    3. Pressing 'u' doesn't open the debug info (fixed)

    4. If your ship dies in the game I can't really figure out how to reload space correctly (not really a bug more like an unimplemented feature)
        maybe I have to edit the cartesian system's code

    5. Game lags when lots of object are made even if they are outside the cells that are touching the game canvas
        probably because of matter js bodies not being confined to the cartesian system

    6. Game will crash if objects are destroyed (Fixed)

    7. Bullets cell references stay even after the bullets are gone (Fixed!)

    8. The ui debug scene's cell reference debug tool isn't accurate when space is zoomed out (Fixed)
*/

let config: Phaser.Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    width: 800,
    height: 450,
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        autoRound: true
    },
    pixelArt: true,
    disableContextMenu: true,
    antialiasGL: false,
    antialias: false,
    batchSize: 128,
    scene: [
        // TitleScene,
 
        // Entry scene 
        EntryScene,

        // Space scenes
        SpaceScene, SpaceCameraControllerScene, SpaceDebugScene, 
        SpaceUIDebugScene, StarSceneControllerScene, SpaceLogicScene, SpaceUIScene, SpaceEffectsScene,

        // Planet scene(s)
        PlanetScene, PlanetBackScene, PlanetLogicScene, PlanetLoaderScene, PlanetUIScene, PlanetEffectsScene
    ],
    seed: "explorationHelix1"
}
var game: Phaser.Game = new Phaser.Game(config);

window.game = game;
 