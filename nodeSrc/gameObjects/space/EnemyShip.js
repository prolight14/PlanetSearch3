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
        _this.move = true;
        _this.isShooting = false;
        _this.fovRadius = 400;
        _this.fovAngle = 60;
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
                return _this.move;
            },
            slowDown: function () { return false; },
            shoot: function () {
                return _this.isShooting;
            }
        };
        _this.angleVel = 3;
        _this.lookTimer = timer_1.default(true, 70, function () {
            _this.fovLook();
            _this.lookTimer.reset();
        });
        _this.fovSetup();
        return _this;
    }
    EnemyShip.prototype.isEnemyShip = function () { return true; };
    ;
    EnemyShip.prototype.fovSetup = function () {
        this.halfFovAngle = this.fovAngle / 2;
        this.fovRadiusSquared = this.fovRadius * this.fovRadius;
    };
    EnemyShip.prototype.fovLook = function () {
        var objectsInCells = [];
        var world = this.scene.csp.world;
        var minCoor = this.scene.csp.world.cameraGrid.getCoordinates(Math.floor(this.x - this.fovRadius), Math.floor(this.y - this.fovRadius));
        var maxCoor = this.scene.csp.world.cameraGrid.getCoordinates(Math.floor(this.x + this.fovRadius), Math.floor(this.y + this.fovRadius));
        world.cameraGrid.loopThroughCells(minCoor.col, minCoor.row, maxCoor.col, maxCoor.row, function (cell, col, row) {
            for (var i in cell) {
                var object = world.get.gameObject(cell[i].arrayName, cell[i].id);
                if (object !== undefined) {
                    objectsInCells.push(object);
                }
            }
        });
        this.visibleObjects.length = 0;
        this.canSeeSomething = false;
        var minAngle = this.angle - this.halfFovAngle;
        var maxAngle = this.angle + this.halfFovAngle;
        if (minAngle < 0) {
            minAngle = minAngle + 360;
        }
        if (maxAngle < 0) {
            maxAngle = maxAngle + 360;
        }
        for (var i = 0; i < objectsInCells.length; i++) {
            var object = objectsInCells[i];
            if (Phaser.Math.Distance.BetweenPointsSquared(object, this) > this.fovRadiusSquared) {
                continue;
            }
            var angleBetween = Phaser.Math.Angle.BetweenPoints(object, this) * Phaser.Math.RAD_TO_DEG;
            angleBetween = angleBetween - 90;
            if (angleBetween < 0) {
                angleBetween = angleBetween + 360;
            }
            if (angleBetween > minAngle && angleBetween < maxAngle) {
                this.canSeeSomething = true;
                this.visibleObjects.push({
                    gameObject: object,
                    angleBetween: angleBetween
                });
            }
        }
    };
    EnemyShip.prototype.debugFov = function (graphics) {
        graphics.lineStyle(10, 0x0FAB23);
        graphics.fillStyle(0xBB0012, 0.4);
        graphics.beginPath();
        graphics.arc(this.x, this.y, this.fovRadius, (this.angle - 90 - this.fovAngle / 2) * Phaser.Math.DEG_TO_RAD, (this.angle - 90 + this.fovAngle / 2) * Phaser.Math.DEG_TO_RAD);
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
//# sourceMappingURL=EnemyShip.js.map