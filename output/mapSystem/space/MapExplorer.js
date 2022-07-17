"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MapExplorer = (function () {
    function MapExplorer(scene) {
        this.open = false;
        this.scene = scene;
        this.open = false;
        this.init();
    }
    MapExplorer.prototype.init = function () {
        var scene = this.scene;
        this.starScene = scene.scene.get("starSceneController");
        var spaceScene = scene.scene.get("space");
        this.world = spaceScene.world;
        var spaceCam = this.spaceCam = spaceScene.cameras.main;
        var mainCam = scene.cameras.main;
        var background = this.background = scene.add.graphics().setScrollFactor(0);
        background.fillStyle(0x000000);
        background.fillRect(0, 0, mainCam.width, mainCam.height);
        this.innerCam = scene.cameras.add(0, 0, mainCam.x, mainCam.y).setVisible(false);
        this.innerCam.setScroll(spaceCam.scrollX, spaceCam.scrollY);
        this.starsRT = scene.add.renderTexture(0, 0, mainCam.width, mainCam.height).setScrollFactor(0);
        this.rt = scene.add.renderTexture(0, 0, mainCam.width, mainCam.height).setScrollFactor(0);
        this.infoText = scene.add.text(550, 20, "(?, ?)");
        this.initControls();
    };
    MapExplorer.prototype.updateStarsRT = function (cam, drawBackObjs) {
        var rt = this.starsRT;
        var rf = (1 - 1 / cam.zoom);
        rt.beginDraw();
        drawBackObjs(rt, cam, 4, rf * this.spaceCam.width, rf * this.spaceCam.height, 3);
        rt.endDraw();
    };
    MapExplorer.prototype.updateRT = function (zoom, scrollX, scrollY, cam) {
        var camHalfWidth = cam.width * 0.5;
        var camHalfHeight = cam.height * 0.5;
        var r_zoom = zoom * cam.zoom;
        var visibleObjects = this.world.getObjectsInBox(scrollX - camHalfWidth / r_zoom, scrollY - camHalfHeight / r_zoom, scrollX + camHalfWidth / r_zoom, scrollY + camHalfHeight / r_zoom);
        var rt = this.rt;
        this.rt.clear();
        var rf = (1 - 1 / zoom);
        var h_zoom = (zoom / 0.5);
        rt.camera.setZoom(zoom);
        rt.camera.scrollX = scrollX + (cam.width - rt.camera.width * rf) * 0.5 - rt.camera.width / h_zoom;
        rt.camera.scrollY = scrollY + (cam.height - rt.camera.height * rf) * 0.5 - rt.camera.height / h_zoom;
        rt.beginDraw();
        for (var i = 0; i < visibleObjects.length; i++) {
            var obj = visibleObjects[i];
            if (this.filterGameObject(obj)) {
                rt.batchDraw(obj, obj.x, obj.y);
            }
        }
        rt.endDraw();
    };
    MapExplorer.prototype.filterGameObject = function (obj) {
        return (obj._arrayName === "planet" || obj._arrayName === "nebula" || obj._arrayName === "shrapnel");
    };
    MapExplorer.prototype.setMask = function (mask) {
        this.rt.setMask(mask);
        this.starsRT.setMask(mask);
    };
    MapExplorer.prototype.setVisibility = function (visibility) {
        this.background.setVisible(visibility);
        this.rt.setVisible(visibility);
        this.starsRT.setVisible(visibility);
        this.infoText.setVisible(visibility);
    };
    MapExplorer.prototype.render = function () {
        if (!this.open) {
            this.setVisibility(false);
            return;
        }
        this.setVisibility(true);
        var starScene = this.starScene;
        this.updateStarsRT(this.innerCam, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            starScene.updateToRenderTexture.apply(starScene, args);
        });
        var _a = this.innerCam, zoom = _a.zoom, scrollX = _a.scrollX, scrollY = _a.scrollY;
        this.updateRT(zoom, scrollX, scrollY, this.spaceCam);
        this.infoText.setText("(" + scrollX.toFixed(2) + ", " + scrollY.toFixed(2) + ")");
    };
    MapExplorer.prototype.getZoom = function () {
        return this.innerCam.zoom;
    };
    MapExplorer.prototype.getCamera = function () {
        return this.innerCam;
    };
    MapExplorer.prototype.renderTracker = function (tracker) {
        tracker.render(this.rt);
    };
    MapExplorer.prototype.update = function () {
        if (!this.open) {
            return;
        }
        this.updateControls();
    };
    MapExplorer.prototype.initControls = function () {
        var _this = this;
        this.controlsSpeed = 10.0;
        this.keys = this.scene.input.keyboard.addKeys("W,A,S,D,LEFT,RIGHT,UP,DOWN,SPACE");
        this.innerCam.zoom = 1.0;
        this.scene.input.on('wheel', function (pointer, currentlyOver, dx, dy, dz) {
            _this.innerCam.zoom = Math.min(Math.max(_this.innerCam.zoom * (1 - dy * 0.001), 0.005), 2.5);
        });
        this.resetZoomKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO);
    };
    MapExplorer.prototype.updateControls = function () {
        var innerCam = this.innerCam;
        var zoom = innerCam.zoom;
        if (this.keys.LEFT.isDown || this.keys.A.isDown) {
            innerCam.scrollX -= this.controlsSpeed / zoom;
        }
        if (this.keys.RIGHT.isDown || this.keys.D.isDown) {
            innerCam.scrollX += this.controlsSpeed / zoom;
        }
        if (this.keys.UP.isDown || this.keys.W.isDown) {
            innerCam.scrollY -= this.controlsSpeed / zoom;
        }
        if (this.keys.DOWN.isDown || this.keys.D.isDown) {
            innerCam.scrollY += this.controlsSpeed / zoom;
        }
        if (this.keys.SPACE.isDown) {
            innerCam.scrollX = this.spaceCam.scrollX;
            innerCam.scrollY = this.spaceCam.scrollY;
        }
        if (this.resetZoomKey.isDown) {
            this.innerCam.zoom = 1.0;
        }
    };
    return MapExplorer;
}());
exports.default = MapExplorer;
//# sourceMappingURL=MapExplorer.js.map