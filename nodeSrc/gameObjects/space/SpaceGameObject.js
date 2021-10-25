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
var SpaceGameObject = (function (_super) {
    __extends(SpaceGameObject, _super);
    function SpaceGameObject(scene, x, y, texture, frame) {
        var _this_1 = _super.call(this, scene, x, y, texture, frame) || this;
        scene.add.existing(_this_1);
        var _this = _this_1;
        _this_1.bodyConf = {
            moves: true,
            boundingBox: {},
            update: function () { },
            destroy: function () { }
        };
        _this_1.bodyConf.updateBoundingBox = function () {
            this.boundingBox.minX = _this.x - _this.displayWidth / 2;
            this.boundingBox.minY = _this.y - _this.displayHeight / 2;
            this.boundingBox.maxX = _this.x + _this.displayWidth / 2;
            this.boundingBox.maxY = _this.y + _this.displayHeight / 2;
        };
        _this_1.bodyConf.updateBoundingBox();
        return _this_1;
    }
    SpaceGameObject.prototype.onCollide = function (object) {
    };
    return SpaceGameObject;
}(Phaser.GameObjects.Sprite));
exports.default = SpaceGameObject;
//# sourceMappingURL=SpaceGameObject.js.map