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
        return _this;
    }
    HyperBeamerShip.prototype.preUpdate = function (time, delta) {
        var _this = this;
        _super.prototype.preUpdate.call(this, time, delta);
        this.movement.angleDir = "none";
        var visibleObjects = this.fov.look(this.angle - 90, this.fovStats.range, this.fovStats.fov);
        this.canSeeSomething = (visibleObjects.length > 0);
        visibleObjects.forEach(function (objectInfo) {
            var gameObject = objectInfo.object;
            var angleDiff = objectInfo.angleDiff;
            switch (gameObject._arrayName) {
                case "playerShip":
                    if (_this.hp > _this.maxHp * 0.4) {
                        _this.cur_state = "follow";
                    }
                    else {
                        _this.cur_state = "run";
                    }
                    if (_this.cur_state === "follow") {
                        if (Math.abs(angleDiff) > _this.angleVel) {
                            _this.movement.angleDir = (angleDiff < 0) ? "left" : "right";
                        }
                        else {
                            _this.movement.angleDir = "none";
                        }
                    }
                    else if (_this.cur_state === "run") {
                        if (Math.abs(angleDiff) < 45) {
                            _this.movement.angleDir = (angleDiff < 0) ? "right" : "left";
                        }
                        else {
                            _this.movement.angleDir = "none";
                        }
                    }
                    break;
            }
        });
    };
    return HyperBeamerShip;
}(EnemyShip_1.default));
exports.default = HyperBeamerShip;
//# sourceMappingURL=HyperBeamerShip.js.map