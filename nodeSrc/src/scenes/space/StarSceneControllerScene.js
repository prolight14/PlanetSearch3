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
    StarSceneControllerScene.prototype.create = function () {
        this.startStarScenes();
        this.events.on("sleep", this.onSleep, this);
    };
    StarSceneControllerScene.prototype.startStarScenes = function () {
        this.scene.add("spaceStar", SpaceStarScene_1.default, true, {
            starsPerCell: 100,
            starSize: 3,
            starScroll: 1
        });
        this.scene.sendToBack("spaceStar");
        this.scene.add("spaceStar2", SpaceStarScene_1.default, true, {
            starsPerCell: 124,
            starSize: 2,
            starScroll: 0.73
        });
        this.scene.sendToBack("spaceStar2");
        this.scene.add("spaceStar3", SpaceStarScene_1.default, true, {
            starsPerCell: 250,
            starSize: 1,
            starScroll: 0.56
        });
        this.scene.sendToBack("spaceStar3");
        this.starScenesSleeping = false;
    };
    StarSceneControllerScene.prototype.onSleep = function () {
        this.scene.sleep("spaceStar");
        this.scene.sleep("spaceStar2");
        this.scene.sleep("spaceStar3");
        this.starScenesSleeping = true;
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