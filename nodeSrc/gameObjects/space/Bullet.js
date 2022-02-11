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
var trig_1 = require("../Utils/trig");
var SpaceGameObject_1 = require("./SpaceGameObject");
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(scene, x, y, texture, shootAngle, onCollide, onCollideContext) {
        var _this = _super.call(this, scene, x, y, texture) || this;
        _this.shootAngle = shootAngle;
        _this.speed = 12;
        _this.killTimer = timer_1.default(true, 1600, function () {
            _this.kill();
        });
        _this.setOnCollide(function (colData) {
            if (colData.bodyA.gameObject) {
                var hit = onCollide.call(onCollideContext, colData.bodyA.gameObject);
                if (hit) {
                    _this.kill();
                }
            }
        });
        return _this;
    }
    Bullet.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        this.killTimer.update();
        this.x += trig_1.default.cos(this.shootAngle) * this.speed;
        this.y += trig_1.default.sin(this.shootAngle) * this.speed;
    };
    return Bullet;
}(SpaceGameObject_1.default));
exports.default = Bullet;
//# sourceMappingURL=Bullet.js.map