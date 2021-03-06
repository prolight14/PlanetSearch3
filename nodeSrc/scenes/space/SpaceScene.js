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
var PlayerShip_1 = require("../../gameObjects/space/PlayerShip");
var SpaceScene = (function (_super) {
    __extends(SpaceScene, _super);
    function SpaceScene() {
        return _super.call(this, "space") || this;
    }
    SpaceScene.prototype.preload = function () {
        this.load.image("playerShip", "./assets/playership.png");
        this.load.scenePlugin({
            key: "CartesianSystemPlugin",
            url: "./libraries/CartesianSystemPlugin.js",
            sceneKey: 'csp'
        });
    };
    SpaceScene.prototype.create = function () {
        this.cspConfig = {
            window: {
                width: this.game.config.width,
                height: this.game.config.height
            },
            grid: {
                cols: 182,
                rows: 182,
                cellWidth: 800,
                cellHeight: 800
            }
        };
        this.csp.initWorld(this.cspConfig);
        this.addGameObjects();
        this.csp.syncWithGrid();
        this.runScenes();
    };
    SpaceScene.prototype.addGameObjects = function () {
        var playerShip = this.csp.world.add.gameObjectArray(PlayerShip_1.default).add(this, 69000, 69000, "playerShip");
        this.setCameraTarget(playerShip);
    };
    SpaceScene.prototype.setCameraTarget = function (target) {
        this.cameraTarget = target;
        this.cameras.main.startFollow(target);
    };
    SpaceScene.prototype.getCameraTarget = function () {
        return this.cameraTarget;
    };
    SpaceScene.prototype.runScenes = function () {
        this.scene.run("spaceCameraController");
        this.scene.run("spaceUIDebug");
        this.scene.add("spaceStar", SpaceStarScene_1.default, true, {
            starsPerCell: 100,
            starSize: 3,
            starScroll: 1
        });
        this.scene.sendToBack("spaceStar");
        this.scene.add("spaceStar2", SpaceStarScene_1.default, true, {
            starsPerCell: 124,
            starSize: 2,
            starScroll: 0.8
        });
        this.scene.sendToBack("spaceStar2");
        this.scene.add("spaceStar3", SpaceStarScene_1.default, true, {
            starsPerCell: 357,
            starSize: 1,
            starScroll: 0.56
        });
        this.scene.sendToBack("spaceStar3");
        this.scene.add("spaceStar4", SpaceStarScene_1.default, true, {
            starsPerCell: 700,
            starSize: 1,
            starScroll: 0.45
        });
        this.scene.sendToBack("spaceStar4");
    };
    SpaceScene.prototype.update = function (time, delta) {
        var follow = this.getCameraTarget();
        this.csp.setFollow(follow.x, follow.y);
        this.csp.updateWorld();
    };
    return SpaceScene;
}(Phaser.Scene));
exports.default = SpaceScene;
//# sourceMappingURL=SpaceScene.js.map