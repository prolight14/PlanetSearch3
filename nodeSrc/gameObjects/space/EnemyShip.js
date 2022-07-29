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
var Fov_1 = require("../Utils/Fov");
var EnemyShip = (function (_super) {
    __extends(EnemyShip, _super);
    function EnemyShip(scene, x, y, texture, frame) {
        var _this = _super.call(this, scene, x, y, texture, frame) || this;
        _this.showHpBar = true;
        _this.movement = {
            angleDir: "none",
            thrust: "forward",
            isShooting: false,
        };
        _this.fovStats = {
            range: 1000,
            fov: 90,
        };
        _this.canSeeSomething = false;
        _this.xpDropAmt = 3;
        _this.crestDropAmt = Phaser.Math.RND.between(3, 6);
        _this.initControls();
        _this.fov = new Fov_1.default(scene, _this);
        return _this;
    }
    EnemyShip.prototype.initControls = function () {
        var _this = this;
        this.controls = {
            turnLeft: function () {
                return _this.movement.angleDir === "left";
            },
            turnRight: function () {
                return _this.movement.angleDir === "right";
            },
            goForward: function () {
                return _this.movement.thrust === "forward";
            },
            slowDown: function () {
                return _this.movement.thrust === "slowDown";
            },
            shoot: function () {
                return _this.movement.isShooting;
            }
        };
    };
    EnemyShip.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
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