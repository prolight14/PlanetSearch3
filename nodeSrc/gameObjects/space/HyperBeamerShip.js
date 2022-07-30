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
var HyperBeamerShip = (function (_super) {
    __extends(HyperBeamerShip, _super);
    function HyperBeamerShip(scene, x, y) {
        var _this = _super.call(this, scene, x, y, "greenShip") || this;
        _this.cur_state = "wander";
        _this.setCollisionCategory(CollisionCategories_1.default.ENEMY);
        _this.setCollidesWith([CollisionCategories_1.default.PLAYER, CollisionCategories_1.default.PLAYER_BULLETS]);
        _this.maxSpeed = 3.75;
        _this.angleVel = 1.3;
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
        _this.createTimers();
        _this.adjustDir(-90, 300, function () {
            this.adjustDir(Phaser.Math.RND.between(-90, 90), 500);
        }, _this);
        return _this;
    }
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
    HyperBeamerShip.prototype.createTimers = function () {
    };
    HyperBeamerShip.prototype.now = function () {
        return performance.now();
    };
    HyperBeamerShip.prototype.adjustDir = function (angleAdjust, inTime, finishCallback, callbackContext) {
        this.turnEvent = {
            angleAdjust: angleAdjust,
            inTime: inTime,
            callback: (finishCallback === undefined) ? (function () { }) : finishCallback,
            callbackContext: callbackContext,
            startTime: this.now(),
        };
        this.movement.angleDir = (angleAdjust < 0) ? "left" : "right";
    };
    HyperBeamerShip.prototype.updateAdjustDir = function () {
        if (this.turnEvent !== undefined) {
            var turnEvent = this.turnEvent;
            if (this.now() - turnEvent.startTime >= turnEvent.inTime) {
                this.movement.angleDir = "none";
                this.turnEvent = undefined;
                var context = turnEvent.callbackContext;
                if (context === undefined) {
                    turnEvent.callback.call(this);
                }
                else {
                    turnEvent.callback.call(context);
                }
            }
        }
    };
    HyperBeamerShip.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        this.updateAdjustDir();
        var visibleObjects = this.fov.look(this.angle - 90, this.fovStats.range, this.fovStats.fov);
        this.canSeeSomething = (visibleObjects.length > 0);
        switch (this.cur_state) {
            case "wander":
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