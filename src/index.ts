// @ts-nocheck
import SpaceScene from "./scenes/space/SpaceScene";
import SpaceCameraControllerScene from "./scenes/space/SpaceCameraControllerScene";
import SpaceStarScene from "./scenes/space/SpaceStarScene";
import SpaceDebugScene from "./scenes/space/SpaceDebugScene";
import SpaceUIDebugScene from "./scenes/space/SpaceUIDebugScene";

/*
    Started CartesianSystem: 2/19/2021
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
    scene: [SpaceScene, SpaceCameraControllerScene, SpaceStarScene, SpaceDebugScene, SpaceUIDebugScene],
}

var game: Phaser.Game = new Phaser.Game(config);

window.game = game;