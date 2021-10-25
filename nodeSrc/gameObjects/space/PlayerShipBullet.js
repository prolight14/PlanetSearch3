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
        var _this = _super.call(this, scene, x, y, "playerShipBullet") || this;
        _this.shootAngle = shootAngle;
        _this.speed = 15;
        _this.damage = 2;
        return _this;
    }
    return PlayerShipBullet;
}(Bullet_1.default));
exports.default = PlayerShipBullet;
//# sourceMappingURL=PlayerShipBullet.js.map