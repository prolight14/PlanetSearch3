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
var EnemyShip_1 = require("./EnemyShip");
var CollisionCategories_1 = require("./CollisionCategories");
var Bullet_1 = require("./Bullet");
var trig_1 = require("../Utils/trig");
var DelayedEventSystem_1 = require("../Utils/DelayedEventSystem");
function now() {
    return performance.now();
}
var HyperBeamerShip = (function (_super) {
    __extends(HyperBeamerShip, _super);
    function HyperBeamerShip(scene, x, y) {
        var _this = _super.call(this, scene, x, y, "greenShip") || this;
        _this.cur_state = "wander";
        _this.events = {
            turn: {
                targetAngle: 0,
                active: false,
                callback: (function () { }),
                callbackContext: _this
            }
        };
        _this.timers = {};
        _this.setCollisionCategory(CollisionCategories_1.default.ENEMY);
        _this.setCollidesWith([CollisionCategories_1.default.PLAYER, CollisionCategories_1.default.PLAYER_BULLETS]);
        _this.speeds.maxSpeed = 3.75;
        _this.speeds.angleVel = 1.3;
        _this.speeds.angleVel = 2;
        _this.hp = 12;
        _this.maxHp = 12;
        _this.fovStats.range = 400;
        _this.fovStats.fov = 60;
        _this.setScale(2);
        scene.anims.create({
            key: "flying",
            frames: [{ key: "greenShip", frame: 0 }, { key: "greenShip", frame: 1 }],
            frameRate: 8,
            repeat: -1
        });
        _this.anims.play("flying");
        _this.setAngle(Phaser.Math.RND.angle());
        _this.setShootInterval(600);
        _this.bullets = scene.world.get.gameObjectArray("hyperBeamerShipBullet");
        if (!_this.bullets) {
            _this.bullets = scene.world.add.gameObjectArray(Bullet_1.default, "hyperBeamerShipBullet");
        }
        _this.setDepth(23);
        _this.delayedEvents = new DelayedEventSystem_1.default();
        _this.movement.thrust = "forward";
        _this.delayedCall(3000, function () {
            _this.turn(-90, 1.5);
        });
        return _this;
    }
    HyperBeamerShip.prototype.delayedCall = function (delayTime, callback) {
        var startTime = now();
        this.delayedEvents.quickEvent([], function () {
            return (now() - startTime >= delayTime);
        }, function () {
            callback();
        });
    };
    HyperBeamerShip.prototype.turn = function (amt, speed, callback) {
        var _this = this;
        var oldAngleVel = this.speeds.angleVel;
        if (speed !== undefined) {
            this.speeds.angleVel = speed;
        }
        this.movement.angleDir = (amt < 0) ? "left" : "right";
        this.delayedEvents.quickEvent([this.angle + amt], function (targetAngle) {
            return Math.abs(Phaser.Math.Angle.ShortestBetween(Phaser.Math.Angle.WrapDegrees(targetAngle), _this.angle)) < Math.abs(_this.speeds.maxAngleVel);
        }, function () {
            _this.movement.angleDir = "";
            if (callback !== undefined) {
                callback();
            }
            _this.speeds.angleVel = oldAngleVel;
        });
    };
    HyperBeamerShip.prototype.shootBullet = function (theta, length, life) {
        theta += this.angle - 90;
        var bullet = this.bullets.add(this.scene, this.x + trig_1.default.cos(theta) * length, this.y + trig_1.default.sin(theta) * length, "lightningBlue", this.angle - 90, life || 2000, 3000, this.bulletOnCollide, this);
        bullet.setAngle(this.angle);
        bullet.setCollisionCategory(CollisionCategories_1.default.ENEMY_BULLETS);
        bullet.setCollidesWith(CollisionCategories_1.default.PLAYER);
    };
    HyperBeamerShip.prototype.bulletOnCollide = function (gameObject) {
        if (gameObject._arrayName === "playerShip") {
            return gameObject.takeDamage(this);
        }
        return false;
    };
    HyperBeamerShip.prototype.shoot = function () {
        this.shootBullet(0, this.displayWidth / 2);
    };
    HyperBeamerShip.prototype.startTurn = function (targetAngle, inverted, ignoreIfActive, callback, callbackContext) {
        if (inverted === undefined) {
            inverted = false;
        }
        if (ignoreIfActive === undefined) {
            ignoreIfActive = false;
        }
        if (callback === undefined) {
            callback = (function () { });
        }
        if (callbackContext === undefined) {
            callbackContext = this;
        }
        var turnEvent = this.events.turn;
        if (ignoreIfActive && turnEvent.active) {
            return;
        }
        if (targetAngle - this.angle < 0 && !inverted) {
            this.movement.angleDir = "left";
        }
        else {
            this.movement.angleDir = "right";
        }
        turnEvent.targetAngle = targetAngle;
        turnEvent.active = true;
        turnEvent.callback = callback;
        turnEvent.callbackContext = callbackContext;
    };
    HyperBeamerShip.prototype.updateTurn = function () {
        var turnEvent = this.events.turn;
        if (turnEvent.active) {
            if (Math.abs(Phaser.Math.Angle.ShortestBetween(Phaser.Math.Angle.WrapDegrees(turnEvent.targetAngle), this.angle)) < Math.abs(this.speeds.maxAngleVel)) {
                this.movement.angleDir = "";
                turnEvent.active = false;
                turnEvent.callback.call(turnEvent.callbackContext);
            }
        }
    };
    HyperBeamerShip.prototype.updateTimers = function () {
        this.timers.moveStraight.update();
    };
    HyperBeamerShip.prototype.updateRandomTurns = function () {
        this.delayedEvents.updateEvents();
    };
    HyperBeamerShip.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        var visibleObjects = this.fov.look(this.angle - 90, this.fovStats.range, this.fovStats.fov);
        this.canSeeSomething = (visibleObjects.length > 0);
        switch (this.cur_state) {
            case "wander":
                this.updateRandomTurns();
                break;
            case "attack":
                break;
            case "escape":
                break;
        }
        visibleObjects.forEach(function (objectInfo) {
        });
    };
    return HyperBeamerShip;
}(EnemyShip_1.default));
exports.default = HyperBeamerShip;
//# sourceMappingURL=HyperBeamerShip.js.map