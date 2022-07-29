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
var timer_1 = require("../Utils/timer");
var Ship_1 = require("./Ship");
var EnemyShip = (function (_super) {
    __extends(EnemyShip, _super);
    function EnemyShip(scene, x, y, texture) {
        var _this = _super.call(this, scene, x, y, texture) || this;
        _this.showHpBar = true;
        _this.isMoving = true;
        _this.isShooting = false;
        _this.fovRadius = 400;
        _this.fovAngle = 60;
        _this.ignoreObjNames = [];
        _this.visibleObjects = [];
        _this.canSeeSomething = false;
        _this.xpDropAmt = 3;
        _this.crestDropAmt = Phaser.Math.RND.between(3, 6);
        _this.turnDir = "";
        _this.controls = {
            turnLeft: function () {
                return _this.turnDir === "left";
            },
            turnRight: function () {
                return _this.turnDir === "right";
            },
            goForward: function () {
                return _this.isMoving;
            },
            slowDown: function () { return false; },
            shoot: function () {
                return _this.isShooting;
            }
        };
        _this.angleVel = 3;
        _this.fovLookDelay = 50;
        _this.lookTimer = timer_1.default(true, _this.fovLookDelay, function () {
            _this.fovLook();
            _this.lookTimer.reset(_this.fovLookDelay);
        });
        _this.fovSetup();
        return _this;
    }
    EnemyShip.prototype.isEnemyShip = function () { return true; };
    ;
    EnemyShip.prototype.setFovStats = function (fovRadius, fovAngle) {
        this.fovRadius = fovRadius;
        this.fovAngle = fovAngle;
        this.fovSetup();
    };
    EnemyShip.prototype.fovSetup = function () {
        this.halfFovAngle = this.fovAngle / 2;
        this.fovRadiusSquared = this.fovRadius * this.fovRadius;
    };
    EnemyShip.prototype.fovLook = function () {
        var objectsInCells = [];
        objectsInCells = this.scene.world.getObjectsInBox(this.x - this.fovRadius, this.y - this.fovRadius, this.x + this.fovRadius, this.y + this.fovRadius);
        this.visibleObjects.length = 0;
        this.canSeeSomething = false;
        for (var i = 0; i < objectsInCells.length; i++) {
            var object = objectsInCells[i];
            if (this.ignoreObjNames.indexOf(object._arrayName) !== -1) {
                continue;
            }
            var distanceSquared = Phaser.Math.Distance.BetweenPointsSquared(object, this);
            if (distanceSquared > this.fovRadiusSquared) {
                continue;
            }
            var angleBetween = Phaser.Math.Angle.Reverse(Phaser.Math.Angle.BetweenPoints(object, this)) * Phaser.Math.RAD_TO_DEG;
            var angleDiff = Phaser.Math.Angle.ShortestBetween(this.angle - 90, angleBetween);
            if (Math.abs(angleDiff) < this.halfFovAngle) {
                this.canSeeSomething = true;
                this.visibleObjects.push({
                    gameObject: object,
                    _arrayName: object._arrayName,
                    angleDiff: angleDiff,
                    angleBetween: angleBetween,
                    distanceSquared: distanceSquared
                });
            }
        }
    };
    EnemyShip.prototype.debugFov = function (graphics) {
        graphics.lineStyle(10, 0x0FAB23);
        graphics.fillStyle(0xBB0012, 0.4);
        graphics.beginPath();
        graphics.arc(this.x, this.y, this.fovRadius, (this.angle - 90 - this.halfFovAngle) * Phaser.Math.DEG_TO_RAD, (this.angle - 90 + this.halfFovAngle) * Phaser.Math.DEG_TO_RAD);
        graphics.strokePath();
        if (this.canSeeSomething) {
            graphics.fillPath();
        }
    };
    EnemyShip.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        this.lookTimer.update();
    };
    EnemyShip.prototype.onKill = function () {
        this.dropXP();
        this.dropCrests();
    };
    EnemyShip.prototype.dropXP = function () {
        var spaceLogicScene = this.scene.scene.get("spaceLogic");
        for (var i = 0; i < this.xpDropAmt; i++) {
            if (Phaser.Math.RND.frac() < 0.5) {
                spaceLogicScene.addXPStar(this.x, this.y);
            }
            else {
                spaceLogicScene.addSmallXPStar(this.x, this.y);
            }
        }
    };
    EnemyShip.prototype.dropCrests = function () {
        var spaceLogicScene = this.scene.scene.get("spaceLogic");
        for (var i = 0; i < this.crestDropAmt; i++) {
            spaceLogicScene.addCrests(this.x, this.y);
        }
    };
    return EnemyShip;
}(Ship_1.default));
exports.default = EnemyShip;
//# sourceMappingURL=old_EnemyShip.js.map