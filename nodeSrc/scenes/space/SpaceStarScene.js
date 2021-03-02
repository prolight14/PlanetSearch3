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
var SpaceStarScene = (function (_super) {
    __extends(SpaceStarScene, _super);
    function SpaceStarScene() {
        var _this = _super.call(this, "spaceStar") || this;
        _this.starsPerCell = 22;
        _this.starSize = 2;
        return _this;
    }
    SpaceStarScene.prototype.preload = function () {
        this.load.scenePlugin({
            key: "CartesianSystemPlugin",
            url: "./libraries/CartesianSystemPlugin.js",
            sceneKey: 'csStars'
        });
    };
    SpaceStarScene.prototype.create = function () {
        var spaceScene = this.scene.get("space");
        this.csStars.initWorld(spaceScene.cspConfig);
        this.stars = this.add.graphics();
    };
    SpaceStarScene.prototype.update = function () {
        var spaceScene = this.scene.get("space");
        this.csStars.setFollow(spaceScene.playerShip.x, spaceScene.playerShip.y);
        this.csStars.updateWorld();
        this.sys.displayList.add(this.stars);
        this.renderStars();
    };
    SpaceStarScene.prototype.renderStars = function () {
        var _this = this;
        this.stars.clear();
        this.stars.fillStyle(0xFFFFFF);
        this.stars.fillRect(69000, 69000, this.starSize, this.starSize);
        var world = this.csStars.world;
        var rng, i, x, y;
        var _a = world.cameraGrid, cellWidth = _a.cellWidth, cellHeight = _a.cellHeight;
        world.loopThroughVisibleCells(function (cell, col, row) {
            rng = new Phaser.Math.RandomDataGenerator([(col + row).toString()]);
            x = col * cellWidth;
            y = row * cellHeight;
            for (i = 0; i < _this.starsPerCell; i++) {
                _this.stars.fillRect(x + rng.between(0, cellWidth), y + rng.between(0, cellHeight), _this.starSize, _this.starSize);
            }
        });
    };
    SpaceStarScene.prototype.setCSPCameraWindow = function (x, y, width, height) {
        this.csStars.world.camera.setWindow(x, y, width, height);
    };
    return SpaceStarScene;
}(Phaser.Scene));
exports.default = SpaceStarScene;
//# sourceMappingURL=SpaceStarScene.js.map