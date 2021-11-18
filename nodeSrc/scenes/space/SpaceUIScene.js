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
var SpaceUIScene = (function (_super) {
    __extends(SpaceUIScene, _super);
    function SpaceUIScene() {
        return _super.call(this, "spaceUI") || this;
    }
    SpaceUIScene.prototype.create = function () {
        this.spaceScene = this.scene.get("space");
        this.spaceCameraControllerScene = this.scene.get("spaceCameraController");
        this.statsGraphics = this.add.graphics().setDepth(10);
        this.testText = this.add.text(69000, 61000, "This is a test!");
        var statsContainer = this.add.image(0, this.game.config.height - 116 * 1.25, "shipHealthBar", 1).setScrollFactor(0).setScale(2.5).setOrigin(0).setFlipX(true);
        var statsHpBar = this.add.image(0, this.game.config.height - 116 * 1.25, "shipHealthBar", 2).setScrollFactor(0).setScale(2.5).setOrigin(0).setFlipX(true);
        this.statsHpMask = this.add.image(0, this.game.config.height - 116 * 1.25, "shipHealthBar", 2).setScrollFactor(0).setScale(2.5).setOrigin(0).setFlipX(true);
        this.statsHpMask.setVisible(false);
        statsHpBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.statsHpMask);
        this.statsHpMask.y += 30;
    };
    SpaceUIScene.prototype.update = function (time, delta) {
        var mainCam = this.spaceCameraControllerScene.cameras.main;
        var cam = this.cameras.main;
        cam.setScroll(scrollX, scrollY);
        cam.setRoundPixels(true);
        cam.setAngle(this.spaceCameraControllerScene.getCameraAngle());
    };
    SpaceUIScene.prototype.updateShipStatsGraphics = function () {
    };
    return SpaceUIScene;
}(Phaser.Scene));
exports.default = SpaceUIScene;
//# sourceMappingURL=SpaceUIScene.js.map