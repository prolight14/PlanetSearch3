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
var Controller = (function (_super) {
    __extends(Controller, _super);
    function Controller() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isOnSlope = false;
        _this.inWater = false;
        _this.jumping = false;
        _this.jumpSpeed = 80;
        _this.jumpHeight = 310;
        _this.xSpeed = 8;
        _this.swimSpeed = 140;
        return _this;
    }
    Controller.prototype.preUpdate = function (time, delta) {
        var onGround = this.body.blocked.down || this.isOnSlope;
        if (this.controls.left()) {
            this.setVelocityX(this.body.velocity.x - this.xSpeed);
        }
        if (this.controls.right()) {
            this.setVelocityX(this.body.velocity.x + this.xSpeed);
        }
        if (!this.controls.left() && !this.controls.right()) {
            var xDeacl = onGround ? 10 : 3;
            if (this.body.velocity.x > 0) {
                this.setVelocityX(this.body.velocity.x - xDeacl);
            }
            if (this.body.velocity.x < 0) {
                this.setVelocityX(this.body.velocity.x + xDeacl);
            }
            if (Math.abs(this.body.velocity.x) < xDeacl) {
                this.setVelocityX(0);
            }
        }
        if (this.inWater) {
            if (this.controls.up()) {
                this.setVelocityY(-this.swimSpeed);
            }
            else if (this.controls.down()) {
                this.setVelocityY(this.swimSpeed);
            }
        }
        else if (onGround && this.controls.up()) {
            this.jumping = true;
        }
        if (!this.controls.up() || this.body.velocity.y < -this.jumpHeight) {
            this.jumping = false;
        }
        if (this.jumping) {
            this.body.velocity.y -= this.jumpSpeed;
        }
        var onCeiling = this.body.blocked.up;
        if (onCeiling) {
            this.jumping = false;
            this.body.velocity.y = 0;
        }
        if (this.inWater) {
            this.setMaxVelocity(85);
            this.setGravity(0);
        }
        else {
            this.resetPhysics();
        }
        if (this.isOnSlope) {
            this.body.setAllowGravity(false);
        }
        else {
            this.body.setAllowGravity(true);
        }
        this.isOnSlope = false;
        this.inWater = false;
    };
    Controller.prototype.resetPhysics = function () {
        return this.setDrag(30, 0).setMaxVelocity(175, 600);
    };
    return Controller;
}(Phaser.Physics.Arcade.Sprite));
exports.default = Controller;
//# sourceMappingURL=Controller.js.map