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
        var _this = _super.call(this, scene, x, y, "Helix2", 0) || this;
        _this.isLifeform = true;
        _this.inWater = false;
        _this.blinking = false;
        _this.blinkTime = 1000;
        _this.blinkSpeed = 100;
        _this.isOnSlope = false;
        _this.jumping = false;
        _this.jumpSpeed = 80;
        _this.jumpHeight = 310;
        _this.maxHp = _this.hp = 5;
        _this.damage = 1;
        scene.add.existing(_this);
        scene.physics.add.existing(_this);
        _this.setCollideWorldBounds(true);
        _this.resetPhysics().setDisplaySize(16, 32);
        scene.anims.create({
            key: "idle",
            frames: [{ key: "Helix2", frame: 0 }],
            frameRate: 20
        });
        scene.anims.create({
            key: "left",
            frames: [{ key: "Helix2", frame: 3 }, { key: "Helix2", frame: 4 }],
            frameRate: 5,
            repeat: -1
        });
        scene.anims.create({
            key: "right",
            frames: [{ key: "Helix2", frame: 1 }, { key: "Helix2", frame: 2 }],
            frameRate: 5,
            repeat: -1
        });
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
            },
            activate: function () {
                return _this.keys.s.isDown || _this.keys.down.isDown;
            }
        };
        _this.activate = function () {
            return this.controls.activate();
        };
        _this.blinkTimer = _this.scene.time.addEvent({
            delay: _this.blinkSpeed,
            callback: function () {
                _this.setVisible(!_this.visible);
            },
            repeat: -1
        });
        _this.blinkTimer.paused = true;
        return _this;
    }
    Player.prototype.takeDamage = function (object, blink) {
        if (blink === undefined) {
            blink = true;
        }
        if (!this.blinking) {
            this.hp -= object.damage;
            if (blink) {
                this.startBlinking();
            }
        }
    };
    Player.prototype.startBlinking = function () {
        var _this = this;
        this.blinking = true;
        this.blinkTimer.paused = false;
        this.scene.time.delayedCall(this.blinkTime, function () {
            _this.blinking = false;
            _this.setVisible(true);
            _this.blinkTimer.paused = true;
        });
    };
    Player.prototype.resetPhysics = function () {
        return this.setDrag(30, 0).setMaxVelocity(175, 600);
    };
    Player.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        var onGround = this.body.blocked.down;
        if (this.controls.left()) {
            this.setVelocityX(this.body.velocity.x - 8);
            this.anims.play("left", true);
        }
        if (this.controls.right()) {
            this.setVelocityX(this.body.velocity.x + 8);
            this.anims.play("right", true);
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
                this.anims.play("idle");
            }
        }
        if (!onGround) {
            if (this.controls.left()) {
                this.anims.pause(this.anims.currentAnim.frames[1]);
            }
            else if (this.controls.right()) {
                this.anims.pause(this.anims.currentAnim.frames[0]);
            }
        }
        if (this.inWater) {
            if (this.controls.up()) {
                this.setVelocityY(-140);
            }
            else if (this.controls.down()) {
                this.setVelocityY(140);
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
        if (this.y > this.scene.cameras.main.getBounds().height + this.body.halfHeight) {
            this.kill("fellOff");
        }
        else if (this.hp <= 0) {
            this.kill("noHp");
        }
    };
    Player.prototype.isDead = function () {
        return this.dead;
    };
    Player.prototype.kill = function (reason) {
        this.dead = true;
        this.destroy();
    };
    return Player;
}(Phaser.Physics.Arcade.Sprite));
exports.default = Player;
//# sourceMappingURL=Player.js.map