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
var InvisibleBlock = (function (_super) {
    __extends(InvisibleBlock, _super);
    function InvisibleBlock(scene, x, y) {
        return _super.call(this, scene, x, y, "invisibleBlock") || this;
    }
    return InvisibleBlock;
}(Phaser.GameObjects.Image));
exports.default = InvisibleBlock;
//# sourceMappingURL=InvisibleBlock.js.map