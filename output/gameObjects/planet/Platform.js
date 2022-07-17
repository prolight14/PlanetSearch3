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
var Platform = (function (_super) {
    __extends(Platform, _super);
    function Platform(scene, x, y) {
        return _super.call(this, scene, x, y, "GrassTileset", 0) || this;
    }
    return Platform;
}(StaticGameObject_1.default));
exports.default = Platform;
//# sourceMappingURL=Platform.js.map