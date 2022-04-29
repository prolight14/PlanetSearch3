"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MapSystem = (function () {
    function MapSystem() {
    }
    MapSystem.prototype.createMap = function (scene, x, y, width, height) {
        this.world = scene.scene.get("space").world;
        this.backGraphics = scene.add.graphics();
        this.backGraphics.fillStyle(0x000000);
        this.backGraphics.fillRoundedRect(x, y, width, height, { tl: 20, tr: 0, bl: 0, br: 0 });
        this.rt = scene.add.renderTexture(x, y, width, height);
    };
    MapSystem.prototype.updateMap = function (cam, starsTileSprites) {
        var rt = this.rt;
        var camHalfWidth = cam.width * 0.5;
        var camHalfHeight = cam.height * 0.5;
        var zoom = 0.175;
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
        for (var i = 0; i < starsTileSprites.length; i++) {
            var tileSprite = starsTileSprites[i];
            rt.batchDraw(tileSprite, tileSprite.x, tileSprite.y);
        }
        rt.endDraw();
    };
    return MapSystem;
}());
exports.default = MapSystem;
//# sourceMappingURL=MapSystem.js.map