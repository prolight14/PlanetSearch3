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
        _this.physics = {
            jumpSpeed: 80,
            jumpHeight: 367,
            swimSpeed: new Phaser.Math.Vector2(40, 40),
            accelerationX: {
                onGround: 420,
                inAir: 360,
                inLiquid: 30
            },
            drag: new Phaser.Math.Vector2(300, 160),
            maxVelocity: new Phaser.Math.Vector2(156, 480),
        };
        _this.inLiquid = false;
        _this.isJumping = false;
        _this.onEdgeOfLiquid = false;
        _this.dead = false;
        scene.physics.add.existing(_this);
        _this.updatePhysics();
        return _this;
    }
    Lifeform.prototype.getDamage = function (object) {
        return this.damage;
    };
    Lifeform.prototype.takeDamage = function (object) {
        this.hp -= object.getDamage(this);
    };
    Lifeform.prototype.updatePhysics = function () {
        var _a = this.physics, drag = _a.drag, maxVelocity = _a.maxVelocity;
        this.setDrag(drag.x, drag.y).setMaxVelocity(maxVelocity.x, maxVelocity.y);
    };
    Lifeform.prototype.resetPhysics = function () {
    };
    Lifeform.prototype.preUpdate = function (time, delta) {
        if (this.dead) {
            return;
        }
        _super.prototype.preUpdate.call(this, time, delta);
        var _a = this.physics, accelerationX = _a.accelerationX, swimSpeed = _a.swimSpeed, jumpSpeed = _a.jumpSpeed, jumpHeight = _a.jumpHeight;
        var onGround = this.body.blocked.down;
        var acceleration = onGround ? accelerationX.onGround : accelerationX.inAir;
        if (this.inLiquid) {
            acceleration = accelerationX.inLiquid;
            this.setDrag(400, 400);
            this.setGravityY(0);
            this.setMaxVelocity(100, 100);
        }
        else {
            this.updatePhysics();
        }
        if (this.controls.left()) {
            this.setAccelerationX(-acceleration);
        }
        if (this.controls.right()) {
            this.setAccelerationX(acceleration);
        }
        if (!this.controls.left() && !this.controls.right()) {
            this.setAccelerationX(0);
        }
        if (this.inLiquid) {
            if (this.controls.up()) {
                this.setVelocityY(-swimSpeed.y);
            }
            if (this.controls.down()) {
                this.setVelocityY(swimSpeed.y);
            }
        }
        else {
            if (this.controls.up()) {
                if (onGround) {
                    this.isJumping = true;
                }
            }
            else {
                this.isJumping = false;
            }
            if (this.isJumping) {
                this.body.velocity.y -= jumpSpeed;
                if (this.body.velocity.y < -jumpHeight) {
                    this.isJumping = false;
                }
            }
        }
        this.inLiquid = false;
        this.onEdgeOfLiquid = false;
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
    return Lifeform;
}(GameObject_1.default));
exports.default = Lifeform;
//# sourceMappingURL=Lifeform.js.map