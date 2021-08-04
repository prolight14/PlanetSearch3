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
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(scene, x, y) {
        var _this = _super.call(this, scene, x, y, "helix") || this;
        scene.add.existing(_this);
        _this.setDrag(300, 0).setMaxVelocity(145, 500).setScale(0.5, 1);
        _this.keys = {
            a: scene.input.keyboard.addKey('a'),
            d: scene.input.keyboard.addKey('d'),
            w: scene.input.keyboard.addKey('w'),
            s: scene.input.keyboard.addKey('s'),
            left: scene.input.keyboard.addKey("left"),
            right: scene.input.keyboard.addKey("right"),
            up: scene.input.keyboard.addKey("up"),
            down: scene.input.keyboard.addKey("down"),
        };
        _this.controls = {
            left: function () {
                return _this.keys.a.isDown || _this.keys.left.isDown;
            },
            right: function () {
                return _this.keys.d.isDown || _this.keys.right.isDown;
            },
            up: function () {
                return _this.keys.w.isDown || _this.keys.up.isDown;
            },
            down: function () {
                return _this.keys.s.isDown || _this.keys.down.isDown;
            }
        };
        return _this;
    }
    Player.prototype.preUpdate = function (time, delta) {
        var onGround = this.body.blocked.down;
        if (this.controls.left()) {
            this.setAccelerationX(-800);
        }
        if (this.controls.right()) {
            this.setAccelerationX(800);
        }
        if (!this.controls.left() && !this.controls.right()) {
            this.setAccelerationX(0);
        }
        if (this.controls.up() && onGround) {
            this.setVelocityY(-300);
        }
        if (this.y > this.scene.cameras.main.getBounds().height) {
            this.kill();
        }
    };
    Player.prototype.kill = function () {
        this.dead = true;
        this.destroy();
    };
    return Player;
}(Phaser.Physics.Arcade.Image));
exports.default = Player;
//# sourceMappingURL=Player.js.map