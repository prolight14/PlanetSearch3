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
var SpaceGameObject_1 = require("./SpaceGameObject");
var Star = (function (_super) {
    __extends(Star, _super);
    function Star(scene, x, y, texture) {
        var _this = _super.call(this, scene, x, y, texture) || this;
        _this.getType = function () {
            return "body";
        };
        _this.radius = 600;
        _this.damageSpeed = 0.005;
        _this.setStatic(true);
        _this.body.collisionFilter = {
            'group': -1,
            'category': 2,
            'mask': 0,
        };
        return _this;
    }
    Star.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        this.bodyConf.update();
    };
    Star.prototype.getDamage = function (object) {
        var dx = this.x - object.x;
        var dy = this.y - object.y;
        var radius = this.displayWidth * 0.5;
        return (1 - (dx * dx + dy * dy) / (radius * radius)) * (1 - this.damageSpeed);
    };
    Star.prototype.onCollide = function (object) {
        if (object.isShip) {
            object.takeDamage(this);
        }
    };
    return Star;
}(SpaceGameObject_1.default));
exports.default = Star;
//# sourceMappingURL=Star.js.map