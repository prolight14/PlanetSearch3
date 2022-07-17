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
var SpaceImg = (function (_super) {
    __extends(SpaceImg, _super);
    function SpaceImg(scene, x, y, texture) {
        var _this = _super.call(this, scene, x, y, texture) || this;
        _this.destroyQueued = false;
        scene.add.existing(_this);
        scene.world.initGameObject(_this);
        return _this;
    }
    return SpaceImg;
}(Phaser.GameObjects.Image));
exports.default = SpaceImg;
//# sourceMappingURL=SpaceImg.js.map