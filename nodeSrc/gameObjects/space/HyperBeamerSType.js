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
var Clock_1 = require("../Utils/Clock");
var TurnManager_1 = require("../Utils/TurnManager");
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
        _this_1.turnManager = new TurnManager_1.default(_this_1);
        _this_1.setAngle(Phaser.Math.Angle.RandomDegrees());
        _this_1.shootTimer = timer_1.default(true, 450, function () {
            if (_this_1.isShooting) {
                _this_1.shoot();
            }
            _this_1.shootTimer.reset();
        });
        _this_1.move = false;
        var WanderState = (function () {
            function WanderState() {
            }
            WanderState.prototype.start = function () {
                this.subState = "wander";
                this.changeDirTimer = new Clock_1.default(Phaser.Math.RND.between(750, 1500), true);
            };
            WanderState.prototype.update = function () {
                var _this_1 = this;
                switch (this.subState) {
                    case "wander":
                        if (!_this.turnManager.isTurning() && this.changeDirTimer.isFinished()) {
                            _this.turnManager.startTurning(Phaser.Math.RND.between(0, 360), function () {
                                _this_1.changeDirTimer.reset(Phaser.Math.RND.between(750, 1500));
                            });
                        }
                        break;
                    case "attack":
                        break;
                    case "inspect":
                        break;
                }
            };
            WanderState.prototype.stop = function () {
            };
            return WanderState;
        }());
        _this_1.sm = new StateMachine_1.default({
            "wander": new WanderState()
        });
        _this_1.sm.start("wander");
        _this_1.setFovStats(500, 70);
        return _this_1;
    }
    HyperBeamerSType.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        this.turnManager.update();
        this.shootTimer.update();
    };
    HyperBeamerSType.prototype.onCollide = function (object) {
        if (object._arrayName === "HyperBeamerSTypeBullet") {
            return;
        }
    };
    HyperBeamerSType.prototype.shootBullet = function (theta, length, life) {
        theta += this.angle - 90;
        var bullet = this.bullets.add(this.scene, this.x + trig_1.default.cos(theta) * length, this.y + trig_1.default.sin(theta) * length, "lightningBlue", this.angle - 90, life || 2000, this.bulletOnCollide, this);
        bullet.setAngle(this.angle);
        bullet.setCollisionGroup(2);
        bullet.setCollidesWith(0);
    };
    HyperBeamerSType.prototype.shoot = function () {
        this.shootBullet(0, this.displayWidth / 2);
    };
    HyperBeamerSType.prototype.bulletOnCollide = function (gameObject) {
        if (gameObject._arrayName === "playerShip") {
            return gameObject.takeDamage(this);
        }
        return false;
    };
    HyperBeamerSType.indexId = 0;
    return HyperBeamerSType;
}(HyperBeamerShip_1.default));
exports.default = HyperBeamerSType;
//# sourceMappingURL=HyperBeamerSType.js.map