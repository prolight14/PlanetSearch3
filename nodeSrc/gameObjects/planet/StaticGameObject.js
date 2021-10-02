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
var GameObject = (function (_super) {
    __extends(GameObject, _super);
    function GameObject(scene, x, y, texture, frame, solid) {
        var _this = _super.call(this, scene, x, y, texture, frame) || this;
        scene.add.existing(_this);
        scene.gameObjects.push(_this);
        if (solid === undefined) {
            solid = true;
        }
        if (solid) {
            scene.solidGameObjects.push(_this);
        }
        return _this;
    }
    GameObject.prototype.onCollide = function (object) {
    };
    GameObject.prototype.onOverlap = function (object) {
    };
    GameObject.prototype.processCollision = function (object) {
    };
    return GameObject;
}(Phaser.Physics.Arcade.Image));
exports.default = GameObject;
//# sourceMappingURL=StaticGameObject.js.map