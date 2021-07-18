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
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpaceStarScene.prototype.preload = function () {
        this.load.scenePlugin({
            key: "CartesianSystemPlugin",
            url: "./libraries/CartesianSystemPlugin.js",
            sceneKey: 'csStars'
        });
        this.load.spritesheet("starSheet1" + this.scene.key, "./assets/Space/Stars/Stars.png", {
            frameWidth: 12,
            frameHeight: 12
        });
    };
    SpaceStarScene.prototype.create = function (data) {
        this.starsPerCell = data.starsPerCell;
        this.starSize = data.starSize;
        this.starScroll = (!data.starScroll || data.starScroll <= 0) ? 1 : data.starScroll;
        this.spaceScene = this.scene.get("space");
        this.spaceCameraControllerScene = this.scene.get("spaceCameraController");
        this.csStars.initWorld(this.spaceScene.cspConfig);
        var bounds = this.csStars.world.bounds;
        var width = bounds.maxX - bounds.minX;
        var height = bounds.maxY - bounds.minY;
        this.subScrollX = (width - width / this.starScroll) * this.starScroll;
        this.subScrollY = (height - height / this.starScroll) * this.starScroll;
        this.star0 = this.add.image(0, 0, "starSheet1" + this.scene.key, 0);
        this.blueStar0 = this.add.image(0, 0, "blueStar0").setScrollFactor(0);
        var screenWidth = this.game.config.width;
        var screenHeight = this.game.config.height;
        this.rt = this.add.renderTexture(0, 0, screenWidth, screenHeight).setOrigin(0, 0).setScale(2);
        this.rt.setScrollFactor(0);
    };
    SpaceStarScene.prototype.update = function () {
        var mainCam = this.spaceCameraControllerScene.cameras.main;
        var w = mainCam.width / 2;
        var h = mainCam.height / 2;
        var scrollX = mainCam.scrollX * this.starScroll - this.subScrollX - (w - w * this.starScroll);
        var scrollY = mainCam.scrollY * this.starScroll - this.subScrollY - (h - h * this.starScroll);
        var cam = this.cameras.main;
        cam.setScroll(scrollX, scrollY);
        cam.setZoom(mainCam.zoom);
        cam.setRoundPixels(true);
        cam.setAngle(this.spaceCameraControllerScene.getCameraAngle());
        var world = this.spaceScene.csp.world;
        this.csStars.world.camera.setWindow(world.camera.x, world.camera.y, world.camera.width + Math.floor(world.camera.width / mainCam.zoom), world.camera.height + Math.floor(world.camera.height / mainCam.zoom));
        var follow = this.spaceScene.getCameraTarget();
        this.csStars.setFollow(follow.x * this.starScroll - this.subScrollX, follow.y * this.starScroll - this.subScrollY);
        this.csStars.updateWorld();
        this.sys.displayList.add(this.rt);
        this.renderStars();
    };
    SpaceStarScene.prototype.renderStars = function () {
        var _this = this;
        var world = this.csStars.world;
        var cellWidth = world.cameraGrid.cellWidth;
        var cellHeight = world.cameraGrid.cellHeight;
        var mainCam = this.cameras.main;
        var mainWorld = this.spaceScene.csp.world;
        var cspConfig = this.spaceScene.cspConfig;
        this.rt.clear();
        this.rt.beginDraw();
        world.loopThroughVisibleCells(function (cell, col, row) {
            var rng = new Phaser.Math.RandomDataGenerator([(col + row).toString()]);
            for (var i = 0; i < 22; i++) {
                _this.rt.batchDraw(_this.star0, col * cellWidth - mainCam.scrollX + cellWidth * rng.frac(), row * cellHeight - mainCam.scrollY + cellHeight * rng.frac());
            }
        });
        this.rt.endDraw();
    };
    return SpaceStarScene;
}(Phaser.Scene));
exports.default = SpaceStarScene;
//# sourceMappingURL=SpaceStarScene.js.map