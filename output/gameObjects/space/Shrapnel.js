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
var Shrapnel = (function (_super) {
    __extends(Shrapnel, _super);
    function Shrapnel(scene, x, y, texture) {
        var _this = _super.call(this, scene, x, y, texture) || this;
        _this.setCollisionGroup(2);
        _this.setCollidesWith(0);
        _this.setFrictionAir(0.0001);
        return _this;
    }
    return Shrapnel;
}(SpaceGameObject_1.default));
exports.default = Shrapnel;
//# sourceMappingURL=Shrapnel.js.map