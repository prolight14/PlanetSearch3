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
var GameObject_1 = require("./GameObject");
var Lifeform = (function (_super) {
    __extends(Lifeform, _super);
    function Lifeform(scene, x, y, texture, frame) {
        var _this = _super.call(this, scene, x, y, texture, frame) || this;
        _this.hp = 2;
        _this.maxHp = 2;
        _this.damage = 1;
        _this.isLifeform = true;
        _this.inLiquid = false;
        _this.isOnSlope = false;
        _this.wasInLiquid = false;
        _this.wasOnSlope = false;
        _this.isJumping = false;
        _this.jumpSpeed = 80;
        _this.jumpHeight = 310;
        _this.xSpeed = 8;
        _this.maxVel = { x: 175, y: 600 };
        _this.drag = { x: 30, y: 0 };
        _this.xDeacl = 10;
        _this.xDeaclInAir = 3;
        _this.ySwimSpeed = 140;
        _this.maxVelInWater = 75;
        _this.dead = false;
        scene.physics.add.existing(_this);
        _this.resetPhysics();
        return _this;
    }
    Lifeform.prototype.getDamage = function (object) {
        return this.damage;
    };
    Lifeform.prototype.takeDamage = function (object) {
        this.hp -= object.getDamage(this);
    };
    Lifeform.prototype.resetPhysics = function () {
        return this.setDrag(this.drag.x, this.drag.y).setMaxVelocity(this.maxVel.x, this.maxVel.y);
    };
    Lifeform.prototype.preUpdate = function (time, delta) {
        if (this.dead) {
            return;
        }
        _super.prototype.preUpdate.call(this, time, delta);
        var onGround = this.body.blocked.down || this.isOnSlope;
        if (this.controls.left()) {
            this.setVelocityX(this.body.velocity.x - this.xSpeed);
        }
        if (this.controls.right()) {
            this.setVelocityX(this.body.velocity.x + this.xSpeed);
        }
        if (!this.controls.left() && !this.controls.right()) {
            var xDeacl = onGround ? this.xDeacl : this.xDeaclInAir;
            if (this.body.velocity.x > 0) {
                this.setVelocityX(this.body.velocity.x - xDeacl);
            }
            if (this.body.velocity.x < 0) {
                this.setVelocityX(this.body.velocity.x + xDeacl);
            }
            if (Math.abs(this.body.velocity.x) < xDeacl) {
                this.setVelocityX(0);
                this.anims.play("idle");
            }
        }
        if (this.inLiquid) {
            if (this.controls.up()) {
                this.setVelocityY(-this.ySwimSpeed);
            }
            else if (this.controls.down()) {
                this.setVelocityY(this.ySwimSpeed);
            }
        }
        else if (onGround && this.controls.up()) {
            this.isJumping = true;
        }
        if (!this.controls.up() || this.body.velocity.y < -this.jumpHeight) {
            this.isJumping = false;
        }
        if (this.isJumping) {
            this.body.velocity.y -= this.jumpSpeed;
        }
        var onCeiling = this.body.blocked.up;
        if (onCeiling) {
            this.isJumping = false;
            this.body.velocity.y = 0;
        }
        if (this.inLiquid) {
            this.setMaxVelocity(this.maxVelInWater);
            this.setGravity(0);
        }
        else {
            this.resetPhysics();
        }
        this.body.setAllowGravity(!this.isOnSlope);
        this.wasInLiquid = this.inLiquid;
        this.wasOnSlope = this.isOnSlope;
        this.isOnSlope = false;
        this.inLiquid = false;
        if (this.y > this.scene.cameras.main.getBounds().height + this.body.halfHeight) {
            this.kill("fellOff");
        }
        else if (this.hp <= 0) {
            this.kill("noHp");
        }
    };
    Lifeform.prototype.isDead = function () {
        return this.dead;
    };
    Lifeform.prototype.kill = function (reason) {
        var _this = this;
        this.dead = true;
        this.scene.time.delayedCall(0, function () {
            _this.destroy();
        });
    };
    Lifeform.prototype.onCollide = function (gameObject) {
    };
    return Lifeform;
}(GameObject_1.default));
exports.default = Lifeform;
//# sourceMappingURL=Lifeform.js.map