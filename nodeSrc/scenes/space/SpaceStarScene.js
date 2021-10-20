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
        if (!this.textures.exists("backstars1")) {
            this.load.image("backstars1", "./assets/Space/Stars/backstars1.png");
        }
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
        this.stars = this.add.graphics();
        var screenWidth = this.game.config.width;
        var screenHeight = this.game.config.height;
        this.rt = this.add.renderTexture(0, 0, screenWidth, screenHeight);
        this.cameras.main.ignore(this.rt);
        this.backstars1 = this.add.image(0, 0, "backstars1");
        this.frontCamera = this.cameras.add();
        this.frontCamera.setOrigin(0, 0);
        this.frontCamera.ignore(this.rt);
        this.frontCamera.startFollow(this.cameras.main);
        this.backCamera = this.cameras.add(0, 0, screenWidth, screenHeight);
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
        this.sys.displayList.add(this.stars);
        this.sys.displayList.add(this.rt);
        this.renderStars();
        this.frontCamera.zoom = cam.zoom;
    };
    SpaceStarScene.prototype.renderStars = function () {
        var _this = this;
        var world = this.csStars.world;
        var mainCam = this.cameras.main;
        var cellWidth = world.cameraGrid.cellWidth;
        var cellHeight = world.cameraGrid.cellHeight;
        this.rt.camera.x = -this.frontCamera.scrollX * this.frontCamera.zoom;
        this.rt.camera.y = -this.frontCamera.scrollY * this.frontCamera.zoom;
        this.rt.camera.zoom = this.frontCamera.zoom;
        this.rt.camera.setAngle(this.scene.get("spaceCameraController").getCameraAngle());
        this.rt.clear();
        this.rt.beginDraw();
        world.loopThroughVisibleCells(function (cell, col, row) {
            _this.rt.batchDraw(_this.backstars1, Math.floor(col * cellWidth - mainCam.scrollX), Math.floor(row * cellHeight - mainCam.scrollY));
            _this.rt.batchDraw(_this.backstars1, Math.floor(col * cellWidth - mainCam.scrollX) + 300, Math.floor(row * cellHeight - mainCam.scrollY));
            _this.rt.batchDraw(_this.backstars1, Math.floor(col * cellWidth - mainCam.scrollX), Math.floor(row * cellHeight - mainCam.scrollY) + 300);
            _this.rt.batchDraw(_this.backstars1, Math.floor(col * cellWidth - mainCam.scrollX) + 300, Math.floor(row * cellHeight - mainCam.scrollY) + 300);
        });
        this.rt.endDraw();
    };
    return SpaceStarScene;
}(Phaser.Scene));
exports.default = SpaceStarScene;
//# sourceMappingURL=SpaceStarScene.js.map