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
var Lava = (function (_super) {
    __extends(Lava, _super);
    function Lava(scene, x, y) {
        var _this = _super.call(this, scene, x, y, "lava") || this;
        _this.damage = 1;
        scene.add.existing(_this);
        scene.physics.add.existing(_this);
        _this.setMaxVelocity(0, 0);
        _this.setOrigin(0, 0);
        _this.setScale(16 / _this.displayWidth, 16 / _this.displayHeight);
        _this.setVisible(false);
        return _this;
    }
    Lava.prototype.onCollide = function (object) {
        object.takeDamage(this);
    };
    return Lava;
}(Phaser.Physics.Arcade.Image));
exports.default = Lava;
//# sourceMappingURL=Lava.js.map