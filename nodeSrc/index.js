"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EntryScene_1 = require("./scenes/EntryScene");
var SpaceScene_1 = require("./scenes/space/SpaceScene");
var SpaceCameraControllerScene_1 = require("./scenes/space/SpaceCameraControllerScene");
var SpaceDebugScene_1 = require("./scenes/space/SpaceDebugScene");
var SpaceUIDebugScene_1 = require("./scenes/space/SpaceUIDebugScene");
var StarSceneControllerScene_1 = require("./scenes/space/StarSceneControllerScene");
var SpaceBackgroundScene_1 = require("./scenes/space/SpaceBackgroundScene");
var PlanetScene_1 = require("./scenes/planet/PlanetScene");
var SpaceLogicScene_1 = require("./scenes/space/SpaceLogicScene");
var PlanetLogicScene_1 = require("./scenes/planet/PlanetLogicScene");
var PlanetEffectsScene_1 = require("./scenes/planet/PlanetEffectsScene");
var PlanetUIScene_1 = require("./scenes/planet/PlanetUIScene");
var PlanetBackScene_1 = require("./scenes/planet/PlanetBackScene");
var PlanetLoaderScene_1 = require("./scenes/planet/PlanetLoaderScene");
var SpaceUIScene_1 = require("./scenes/space/SpaceUIScene");
var SpaceEffectsScene_1 = require("./scenes/space/SpaceEffectsScene");
var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 450,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    pixelArt: true,
    disableContextMenu: true,
    antialiasGL: false,
    batchSize: 32,
    scene: [
        EntryScene_1.default,
        SpaceBackgroundScene_1.default, SpaceScene_1.default, SpaceCameraControllerScene_1.default, SpaceDebugScene_1.default,
        SpaceUIDebugScene_1.default, StarSceneControllerScene_1.default, SpaceLogicScene_1.default, SpaceUIScene_1.default, SpaceEffectsScene_1.default,
        PlanetScene_1.default, PlanetBackScene_1.default, PlanetLogicScene_1.default, PlanetLoaderScene_1.default, PlanetUIScene_1.default, PlanetEffectsScene_1.default
    ],
    seed: "explorationHelix1"
};
var game = new Phaser.Game(config);
window.game = game;
//# sourceMappingURL=index.js.map