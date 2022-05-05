"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var timer_1 = require("../../gameObjects/Utils/timer");
var ExplorationTracker = (function () {
    function ExplorationTracker(scene) {
        this.active = true;
        this.scene = scene;
        this.spaceScene = scene.scene.get("space");
        this.reset();
        this.graphics = scene.add.graphics();
    }
    ExplorationTracker.prototype.reset = function () {
        var _this = this;
        this.track = [];
        this.updateTrackTimer = timer_1.default(true, 100, function () {
            _this.updateTrack();
            _this.updateTrackTimer.reset();
        });
        this.path = new Phaser.Curves.Path();
        var world = this.spaceScene.world;
        var trackingObj = world.get.gameObject("playerShip", 0);
        this.path.moveTo(trackingObj.body.position.x, trackingObj.body.position.y);
        this.active = true;
    };
    ExplorationTracker.prototype.update = function () {
        if (!this.active) {
            return;
        }
        this.updateTrackTimer.update();
    };
    ExplorationTracker.prototype.render = function (rt) {
        if (!this.active) {
            return;
        }
        this.renderTracks(rt);
    };
    ExplorationTracker.prototype.renderTracks = function (rt) {
        var graphics = this.graphics;
        var path = this.path;
        graphics.clear();
        graphics.lineStyle(6, 0x00FF00, 1.0);
        path.draw(graphics);
        rt.draw(graphics);
    };
    ExplorationTracker.prototype.updateTrack = function () {
        var world = this.spaceScene.world;
        var trackingObj = world.get.gameObject("playerShip", 0);
        this.addToTrack(trackingObj.x, trackingObj.y);
    };
    ExplorationTracker.prototype.addToTrack = function (x, y) {
        x |= 0;
        y |= 0;
        if (this.track.length !== 0) {
            var trackEnd = this.track[this.track.length - 1];
            if (trackEnd.x === x && trackEnd.y === y) {
                return;
            }
        }
        this.track.push(new Phaser.Math.Vector2(x, y));
        this.path.lineTo(x, y);
    };
    ExplorationTracker.prototype.createMask = function (cam) {
        var shape = this.scene.add.graphics();
        var viewCam = this.scene.cameras.main;
        var view = this.cullViewport;
        var v_width = view.width;
        var v_height = view.height;
        var v_halfWidth = view.width * 0.5;
        var v_halfHeight = view.height * 0.5;
        var track = this.track;
        var length = track.length;
        for (var i = 0; i < length; i++) {
            var point = track[i];
            shape.fillRect(point.x - v_halfWidth, point.y - v_halfHeight, v_width, v_height);
        }
        shape.setVisible(false).setScrollFactor(0);
        var zoom = cam.zoom;
        var rf = (1 - 1 / zoom);
        shape.x = -(cam.scrollX + viewCam.width * rf * 0.5) * zoom;
        shape.y = -(cam.scrollY + viewCam.height * rf * 0.5) * zoom;
        shape.setScale(cam.zoom);
        var mask = shape.createGeometryMask();
        return mask;
    };
    ExplorationTracker.prototype.setDiscoverViewport = function (width, height) {
        this.cullViewport = {
            width: width,
            height: height,
            halfWidth: width * 0.5,
            halfHeight: height * 0.5,
        };
    };
    return ExplorationTracker;
}());
exports.default = ExplorationTracker;
//# sourceMappingURL=ExplorationTracker.js.map