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
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.starImages = [];
        _this.texKeys = [];
        return _this;
    }
    SpaceStarScene.prototype.preload = function () {
        this.load.scenePlugin({
            key: "CartesianSystemPlugin",
            url: "./libraries/CartesianSystemPlugin.js",
            sceneKey: 'csStars'
        });
    };
    SpaceStarScene.prototype.create = function (data) {
        this.starsPerCell = data.starsPerCell;
        this.starSize = data.starSize;
        this.starScroll = (!data.starScroll || data.starScroll <= 0) ? 1 : data.starScroll;
        this.spaceScene = this.scene.get("space");
        this.spaceCameraControllerScene = this.scene.get("spaceCameraController");
        this.csStars.initWorld(this.spaceScene.cspConfig);
        this.stars = this.add.graphics();
        var bounds = this.csStars.world.bounds;
        var width = bounds.maxX - bounds.minX;
        var height = bounds.maxY - bounds.minY;
        this.subScrollX = (width - width / this.starScroll) * this.starScroll;
        this.subScrollY = (height - height / this.starScroll) * this.starScroll;
        this.loadCellImages();
    };
    SpaceStarScene.prototype.loadCellImages = function () {
        this.starImages.push(this.add.image(0, 0, "blueStar0"));
        var world = this.csStars.world;
        var cellWidth = world.cameraGrid.cellWidth;
        var cellHeight = world.cameraGrid.cellHeight;
        for (var i = (this.spaceScene.quickLoad ? 1 : 10); i >= 0; i--) {
            var texKey = "starCell" + this.scene.key + i.toString();
            var curRT = this.createCellImage(cellWidth, cellHeight, texKey);
            curRT.saveTexture(texKey);
            curRT.destroy();
            this.texKeys.push(texKey);
        }
        this.imgGroup = this.add.group();
    };
    SpaceStarScene.prototype.createCellImage = function (cellWidth, cellHeight, seed) {
        if (seed === undefined) {
            seed = 0;
        }
        var rt = this.add.renderTexture(0, 0, cellWidth, cellHeight);
        var rng = new Phaser.Math.RandomDataGenerator([seed.toString()]);
        for (var i = 0, _l = rng.between(20, 110); i < _l; i++) {
            rt.draw(this.starImages[0], rng.frac() * cellWidth, rng.frac() * cellHeight);
        }
        return rt;
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
        this.csStars.world.camera.setWindow(world.camera.x, world.camera.y, Math.floor(world.camera.width * (1 / mainCam.zoom)), Math.floor(world.camera.height * (1 / mainCam.zoom)));
        var follow = this.spaceScene.getCameraTarget();
        this.csStars.setFollow(follow.x * this.starScroll - this.subScrollX, follow.y * this.starScroll - this.subScrollY);
        this.csStars.updateWorld();
        this.sys.displayList.add(this.stars);
        this.renderStars();
    };
    SpaceStarScene.prototype.renderStars = function () {
        var _this = this;
        var stars = this.stars;
        stars.clear();
        stars.fillStyle(0xFFFFFF);
        var world = this.csStars.world;
        var cellWidth = world.cameraGrid.cellWidth;
        var cellHeight = world.cameraGrid.cellHeight;
        this.imgGroup.clear(true, true);
        world.loopThroughVisibleCells(function (cell, col, row) {
            var rng = new Phaser.Math.RandomDataGenerator([(col + row).toString()]);
            _this.imgGroup.create(col * cellWidth, row * cellHeight, _this.texKeys[Math.floor(rng.frac() * _this.texKeys.length)]);
        });
    };
    return SpaceStarScene;
}(Phaser.Scene));
exports.default = SpaceStarScene;
//# sourceMappingURL=SpaceStarScene.js.map