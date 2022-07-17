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
var StaticGameObject = (function (_super) {
    __extends(StaticGameObject, _super);
    function StaticGameObject(scene, x, y, texture, frame, solid) {
        var _this = _super.call(this, scene, x, y, texture, frame) || this;
        scene.add.existing(_this);
        return _this;
    }
    StaticGameObject.prototype.onCollide = function (object) {
    };
    StaticGameObject.prototype.onOverlap = function (object) {
    };
    StaticGameObject.prototype.processCollision = function (object) {
    };
    return StaticGameObject;
}(Phaser.Physics.Arcade.Image));
exports.default = StaticGameObject;
//# sourceMappingURL=StaticGameObject.js.map