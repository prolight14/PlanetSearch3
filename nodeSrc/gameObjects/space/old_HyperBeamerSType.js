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
var old_HyperBeamerShip_1 = require("./old_HyperBeamerShip");
var timer_1 = require("../Utils/timer");
var StateMachine_1 = require("../Utils/StateMachine");
var trig_1 = require("../Utils/trig");
var Bullet_1 = require("./Bullet");
var TurnManager_1 = require("../Utils/TurnManager");
var State_1 = require("../Utils/State");
var CollisionCategories_1 = require("./CollisionCategories");
var HyperBeamerSType = (function (_super) {
    __extends(HyperBeamerSType, _super);
    function HyperBeamerSType(scene, x, y) {
        var _this_1 = _super.call(this, scene, x, y, "greenShip") || this;
        _this_1.setCollisionCategory(CollisionCategories_1.default.ENEMY);
        _this_1.setCollidesWith([CollisionCategories_1.default.PLAYER, CollisionCategories_1.default.PLAYER_BULLETS]);
        _this_1.bullets = scene.world.get.gameObjectArray("hyperBeamerSTypeGreenBullet");
        if (!_this_1.bullets) {
            _this_1.bullets = scene.world.add.gameObjectArray(Bullet_1.default, "hyperBeamerSTypeGreenBullet");
        }
        _this_1.ignoreObjNames = ["hyperBeamerSTypeGreenBullet", "purpleNebula", "grayNebula"];
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
        _this_1.shootTimer = timer_1.default(true, 450, function () {
            if (_this_1.isShooting) {
                _this_1.shoot();
            }
            _this_1.shootTimer.reset();
        });
        var defaultMaxSpeed = _this_1.maxSpeed;
        var avoidLimits = {
            changeDir: 450,
            slowdown: 120,
            turnAround: 30,
            changeDirSquared: 0,
            slowdownSquared: 0,
            turnAroundSquared: 0,
            avoidAngleAmt: 50,
        };
        avoidLimits.changeDirSquared = avoidLimits.changeDir * avoidLimits.changeDir;
        avoidLimits.slowdownSquared = avoidLimits.slowdown * avoidLimits.slowdown;
        avoidLimits.turnAroundSquared = avoidLimits.turnAround * avoidLimits.turnAround;
        var WanderState = (function (_super) {
            __extends(WanderState, _super);
            function WanderState() {
                var _this_1 = _super !== null && _super.apply(this, arguments) || this;
                _this_1.turningTowardsTarget = false;
                return _this_1;
            }
            WanderState.prototype.randomInt = function (min, max) {
                return Phaser.Math.RND.between(min, max);
            };
            WanderState.prototype.getNextTurnTime = function () {
                return this.randomInt(1000, 3000);
            };
            WanderState.prototype.getNextTurnAngle = function () {
                return Phaser.Math.RND.angle();
            };
            WanderState.prototype.start = function () {
                var _this_1 = this;
                this.subState = "wander";
                _this.isShooting = false;
                this.wanderTurnTimer = timer_1.default(true, this.getNextTurnTime(), function () {
                    _this.turnManager.startTurning(_this_1.getNextTurnAngle(), function () { return _this_1.wanderTurnTimer.reset(_this_1.getNextTurnTime()); });
                });
                this.lookTimer = timer_1.default(true, 300, function () {
                    _this_1.look();
                    _this_1.lookTimer.reset(300);
                });
            };
            WanderState.prototype.update = function () {
                this.runSubStates();
            };
            WanderState.prototype.setSubState = function (state) {
                if (this.subState !== state) {
                    this.lastSubState = this.subState;
                    this.subState = state;
                }
            };
            WanderState.prototype.look = function () {
                var _this_1 = this;
                for (var i = 0; i < _this.visibleObjects.length; i++) {
                    var _a = _this.visibleObjects[i], _arrayName = _a._arrayName, distanceSquared = _a.distanceSquared, angleDiff = _a.angleDiff, angleBetween = _a.angleBetween;
                    switch (true) {
                        case _arrayName === _this._arrayName:
                        case _this.getType() === "projectile":
                            this.subState = "redirect";
                            if (distanceSquared > avoidLimits.changeDirSquared) {
                                break;
                            }
                            var redirectAngle = _this.angle + avoidLimits.avoidAngleAmt * (angleDiff < 0 ? 1 : -1);
                            if (distanceSquared < avoidLimits.slowdownSquared) {
                                _this.maxSpeed = 2.5;
                            }
                            _this.turnManager.startTurning(redirectAngle, function () {
                                _this_1.subState = "wander";
                                _this.maxSpeed = defaultMaxSpeed;
                                _this_1.wanderTurnTimer.reset(_this_1.getNextTurnTime());
                            });
                            return;
                    }
                }
            };
            WanderState.prototype.offense = function () {
                var _this_1 = this;
                var canSeeEnemy = false;
                for (var i = 0; i < _this.visibleObjects.length; i++) {
                    var _a = _this.visibleObjects[i], _arrayName = _a._arrayName, distanceSquared = _a.distanceSquared, angleDiff = _a.angleDiff, angleBetween = _a.angleBetween;
                    switch (true) {
                        case _arrayName === "playerShip":
                            if (this.subState === "wander") {
                                this.subState = "attack";
                                _this.isShooting = true;
                                canSeeEnemy = true;
                                if (!this.turningTowardsTarget) {
                                    var redirectAngle = _this.angle + angleDiff * 0.2;
                                    this.turningTowardsTarget = true;
                                    _this.turnManager.startTurning(redirectAngle, function () {
                                        _this_1.turningTowardsTarget = false;
                                        _this.isShooting = false;
                                    });
                                }
                            }
                            break;
                    }
                }
                if (!canSeeEnemy) {
                    this.subState = "wander";
                    _this.isShooting = false;
                    this.turningTowardsTarget = false;
                }
            };
            WanderState.prototype.runSubStates = function () {
                switch (this.subState) {
                    case "wander":
                        this.wanderTurnTimer.update();
                        this.lookTimer.update();
                        break;
                    case "redirect":
                        break;
                    case "attack":
                        this.lookTimer.update();
                        break;
                    case "loopAround":
                        this.lookTimer.update();
                        break;
                    case "evade":
                        break;
                }
                this.offense();
            };
            WanderState.prototype.stop = function () {
            };
            return WanderState;
        }(State_1.default));
        _this_1.sm = new StateMachine_1.default({
            "wander": new WanderState()
        });
        _this_1.sm.start("wander");
        _this_1.setAngle(Phaser.Math.RND.angle());
        _this_1.setFovStats(500, 70);
        _this_1.isMoving = true;
        _this_1.isShooting = false;
        return _this_1;
    }
    HyperBeamerSType.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        this.sm.emit("update", []);
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
        var bullet = this.bullets.add(this.scene, this.x + trig_1.default.cos(theta) * length, this.y + trig_1.default.sin(theta) * length, "lightningBlue", this.angle - 90, life || 2000, 3000, this.bulletOnCollide, this);
        bullet.setAngle(this.angle);
        bullet.setCollisionCategory(CollisionCategories_1.default.ENEMY_BULLETS);
        bullet.setCollidesWith(CollisionCategories_1.default.PLAYER);
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
}(old_HyperBeamerShip_1.default));
exports.default = HyperBeamerSType;
//# sourceMappingURL=old_HyperBeamerSType.js.map