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
var Slope = (function (_super) {
    __extends(Slope, _super);
    function Slope(scene, way, x, y) {
        var _this = _super.call(this, scene, x, y, "slope") || this;
        _this.way = way;
        scene.add.existing(_this);
        scene.physics.add.existing(_this);
        _this.setMaxVelocity(0, 0);
        _this.setImmovable(true);
        _this.setOrigin(0, 0);
        _this.setScale(16 / _this.displayWidth, 16 / _this.displayHeight);
        _this.setVisible(false);
        switch (_this.way) {
            case "leftUp":
                _this.triangle = new Phaser.Geom.Triangle(_this.x, _this.y, _this.x, _this.y + _this.displayHeight, _this.x + _this.displayWidth, _this.y + _this.displayHeight);
                _this.processCollision = function (object) {
                    if (object.body.x <= this.body.x) {
                        object.body.y = this.body.y - object.body.height;
                    }
                    object.isOnSlope = false;
                    if (this.intersects(object.getBounds())) {
                        var dx = object.body.x - this.body.x;
                        object.y = this.body.bottom + dx - object.body.height;
                        object.body.blocked.down = true;
                        object.isOnSlope = true;
                        object.body.velocity.y = 0;
                    }
                };
                break;
            case "rightUp":
                _this.triangle = new Phaser.Geom.Triangle(_this.x, _this.y + _this.displayHeight, _this.x + _this.displayWidth, _this.y, _this.x + _this.displayWidth, _this.y + _this.displayHeight);
                _this.processCollision = function (object) {
                    if (object.body.right >= this.body.right) {
                        object.body.y = this.body.y - object.body.height;
                    }
                    object.isOnSlope = false;
                    if (this.intersects(object.getBounds())) {
                        var dx = this.body.x - object.body.x;
                        object.y = this.body.bottom + dx - object.body.height;
                        object.body.blocked.down = true;
                        object.isOnSlope = true;
                        object.body.velocity.y = 0;
                    }
                };
                break;
        }
        return _this;
    }
    Slope.prototype.processCollision = function (object) { };
    Slope.prototype.intersects = function (rect) {
        return Phaser.Geom.Intersects.RectangleToTriangle(rect, this.triangle);
    };
    return Slope;
}(Phaser.Physics.Arcade.Image));
exports.default = Slope;
//# sourceMappingURL=Slope.js.map