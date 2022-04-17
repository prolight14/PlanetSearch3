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
        var _this_1 = _super.call(this, scene, x, y, "hyperBeamerSTypeGreen") || this;
        _this_1.setCollisionGroup(1);
        _this_1.setCollidesWith(0);
        _this_1.isShooting = true;
        _this_1.particles = scene.add.particles("hyperBeamerSTypeGreenParticle");
        _this_1.bullets = scene.world.get.gameObjectArray("hyperBeamerSTypeGreenBullet");
        if (!_this_1.bullets) {
            _this_1.bullets = scene.world.add.gameObjectArray(Bullet_1.default, "hyperBeamerSTypeGreenBullet");
        }
        _this_1.pEmitter = _this_1.particles.createEmitter({
            lifespan: 500,
            scale: 1.5,
            rotate: 0,
            x: 0,
            y: 0,
            quantity: 1
        });
        _this_1.pEmitter.setAlpha(function (p, k, t) {
            return 1 - t;
        });
        var _this = _this_1;
        var world = scene.world;
        _this_1.sm = new StateMachine_1.default({
            "wander": {
                start: function () {
                    var _this_1 = this;
                    _this.isShooting = false;
                    this.cancelTurnTimers = false;
                    this.changeDirTimer = timer_1.default(true, 1000, function () {
                        _this_1.turn(Phaser.Math.RND.frac() < 0.5 ? "left" : "right", "", Phaser.Math.RND.between(150, 350), undefined, function () {
                            _this_1.changeDirTimer.reset(Phaser.Math.RND.between(3000, 7000) * 2);
                        });
                    });
                },
                turn: function (turnDir, oldTurn, time, maxTurnAmt, callback) {
                    if (callback === undefined) {
                        callback = function () { };
                    }
                    _this.turnDir = turnDir;
                    this.redirectTimer = timer_1.default(true, time, function () {
                        _this.turnDir = oldTurn || "";
                        callback();
                    });
                },
                update: function () {
                    var _this_1 = this;
                    this.changeDirTimer.update();
                    if (this.redirectTimer !== undefined) {
                        this.redirectTimer.update();
                    }
                    _this.visibleObjects.forEach(function (object) {
                        var gameObject = object.gameObject;
                        switch (gameObject._arrayName) {
                            case "playerShip":
                                _this.sm.stop("wander");
                                _this.sm.start("follow");
                                break;
                            case _this._arrayName:
                                _this_1.turn(object.angleBetween - _this.angle > 0 ? "left" : "right", "", 200, undefined, function () { });
                                break;
                        }
                    });
                }
            },
            "follow": {
                start: function () {
                    _this.isShooting = true;
                    _this.turnDir = "";
                },
                update: function () {
                    _this.shootTimer.update();
                }
            },
        });
        _this_1.setAngle(Phaser.Math.RND.frac() * 360);
        _this_1.sm.start("wander");
        _this_1.shootTimer = timer_1.default(true, 200, function () {
            if (_this_1.isShooting) {
                _this_1.shoot();
            }
            _this_1.shootTimer.reset();
        });
        return _this_1;
    }
    HyperBeamerSType.prototype.shootBullet = function (theta, length, life) {
        var bullet = this.bullets.add(this.scene, this.x + trig_1.default.cos(theta) * length, this.y + trig_1.default.sin(theta) * length, "helixShipLvl1Bullet", this.angle - 90, life || 2000, this.bulletOnCollide, this);
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
        this.shootBullet(0, 20);
    };
    HyperBeamerSType.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        var length = this.displayHeight * 0.4;
        this.particles.x = this.x + trig_1.default.cos(this.angle + 90) * length;
        this.particles.y = this.y + trig_1.default.sin(this.angle + 90) * length;
        this.pEmitter.setAngle(this.angle + 67.5 + 45 * Phaser.Math.RND.frac());
        this.pEmitter.setVisible(this.speed > 0.005);
        this.pEmitter.setSpeed(this.speed * 30);
        this.sm.emit("update", []);
    };
    HyperBeamerSType.prototype.onKill = function () {
        _super.prototype.onKill.call(this);
        this.particles.destroy();
    };
    HyperBeamerSType.indexId = 0;
    return HyperBeamerSType;
}(HyperBeamerShip_1.default));
exports.default = HyperBeamerSType;
//# sourceMappingURL=HyperBeamerSType.js.map