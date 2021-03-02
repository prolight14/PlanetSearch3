"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SpaceScene_1 = require("./scenes/space/SpaceScene");
var SpaceCameraControllerScene_1 = require("./scenes/space/SpaceCameraControllerScene");
var SpaceDebugScene_1 = require("./scenes/space/SpaceDebugScene");
var SpaceUIDebugScene_1 = require("./scenes/space/SpaceUIDebugScene");
var SpaceStarScene_1 = require("./scenes/space/SpaceStarScene");
var config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 450,
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [SpaceScene_1.default, SpaceCameraControllerScene_1.default, SpaceStarScene_1.default, SpaceDebugScene_1.default, SpaceUIDebugScene_1.default],
};
var game = new Phaser.Game(config);
window.game = game;
//# sourceMappingURL=index.js.map