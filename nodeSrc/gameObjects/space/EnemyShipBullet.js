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
var EnemyShipBullet = (function (_super) {
    __extends(EnemyShipBullet, _super);
    function EnemyShipBullet(scene, x, y, texture, shootAngle) {
        var _this = _super.call(this, scene, x, y, texture) || this;
        _this.shootAngle = shootAngle;
        _this.speed = 12;
        _this.damage = 1;
        _this.setCollisionGroup(2);
        _this.setCollidesWith(0);
        _this.setOnCollide(function (colData) {
            if (colData.bodyA.gameObject && colData.bodyA.gameObject._arrayName === "playerShip") {
                _this.onCollide(colData.bodyA.gameObject);
            }
        });
        return _this;
    }
    EnemyShipBullet.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
    };
    EnemyShipBullet.prototype.onCollide = function (object) {
        object.takeDamage(this);
        this.kill();
    };
    return EnemyShipBullet;
}(Bullet_1.default));
exports.default = EnemyShipBullet;
//# sourceMappingURL=EnemyShipBullet.js.map