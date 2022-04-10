"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SpaceStarScene_1 = require("./SpaceStarScene");
var StarSceneControllerScene = (function (_super) {
    __extends(StarSceneControllerScene, _super);
    function StarSceneControllerScene() {
        return _super.call(this, "starSceneController") || this;
    }
    StarSceneControllerScene.prototype.preload = function () {
        this.load.image("starBackground", "./assets/Space/Stars/starBackground.png");
    };
    StarSceneControllerScene.prototype.create = function () {
        this.startStarScenes();
        this.events.on("sleep", this.onSleep, this);
        this.events.on("wake", this.onWake, this);
    };
    StarSceneControllerScene.prototype.startStarScenes = function () {
        var spaceScene = this.scene.get("space");
        this.scene.add("spaceStar", SpaceStarScene_1.default, true, {
            starScroll: 1.0,
            imageKey: "starBackground",
            cspConfig: {
                window: {
                    width: spaceScene.cspConfig.width,
                    height: spaceScene.cspConfig.height
                },
                grid: {
                    cols: 200,
                    rows: 200,
                    cellWidth: 1024,
                    cellHeight: 1024,
                }
            }
        });
        this.scene.sendToBack("spaceStar");
        this.scene.sendToBack("spaceBackground");
        this.starScenesSleeping = false;
    };
    StarSceneControllerScene.prototype.onSleep = function () {
        this.scene.sleep("spaceStar");
        this.starScenesSleeping = true;
    };
    StarSceneControllerScene.prototype.onWake = function () {
        this.scene.wake("spaceStar");
        this.starScenesSleeping = false;
    };
    return StarSceneControllerScene;
}(Phaser.Scene));
exports.default = StarSceneControllerScene;
//# sourceMappingURL=StarSceneControllerScene.js.map