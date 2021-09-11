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
var PlanetEffectsSceen_1 = require("./scenes/planet/PlanetEffectsSceen");
var PlanetUIScene_1 = require("./scenes/planet/PlanetUIScene");
var PlanetBackScene_1 = require("./scenes/planet/PlanetBackScene");
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
        SpaceBackgroundScene_1.default, SpaceScene_1.default, SpaceCameraControllerScene_1.default, SpaceDebugScene_1.default,
        SpaceUIDebugScene_1.default, StarSceneControllerScene_1.default, SpaceLogicScene_1.default,
        PlanetScene_1.default, PlanetBackScene_1.default, PlanetLogicScene_1.default, PlanetUIScene_1.default, PlanetEffectsSceen_1.default
    ],
};
var game = new Phaser.Game(config);
window.game = game;
//# sourceMappingURL=index.js.map