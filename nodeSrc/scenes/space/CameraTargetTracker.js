"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CameraTargetTracker = (function () {
    function CameraTargetTracker(object) {
        if (object) {
            this.trackedObject = object;
            this.x = object.x;
            this.y = object.y;
        }
    }
    CameraTargetTracker.prototype.setTrackedObject = function (object) {
        this.trackedObject = object;
        this.x = object.x;
        this.y = object.y;
    };
    CameraTargetTracker.prototype.update = function () {
        if (this.trackedObject && this.trackedObject.body && this.trackedObject.body.position) {
            this.x = this.trackedObject.x;
            this.y = this.trackedObject.y;
        }
    };
    return CameraTargetTracker;
}());
exports.default = CameraTargetTracker;
//# sourceMappingURL=CameraTargetTracker.js.map