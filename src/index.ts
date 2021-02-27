// @ts-nocheck
import SpaceScene from "./scenes/space/SpaceScene";
import SpaceStarScene from "./scenes/space/SpaceStarScene";
import SpaceDebugScene from "./scenes/space/SpaceDebugScene";

/*
    Started CartesianSystem: 2/19/2021
*/

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 450,
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [SpaceScene, SpaceStarScene, SpaceDebugScene],
}

var game: Phaser.Game = new Phaser.Game(config);

window.game = game;

console.log("here!");