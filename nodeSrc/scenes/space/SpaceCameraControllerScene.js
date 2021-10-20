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
        var _this = this;
        this.spaceScene = this.scene.get("space");
        this.spaceDebugScene = this.scene.get("spaceDebug");
        this.input.on('wheel', function (pointer, currentlyOver, dx, dy, dz) {
            var cam = _this.cameras.main;
            _this.updateZoom(Math.min(Math.max(cam.zoom - dy * 0.001, 0.3), 4));
        });
        this.keys = {
            rotateLeft: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            rotateRight: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            rotateReset: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO)
        };
        this.camAngle = 0;
        this.angleSpeed = 2;
        this.updateZoom(1);
    };
    SpaceCameraControllerScene.prototype.getCameraAngle = function () {
        return this.camAngle;
    };
    SpaceCameraControllerScene.prototype.updateZoom = function (zoom) {
        var cam = this.cameras.main;
        cam.setZoom(zoom);
        this.spaceScene.cameras.main.setZoom(cam.zoom);
        this.spaceDebugScene.cameras.main.setZoom(cam.zoom);
        cam.roundPixels = true;
        this.spaceDebugScene.cameras.main.setRoundPixels(true);
        this.resizeCSPCameraWindow();
    };
    SpaceCameraControllerScene.prototype.adjustCameraAngle = function (angle) {
        this.cameras.main.setAngle(angle);
        this.spaceScene.cameras.main.setAngle(angle);
        this.spaceDebugScene.cameras.main.setAngle(angle);
        this.resizeCSPCameraWindow();
    };
    SpaceCameraControllerScene.prototype.update = function () {
        var cam = this.cameras.main;
        var cameraTarget = this.spaceScene.getCameraTarget();
        cam.setScroll(cameraTarget.x - cam.width / 2, cameraTarget.y - cam.height / 2);
        this.spaceDebugScene.cameras.main.setScroll(cam.scrollX, cam.scrollY);
        if (this.keys.rotateLeft.isDown) {
            this.camAngle -= this.angleSpeed;
            this.adjustCameraAngle(this.camAngle);
        }
        if (this.keys.rotateRight.isDown) {
            this.camAngle += this.angleSpeed;
            this.adjustCameraAngle(this.camAngle);
        }
        if (this.keys.rotateReset.isDown) {
            this.camAngle = 0;
            this.adjustCameraAngle(this.camAngle);
            this.updateZoom(1);
        }
    };
    SpaceCameraControllerScene.prototype.resizeCSPCameraWindow = function () {
        var world = this.spaceScene.csp.world;
        var cspConfig = this.spaceScene.cspConfig;
        var cam = this.cameras.main;
        var c_width = cspConfig.window.width;
        var c_height = cspConfig.window.height;
        var x = Math.abs(c_width - c_width / cam.zoom) / -2;
        var y = Math.abs(c_height - c_height / cam.zoom) / -2;
        var width = c_width / cam.zoom + x * -2;
        var height = c_height / cam.zoom + y * -2;
        var prev_width = Math.abs(x) + width;
        var prev_height = Math.abs(y) + height;
        var prev_halfWidth = prev_width / 2;
        var prev_halfHeight = prev_height / 2;
        var reuseHyp = Math.sqrt(Math.pow(prev_halfWidth, 2) + Math.pow(prev_halfHeight, 2));
        var startingAngle = Math.atan2(prev_halfHeight, prev_halfWidth) + this.camAngle * Phaser.Math.DEG_TO_RAD;
        var upperLeft = {};
        var lowerLeft = {};
        var upperRight = {};
        var lowerRight = {};
        upperLeft.angle = startingAngle + Math.PI * 1.5;
        upperLeft.x = Math.cos(upperLeft.angle) * reuseHyp;
        upperLeft.y = Math.sin(upperLeft.angle) * reuseHyp;
        lowerLeft.angle = startingAngle + Math.PI;
        lowerLeft.x = Math.cos(lowerLeft.angle) * reuseHyp;
        lowerLeft.y = Math.sin(lowerLeft.angle) * reuseHyp;
        upperRight.angle = startingAngle;
        upperRight.x = Math.cos(upperRight.angle) * reuseHyp;
        upperRight.y = Math.sin(upperRight.angle) * reuseHyp;
        lowerRight.angle = startingAngle + Math.PI / 2;
        lowerRight.x = Math.cos(lowerRight.angle) * reuseHyp;
        lowerRight.y = Math.sin(lowerRight.angle) * reuseHyp;
        var minX = Math.min(upperLeft.x, lowerLeft.x, upperRight.x, lowerRight.x);
        var maxX = Math.max(upperLeft.x, lowerLeft.x, upperRight.x, lowerRight.x);
        var minY = Math.min(upperLeft.y, lowerLeft.y, upperRight.y, lowerRight.y);
        var maxY = Math.max(upperLeft.y, lowerLeft.y, upperRight.y, lowerRight.y);
        minX -= Math.abs(x);
        maxX -= Math.abs(x);
        minY -= Math.abs(y);
        maxY -= Math.abs(y);
        x = minX / 2;
        y = minY / 2;
        width = maxX - minX;
        height = maxY - minY;
        world.camera.setWindow(x, y, width, height);
    };
    return SpaceCameraControllerScene;
}(Phaser.Scene));
exports.default = SpaceCameraControllerScene;
//# sourceMappingURL=SpaceCameraControllerScene.js.map