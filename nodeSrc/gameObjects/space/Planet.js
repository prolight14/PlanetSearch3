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
var Planet = (function (_super) {
    __extends(Planet, _super);
    function Planet(scene, x, y, texture) {
        var _this = _super.call(this, scene, x, y, texture) || this;
        _this.setScale(7);
        _this.setStatic(true);
        _this.body.collisionFilter = {
            'group': -1,
            'category': 2,
            'mask': 0,
        };
        return _this;
    }
    Planet.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        this.bodyConf.update();
    };
    Planet.prototype.onCollide = function (object) {
        if (object._arrayName === "playerShip") {
        }
    };
    return Planet;
}(SpaceGameObject_1.default));
exports.default = Planet;
//# sourceMappingURL=Planet.js.map