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
var SpaceGameObject_1 = require("./SpaceGameObject");
var Ship = (function (_super) {
    __extends(Ship, _super);
    function Ship(scene, x, y, texture, frame, config) {
        var _this = _super.call(this, scene, x, y, texture, frame, config) || this;
        _this.maxSpeed = 5;
        _this.angleAcl = 0.4;
        _this.angleDeacl = 0.1;
        _this.maxAngleVel = 3;
        _this.useAngleAcl = false;
        _this.speed = 0;
        return _this;
    }
    Ship.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        if (this.useAngleAcl) {
            if (this.controls.turnLeft()) {
                this.angleVel -= this.angleAcl;
            }
            if (this.controls.turnRight()) {
                this.angleVel += this.angleAcl;
            }
            this.angleVel = Math.min(Math.max(this.angleVel, -this.maxAngleVel), this.maxAngleVel);
            if (!this.controls.turnLeft() && !this.controls.turnRight()) {
                if (this.angleVel > 0) {
                    this.angleVel -= this.angleDeacl;
                }
                if (this.angleVel < 0) {
                    this.angleVel += this.angleDeacl;
                }
                if (this.angleVel > -this.angleDeacl && this.angleVel < this.angleDeacl) {
                    this.angleVel = 0;
                }
            }
            this.setAngle(this.angle + this.angleVel);
        }
        else {
            if (this.controls.turnLeft()) {
                this.setAngle(this.angle - this.angleVel);
            }
            if (this.controls.turnRight()) {
                this.setAngle(this.angle + this.angleVel);
            }
        }
        if (this.controls.goForward()) {
            this.speed += 0.5;
        }
        else {
            if (this.speed > 0) {
                this.speed -= 0.05;
            }
            else {
                this.speed = 0;
            }
        }
        if (this.controls.slowDown()) {
            if (this.speed > 0) {
                this.speed -= 0.35;
            }
            else {
                this.speed = 0;
            }
        }
        this.speed = Math.min(this.speed, this.maxSpeed);
        var angle = Phaser.Math.DEG_TO_RAD * (this.angle - 90);
        this.x += Math.cos(angle) * this.speed;
        this.y += Math.sin(angle) * this.speed;
        this.bodyConf.update();
    };
    return Ship;
}(SpaceGameObject_1.default));
exports.default = Ship;
//# sourceMappingURL=Ship.js.map