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
var Bullet_1 = require("./Bullet");
var PlayerShipBullet = (function (_super) {
    __extends(PlayerShipBullet, _super);
    function PlayerShipBullet(scene, x, y, shootAngle) {
        var _this = _super.call(this, scene, x, y, "helixShipLvl1Bullet") || this;
        _this.shootAngle = shootAngle;
        _this.speed = 15;
        _this.damage = 2;
        _this.setCollisionGroup(1);
        _this.setCollidesWith(0);
        _this.setOnCollide(function (colData) {
            if (colData.bodyA.gameObject && colData.bodyA.gameObject.isShip) {
                _this.onCollide(colData.bodyA.gameObject);
            }
        });
        return _this;
    }
    PlayerShipBullet.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
    };
    PlayerShipBullet.prototype.onCollide = function (object) {
        object.takeDamage(this);
        this.kill();
    };
    return PlayerShipBullet;
}(Bullet_1.default));
exports.default = PlayerShipBullet;
//# sourceMappingURL=PlayerShipBullet.js.map