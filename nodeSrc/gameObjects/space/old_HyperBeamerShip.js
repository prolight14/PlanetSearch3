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
var old_EnemyShip_1 = require("./old_EnemyShip");
var OLD_HyperBeamerShip = (function (_super) {
    __extends(OLD_HyperBeamerShip, _super);
    function OLD_HyperBeamerShip(scene, x, y, texture) {
        var _this = _super.call(this, scene, x, y, texture) || this;
        _this.speeds.maxSpeed = 3.75;
        return _this;
    }
    return OLD_HyperBeamerShip;
}(old_EnemyShip_1.default));
exports.default = OLD_HyperBeamerShip;
//# sourceMappingURL=old_HyperBeamerShip.js.map