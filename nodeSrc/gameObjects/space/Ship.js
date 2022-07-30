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
var Timer_1 = require("../Utils/Timer");
var trig_1 = require("../Utils/trig");
var SpaceGameObject_1 = require("./SpaceGameObject");
var Ship = (function (_super) {
    __extends(Ship, _super);
    function Ship(scene, x, y, texture, frame) {
        var _this = _super.call(this, scene, x, y, texture, frame) || this;
        _this.getType = function () {
            return "ship";
        };
        _this.maxHp = 10;
        _this.hp = 10;
        _this.damage = 1;
        _this.isShip = true;
        _this.usingGamepad = false;
        _this.maxSpeed = 5;
        _this.speedAcl = 0.5;
        _this.speedDeacl = 0.05;
        _this.manualSpeedDeacl = 0.35;
        _this.angleVel = 0.2;
        _this.angleAcl = 0.4;
        _this.angleDeacl = 0.1;
        _this.maxAngleVel = 3;
        _this.useAngleAcl = false;
        _this.speed = 0;
        return _this;
    }
    Ship.prototype.takeDamage = function (object) {
        this.hp -= object.getDamage(this);
        return true;
    };
    Ship.prototype.getMaxHp = function () {
        return this.maxHp;
    };
    Ship.prototype.getHp = function () {
        return this.hp;
    };
    Ship.prototype.getDamage = function () {
        return this.damage;
    };
    Ship.prototype.setShootInterval = function (interval) {
        var _this = this;
        this.shootTimer = Timer_1.default(true, interval, function () {
            _this.shoot();
            _this.shootTimer.reset();
        });
    };
    Ship.prototype.shoot = function () {
    };
    Ship.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        if (!this.usingGamepad) {
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
        }
        if (this.controls.shoot()) {
            this.shootTimer.update();
        }
        if (this.controls.goForward()) {
            this.speed += this.speedAcl;
        }
        else {
            if (this.speed > 0) {
                this.speed -= this.speedDeacl;
            }
            else {
                this.speed = 0;
            }
        }
        if (this.controls.slowDown()) {
            if (this.speed > 0) {
                this.speed -= this.manualSpeedDeacl;
            }
            else {
                this.speed = 0;
            }
        }
        this.speed = Math.min(this.speed, this.maxSpeed);
        var angle = this.angle - 90;
        this.x += trig_1.default.cos(angle) * this.speed;
        this.y += trig_1.default.sin(angle) * this.speed;
        if (this.hp <= 0) {
            this.kill();
        }
    };
    return Ship;
}(SpaceGameObject_1.default));
exports.default = Ship;
//# sourceMappingURL=Ship.js.map