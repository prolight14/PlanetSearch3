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
var HyperBeamerShip_1 = require("./HyperBeamerShip");
var timer_1 = require("../Utils/timer");
var StateMachine_1 = require("../Utils/StateMachine");
var trig_1 = require("../Utils/trig");
var Bullet_1 = require("./Bullet");
var HyperBeamerSType = (function (_super) {
    __extends(HyperBeamerSType, _super);
    function HyperBeamerSType(scene, x, y) {
        var _this_1 = _super.call(this, scene, x, y, "greenShip") || this;
        _this_1.setCollisionGroup(1);
        _this_1.setCollidesWith(0);
        _this_1.isShooting = true;
        _this_1.bullets = scene.world.get.gameObjectArray("hyperBeamerSTypeGreenBullet");
        if (!_this_1.bullets) {
            _this_1.bullets = scene.world.add.gameObjectArray(Bullet_1.default, "hyperBeamerSTypeGreenBullet");
        }
        _this_1.setDepth(1).setScale(2);
        scene.anims.create({
            key: "flying",
            frames: [{ key: "greenShip", frame: 0 }, { key: "greenShip", frame: 1 }],
            frameRate: 8,
            repeat: -1
        });
        _this_1.anims.play("flying");
        var _this = _this_1;
        _this_1.AIType = "hostile";
        _this_1.turnManager = {
            turning: false,
            targetAngle: _this.angle,
            turnStep: 0,
            callback: function () { },
            start: function (targetAngle, turnStep, callback) {
                if (callback === undefined) {
                    callback = function () { };
                }
                this.targetAngle = Phaser.Math.Wrap(targetAngle, -180, 180);
                this.turning = true;
                this.callback = callback;
                this.turnStep = turnStep;
            },
            update: function () {
                if (!this.turning) {
                    return;
                }
                var angleDiff = Phaser.Math.Wrap(this.targetAngle - _this.angle, 0, 360);
                if (Math.abs(angleDiff) <= this.turnStep || _this.angle === this.targetAngle) {
                    _this.angle = this.targetAngle;
                    this.callback();
                    this.turning = false;
                    return;
                }
                if (angleDiff > 180) {
                    _this.angle -= this.turnStep;
                }
                else {
                    _this.angle += this.turnStep;
                }
            }
        };
        _this_1.sm = new StateMachine_1.default({
            "wander": {
                turnSpeed: 3,
                turnInterval: function () {
                    return Phaser.Math.RND.between(750, 2100);
                },
                start: function () {
                    var _this_1 = this;
                    _this.isShooting = false;
                    this.turnToTarget = false;
                    this.targetTurnAngle = 0;
                    this.changeDirTimer = timer_1.default(true, this.turnInterval(), function () {
                        if (_this_1.turnToTarget) {
                            _this.turnManager.start(_this_1.targetTurnAngle, 6, function () {
                                _this_1.changeDirTimer.reset(_this_1.turnInterval());
                            });
                            _this_1.turnToTarget = false;
                            _this_1.targetTurnAngle = 0;
                        }
                        else {
                            _this.turnManager.start(_this.angle + Phaser.Math.RND.between(0, 360), _this_1.turnSpeed, function () {
                                _this_1.changeDirTimer.reset(_this_1.turnInterval());
                            });
                        }
                    });
                },
                update: function () {
                    this.changeDirTimer.update();
                    _this.isShooting = false;
                    for (var i = 0; i < _this.visibleObjects.length; i++) {
                        var object = _this.visibleObjects[i];
                        if (object.gameObject._arrayName === "playerShip") {
                            _this.isShooting = true;
                            this.targetTurnAngle = object.angleBetween;
                            this.turnToTarget = true;
                            break;
                        }
                    }
                },
                stop: function () {
                }
            },
            "attack": {
                start: function () {
                    _this.isShooting = true;
                }
            }
        });
        _this_1.setAngle(Phaser.Math.RND.frac() * 360);
        _this_1.sm.start("wander");
        _this_1.shootTimer = timer_1.default(true, 450, function () {
            if (_this_1.isShooting) {
                _this_1.shoot();
            }
            _this_1.shootTimer.reset();
        });
        _this_1.setFovStats(1000, 70);
        _this_1.move = true;
        return _this_1;
    }
    HyperBeamerSType.prototype.shootBullet = function (theta, length, life) {
        theta += this.angle - 90;
        var bullet = this.bullets.add(this.scene, this.x + trig_1.default.cos(theta) * length, this.y + trig_1.default.sin(theta) * length, "lightningBlue", this.angle - 90, life || 2000, this.bulletOnCollide, this);
        bullet.setAngle(this.angle);
        bullet.setCollisionGroup(2);
        bullet.setCollidesWith(0);
    };
    HyperBeamerSType.prototype.bulletOnCollide = function (gameObject) {
        if (gameObject._arrayName === "playerShip") {
            return gameObject.takeDamage(this);
        }
        return false;
    };
    HyperBeamerSType.prototype.shoot = function () {
        this.shootBullet(0, this.displayWidth / 2);
    };
    HyperBeamerSType.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        this.sm.emit("update", []);
        this.turnManager.update();
        this.shootTimer.update();
    };
    HyperBeamerSType.indexId = 0;
    return HyperBeamerSType;
}(HyperBeamerShip_1.default));
exports.default = HyperBeamerSType;
//# sourceMappingURL=HyperBeamerSType.js.map