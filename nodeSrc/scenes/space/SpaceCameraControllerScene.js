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
var SpaceCameraControllerScene = (function (_super) {
    __extends(SpaceCameraControllerScene, _super);
    function SpaceCameraControllerScene() {
        return _super.call(this, "spaceCameraController") || this;
    }
    SpaceCameraControllerScene.prototype.create = function () {
        var cam = this.cameras.main;
        var spaceScene = this.scene.get("space");
        var spaceDebugScene = this.scene.get("spaceDebug");
        var spaceStarScene = this.scene.get("spaceStar");
        this.input.on('wheel', function (pointer, currentlyOver, dx, dy, dz) {
            cam.setZoom(Math.min(Math.max(cam.zoom - dy * 0.001, 0.34), 1.5));
            spaceScene.cameras.main.setZoom(cam.zoom);
            spaceDebugScene.cameras.main.setZoom(cam.zoom);
            spaceStarScene.cameras.main.setZoom(cam.zoom);
        });
    };
    SpaceCameraControllerScene.prototype.update = function () {
        var spaceCam = this.scene.get("space").cameras.main;
        this.scene.get("spaceStar").cameras.main.setScroll(spaceCam.scrollX, spaceCam.scrollY);
        this.scene.get("spaceDebug").cameras.main.setScroll(spaceCam.scrollX, spaceCam.scrollY);
    };
    return SpaceCameraControllerScene;
}(Phaser.Scene));
exports.default = SpaceCameraControllerScene;
//# sourceMappingURL=SpaceCameraControllerScene.js.map