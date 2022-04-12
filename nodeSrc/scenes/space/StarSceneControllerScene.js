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
        this.load.image("starBackground1", "./assets/Space/Stars/Old/starBackground.png");
        this.load.image("starBackground2", "./assets/Space/Stars/Old/starBackground2.png");
        this.load.image("starBackground3", "./assets/Space/Stars/Old/starBackground3.png");
    };
    StarSceneControllerScene.prototype.create = function () {
        var cam = this.cameras.main;
        this.tileSprites = [];
        this.scrollValues = [0.65, 0.78, 1];
        var layerAmt = this.scrollValues.length;
        for (var i = 1; i <= layerAmt; i++) {
            this.tileSprites.push(this.add.tileSprite(0, 0, cam.width * 2, cam.height * 2, "starBackground" + i).setDepth(i - layerAmt));
        }
        this.scene.sendToBack("starSceneController");
    };
    StarSceneControllerScene.prototype.update = function (time, delta) {
        var cam = this.scene.get("space").cameras.main;
        for (var i = 0; i < this.tileSprites.length; i++) {
            var tileSprite = this.tileSprites[i];
            tileSprite.tilePositionX = cam.scrollX * this.scrollValues[i];
            tileSprite.tilePositionY = cam.scrollY * this.scrollValues[i];
            tileSprite.tileScaleX = cam.zoomX;
            tileSprite.tileScaleY = cam.zoomY;
        }
    };
    StarSceneControllerScene.prototype.startStarScenes = function () {
        var spaceScene = this.scene.get("space");
        var cellWidth = 2048;
        var cellHeight = 2048;
        for (var i = 1; i <= 3; i++) {
            this.scene.add("spaceStar" + i, SpaceStarScene_1.default, true, {
                starScroll: 0.7,
                imageKey: "starBackground" + i,
                cspConfig: {
                    window: {
                        width: spaceScene.cspConfig.width,
                        height: spaceScene.cspConfig.height
                    },
                    grid: {
                        cols: 204800 / cellWidth,
                        rows: 204800 / cellHeight,
                        cellWidth: cellWidth,
                        cellHeight: cellHeight,
                    }
                }
            });
        }
        this.scene.sendToBack("spaceStar3");
        this.scene.sendToBack("spaceStar2");
        this.scene.sendToBack("spaceStar1");
    };
    return StarSceneControllerScene;
}(Phaser.Scene));
exports.default = StarSceneControllerScene;
//# sourceMappingURL=StarSceneControllerScene.js.map