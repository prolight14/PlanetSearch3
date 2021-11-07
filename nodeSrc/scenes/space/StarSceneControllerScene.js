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
        this.load.image("starBackground2", "./assets/Space/Stars/starBackground2.png");
    };
    StarSceneControllerScene.prototype.create = function () {
        this.startStarScenes();
        this.events.on("sleep", this.onSleep, this);
        this.events.on("wake", this.onWake, this);
    };
    StarSceneControllerScene.prototype.startStarScenes = function () {
        var spaceScene = this.scene.get("space");
        this.scene.add("spaceStar2", SpaceStarScene_1.default, true, {
            imageKey: "starBackground2",
            cspConfig: {
                window: {
                    width: spaceScene.cspConfig.width,
                    height: spaceScene.cspConfig.height
                },
                grid: {
                    cols: 100,
                    rows: 100,
                    cellWidth: 1600,
                    cellHeight: 1600,
                }
            }
        });
        this.scene.sendToBack("spaceStar2");
        this.scene.add("spaceStar", SpaceStarScene_1.default, true, {
            starScroll: 0.65,
            imageKey: "starBackground",
            cspConfig: {
                window: {
                    width: spaceScene.cspConfig.width,
                    height: spaceScene.cspConfig.height
                },
                grid: {
                    cols: 100,
                    rows: 100,
                    cellWidth: 1600,
                    cellHeight: 1600,
                }
            }
        });
        this.scene.sendToBack("spaceStar");
        this.scene.sendToBack("spaceBackground");
        this.starScenesSleeping = false;
    };
    StarSceneControllerScene.prototype.onSleep = function () {
        this.scene.sleep("spaceStar");
        this.scene.sleep("spaceStar2");
        this.scene.sleep("spaceStar3");
        this.starScenesSleeping = true;
    };
    StarSceneControllerScene.prototype.onWake = function () {
        this.scene.wake("spaceStar");
        this.scene.wake("spaceStar2");
        this.scene.wake("spaceStar3");
        this.starScenesSleeping = false;
    };
    StarSceneControllerScene.prototype.update = function () {
        this.updateStarFade();
    };
    StarSceneControllerScene.prototype.updateStarFade = function () {
        if (this.starScenesSleeping) {
            return;
        }
        var mainCam = this.scene.get("space").cameras.main;
        if (mainCam.zoom <= 0.5) {
            this.scene.sleep("spaceStar3");
        }
        else {
            this.scene.wake("spaceStar3");
        }
        if (mainCam.zoom <= 0.35) {
            this.scene.sleep("spaceStar2");
        }
        else {
            this.scene.wake("spaceStar2");
        }
    };
    return StarSceneControllerScene;
}(Phaser.Scene));
exports.default = StarSceneControllerScene;
//# sourceMappingURL=StarSceneControllerScene.js.map