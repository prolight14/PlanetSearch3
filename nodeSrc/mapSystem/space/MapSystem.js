"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MapSystem = (function () {
    function MapSystem() {
    }
    MapSystem.prototype.createMap = function (scene, x, y, width, height) {
        this.world = scene.scene.get("space").world;
        this.staticRT = scene.add.renderTexture(x, y, width, height);
        this.rt = scene.add.renderTexture(x, y, width, height);
        var roundAmt = 40;
        var shape = scene.add.graphics();
        shape.fillStyle(0xFFFFFF);
        shape.beginPath();
        shape.fillRoundedRect(x, y, width, height, { tl: roundAmt, tr: 0, bl: 0, br: 0 });
        shape.setVisible(false);
        var mask = shape.createGeometryMask();
        this.staticRT.setMask(mask);
        this.rt.setMask(mask);
        var tint = 0x9CFFC1;
        this.staticRT.setTint(tint);
        this.rt.setTint(tint);
        var backGraphics = this.backGraphics = scene.add.graphics();
        backGraphics.fillStyle(0x000000);
        backGraphics.fillRoundedRect(x, y, width, height, { tl: roundAmt, tr: 0, bl: 0, br: 0 });
        backGraphics.setVisible(false);
        backGraphics.setMask(mask);
        backGraphics.setDepth(-1);
    };
    MapSystem.prototype.updateMap = function (zoom, cam, drawBackObjs) {
        var rt = this.rt;
        var camHalfWidth = cam.width * 0.5;
        var camHalfHeight = cam.height * 0.5;
        var visibleObjects = this.world.getObjectsInBox(cam.scrollX - camHalfWidth / zoom, cam.scrollY - camHalfWidth / zoom, cam.scrollX + camHalfHeight / zoom, cam.scrollY + camHalfHeight / zoom);
        this.rt.clear();
        var rf = (1 - 1 / zoom);
        rt.camera.setZoom(zoom);
        rt.camera.scrollX = cam.scrollX + (cam.width - rt.camera.width * rf) / 2 - rt.camera.width * 0.5 / zoom;
        rt.camera.scrollY = cam.scrollY + (cam.height - rt.camera.height * rf) / 2 - rt.camera.height * 0.5 / zoom;
        rt.beginDraw();
        for (var i = 0; i < visibleObjects.length; i++) {
            var obj = visibleObjects[i];
            rt.batchDraw(obj, obj.x, obj.y);
        }
        rt.endDraw();
        this.staticRT.clear();
        if (zoom < 0.125) {
            this.backGraphics.setVisible(true);
            return;
        }
        this.backGraphics.setVisible(false);
        this.staticRT.beginDraw();
        var starZoom = 4;
        drawBackObjs(this.staticRT, this.rt.camera, starZoom, rf * cam.width, rf * cam.height);
        this.staticRT.endDraw();
    };
    return MapSystem;
}());
exports.default = MapSystem;
//# sourceMappingURL=MapSystem.js.map