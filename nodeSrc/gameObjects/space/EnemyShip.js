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
var Ship_1 = require("./Ship");
var EnemyShip = (function (_super) {
    __extends(EnemyShip, _super);
    function EnemyShip(scene, x, y, texture) {
        var _this = _super.call(this, scene, x, y, texture) || this;
        _this.typeName = "enemyShip";
        _this.move = true;
        _this.isShooting = false;
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
        return _this;
    }
    EnemyShip.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
    };
    EnemyShip.prototype.onKill = function () {
        this.dropXP();
        this.dropCrests();
    };
    EnemyShip.prototype.dropXP = function () {
        for (var i = 0; i < this.xpDropAmt; i++) {
            if (Phaser.Math.RND.frac() < 0.5) {
                this.scene.scene.get("spaceLogic").addXPStar(this.x, this.y);
            }
            else {
                this.scene.scene.get("spaceLogic").addSmallXPStar(this.x, this.y);
            }
        }
    };
    EnemyShip.prototype.dropCrests = function () {
        for (var i = 0; i < this.crestDropAmt; i++) {
            this.scene.scene.get("spaceLogic").addCrests(this.x, this.y);
        }
    };
    return EnemyShip;
}(Ship_1.default));
exports.default = EnemyShip;
//# sourceMappingURL=EnemyShip.js.map