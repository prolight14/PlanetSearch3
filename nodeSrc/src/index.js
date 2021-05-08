"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EntryScene_1 = require("./scenes/EntryScene");
var SpaceScene_1 = require("./scenes/space/SpaceScene");
var SpaceCameraControllerScene_1 = require("./scenes/space/SpaceCameraControllerScene");
var SpaceDebugScene_1 = require("./scenes/space/SpaceDebugScene");
var SpaceUIDebugScene_1 = require("./scenes/space/SpaceUIDebugScene");
var StarSceneControllerScene_1 = require("./scenes/space/StarSceneControllerScene");
var PlanetScene_1 = require("./scenes/planet/PlanetScene");
var SpaceLogicScene_1 = require("./scenes/space/SpaceLogicScene");
var config = {
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
        EntryScene_1.default,
        SpaceScene_1.default, SpaceCameraControllerScene_1.default, SpaceDebugScene_1.default,
        SpaceUIDebugScene_1.default, StarSceneControllerScene_1.default, SpaceLogicScene_1.default,
        PlanetScene_1.default
    ],
};
var game = new Phaser.Game(config);
window.game = game;
//# sourceMappingURL=index.js.map