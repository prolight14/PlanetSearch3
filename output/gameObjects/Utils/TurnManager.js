"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TurnManager = (function () {
    function TurnManager(followObject) {
        this.targetAngle = 0;
        this.turning = false;
        this.followObject = followObject;
    }
    TurnManager.prototype.startTurning = function (angle, callback) {
        this.targetAngle = Phaser.Math.Wrap(angle, -180, 180);
        this.callback = callback || function () { };
        this.turning = true;
    };
    TurnManager.prototype.isTurning = function () {
        return this.turning;
    };
    TurnManager.prototype.update = function () {
        if (!this.turning) {
            return;
        }
        var followObject = this.followObject;
        var angleDiff = Phaser.Math.Wrap(this.targetAngle - followObject.angle, 0, 360);
        if (Math.abs(angleDiff) <= followObject.angleVel || followObject.angle === this.targetAngle) {
            followObject.angle = this.targetAngle;
            followObject.turnDir = "";
            this.turning = false;
            this.callback();
            return;
        }
        followObject.turnDir = (angleDiff > 180) ? "left" : "right";
    };
    return TurnManager;
}());
exports.default = TurnManager;
//# sourceMappingURL=TurnManager.js.map