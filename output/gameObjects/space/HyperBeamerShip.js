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
var EnemyShip_1 = require("./EnemyShip");
var HyperBeamerShip = (function (_super) {
    __extends(HyperBeamerShip, _super);
    function HyperBeamerShip(scene, x, y, texture) {
        var _this = _super.call(this, scene, x, y, texture) || this;
        _this.maxSpeed = 3.75;
        return _this;
    }
    return HyperBeamerShip;
}(EnemyShip_1.default));
exports.default = HyperBeamerShip;
//# sourceMappingURL=HyperBeamerShip.js.map