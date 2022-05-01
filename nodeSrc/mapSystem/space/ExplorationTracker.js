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
        graphics.lineStyle(2, 0x00FFFF, 10.0);
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
    return ExplorationTracker;
}());
exports.default = ExplorationTracker;
//# sourceMappingURL=ExplorationTracker.js.map