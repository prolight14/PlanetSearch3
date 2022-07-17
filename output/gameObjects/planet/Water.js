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
var StaticGameObject_1 = require("./StaticGameObject");
var Water = (function (_super) {
    __extends(Water, _super);
    function Water(scene, x, y) {
        var _this = _super.call(this, scene, x, y, "water") || this;
        scene.physics.add.existing(_this);
        _this.setMaxVelocity(0, 0);
        _this.setOrigin(0, 0);
        _this.setVisible(false);
        return _this;
    }
    Water.prototype.onOverlap = function (object) {
        object.inLiquid = true;
    };
    return Water;
}(StaticGameObject_1.default));
exports.default = Water;
//# sourceMappingURL=Water.js.map