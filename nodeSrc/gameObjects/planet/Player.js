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
        var _this = _super.call(this, scene.matter.world, x, y, "helix") || this;
        scene.add.existing(_this);
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
        var _a = Phaser.Physics.Matter.Matter, Body = _a.Body, Bodies = _a.Bodies;
        var _b = _this, w = _b.width, h = _b.height;
        var mainBody = Bodies.rectangle(0, 0, w, h, { chamfer: { radius: 10 } });
        ;
        _this.sensors = {
            bottom: Bodies.rectangle(0, h * 0.5 + 2, w * 0.8, 2, { isSensor: true }),
        };
        _this.sensors.bottom.__id = 23;
        var compoundBody = Body.create({
            parts: [mainBody, _this.sensors.bottom],
            frictionStatic: 0,
            frictionAir: 0.02,
            friction: 0.1
        });
        _this.setExistingBody(compoundBody);
        _this.setFixedRotation();
        _this.setOrigin(0.5, 0.7);
        _this.setPosition(x, y);
        _this.isTouching = {
            ground: false
        };
        scene.matter.world.on("beforeupdate", _this.resetTouching, _this);
        scene.matterCollision.addOnCollideStart({
            objectA: [_this.sensors.bottom],
            callback: _this.onSensorCollide,
            context: _this
        });
        return _this;
    }
    Player.prototype.onSensorCollide = function (_a) {
        var bodyA = _a.bodyA, bodyB = _a.bodyB, pair = _a.pair;
        if (bodyB.isSensor)
            return;
        this.isTouching.ground = true;
    };
    Player.prototype.resetTouching = function () {
        this.isTouching.ground = false;
    };
    Player.prototype.preUpdate = function (time, delta) {
        var _this = this;
        if (this.controls.left()) {
            this.setVelocityX(-4);
        }
        if (this.controls.right()) {
            this.setVelocityX(4);
        }
        if (!this.controls.left() && !this.controls.right()) {
        }
        var isOnGround = this.isTouching.ground;
        if (this.controls.up() && this.canJump && isOnGround) {
            this.setVelocityY(-8);
            this.canJump = false;
            this.jumpCooldownTimer = this.scene.time.addEvent({
                delay: 250,
                callback: function () { return (_this.canJump = true); }
            });
        }
        if (this.y > this.scene.cameras.main.getBounds().height) {
        }
    };
    Player.prototype.kill = function () {
        this.dead = true;
        this.destroy();
    };
    return Player;
}(Phaser.Physics.Matter.Image));
exports.default = Player;
//# sourceMappingURL=Player.js.map