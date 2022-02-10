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
        var _this = _super.call(this, scene.matter.world, x, y, texture, frame) || this;
        _this.killed = false;
        _this.destroyOnKill = true;
        _this.destroyQueued = false;
        scene.add.existing(_this);
        scene.csp.initGameObject(_this);
        return _this;
    }
    SpaceGameObject.prototype.preUpdate = function (time, delta) {
        this.bodyConf.update();
        _super.prototype.preUpdate.call(this, time, delta);
    };
    SpaceGameObject.prototype.onCollide = function (object) {
    };
    SpaceGameObject.prototype.onKill = function () {
    };
    SpaceGameObject.prototype.kill = function () {
        if (this.killed) {
            return;
        }
        this.killed = true;
        this.onKill();
        this.destroyQueued = this.destroyOnKill;
    };
    return SpaceGameObject;
}(Phaser.Physics.Matter.Sprite));
exports.default = SpaceGameObject;
//# sourceMappingURL=SpaceGameObject.js.map