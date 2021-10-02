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
var Lifeform_1 = require("./Lifeform");
var Beaker = (function (_super) {
    __extends(Beaker, _super);
    function Beaker(scene, x, y, texture, frame) {
        var _this = _super.call(this, scene, x, y, texture, frame) || this;
        _this.isOnSlope = false;
        _this.maxHp = _this.hp = 2;
        _this.damage = 1;
        scene.add.existing(_this);
        scene.physics.add.existing(_this);
        _this.setCollideWorldBounds(true);
        _this.resetPhysics();
        _this.xDir = Phaser.Math.Between(0, 100) < 50 ? "left" : "right";
        _this.controls = {
            left: function () {
                return _this.xDir === "left";
            },
            right: function () {
                return _this.xDir === "right";
            },
            up: function () {
                return _this.yDir === "up";
            },
            down: function () {
                return false;
            },
            activate: function () {
                return false;
            }
        };
        return _this;
    }
    Beaker.prototype.takeDamage = function (object) {
        this.hp -= object.getDamage(this);
    };
    Beaker.prototype.resetPhysics = function () {
        return this.setDrag(30, 0).setMaxVelocity(50, 200);
    };
    Beaker.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        if (!this.wasOnSlope && !this.wasInLiquid) {
            if (this.body.blocked.right || this.body.touching.right) {
                this.xDir = "left";
            }
            if (this.body.blocked.left || this.body.touching.left) {
                this.xDir = "right";
            }
        }
        if (this.wasInLiquid) {
            this.yDir = "up";
        }
        else {
            this.yDir = "";
        }
    };
    Beaker.prototype.onCollide = function (object) {
        if (object.texture.key === "Player") {
            var player = object;
            if (player.body.blocked.down && this.body.touching.up) {
                player.body.velocity.y -= player.enemyBounce;
                this.takeDamage(player);
            }
            else if ((player.body.touching.left || player.body.touching.right) && (this.body.touching.left || this.body.touching.right)) {
                player.takeDamage(this);
            }
        }
    };
    return Beaker;
}(Lifeform_1.default));
exports.default = Beaker;
//# sourceMappingURL=Beaker.js.map