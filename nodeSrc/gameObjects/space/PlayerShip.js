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
var trig_1 = require("../Utils/trig");
var Ship_1 = require("./Ship");
var PlayerShip = (function (_super) {
    __extends(PlayerShip, _super);
    function PlayerShip(scene, x, y) {
        var _this = _super.call(this, scene, x, y, "helixShip", undefined, { shape: scene.cache.json.get("helixShipShape").helixShip }) || this;
        _this.hp = 10;
        _this.maxHp = 10;
        _this.xp = 0;
        _this.nextLevelXp = 100;
        _this.crests = 0;
        _this.maxSpeed = 5;
        _this.speedAcl = 0.25;
        _this.speedDeacl = 0.025;
        _this.manualSpeedDeacl = 0.15;
        _this.angleDeacl = 0.12;
        _this.pointerDX = 0;
        _this.pointerDY = 0;
        _this.setCollisionGroup(2);
        _this.setCollidesWith(0);
        _this.useAngleAcl = true;
        _this.angleVel = 0;
        _this.keys = {
            turnLeft: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            turnRight: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            goForward: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            slowDown: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
            shoot: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
            shootZ: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
        };
        _this.scene.input.keyboard.on("keyup-Z", function () {
            var theta = 30 + _this.angle;
            var length = 25;
            var bullet = _this.bullets.add(_this.scene, _this.x + trig_1.default.cos(theta) * length, _this.y + trig_1.default.sin(theta) * length, _this.angle - 90);
            bullet.setAngle(_this.angle);
            var theta = 150 + _this.angle;
            var length = 25;
            var bullet = _this.bullets.add(_this.scene, _this.x + trig_1.default.cos(theta) * length, _this.y + trig_1.default.sin(theta) * length, _this.angle - 90);
            bullet.setAngle(_this.angle);
            var theta = _this.angle - 20;
            var length = 17;
            var bullet = _this.bullets.add(_this.scene, _this.x + trig_1.default.cos(theta) * length, _this.y + trig_1.default.sin(theta) * length, _this.angle - 90);
            bullet.setAngle(_this.angle);
            var theta = 200 + _this.angle;
            var length = 17;
            var bullet = _this.bullets.add(_this.scene, _this.x + trig_1.default.cos(theta) * length, _this.y + trig_1.default.sin(theta) * length, _this.angle - 90);
            bullet.setAngle(_this.angle);
        });
        _this.scene.input.keyboard.on("keydown-M", function () {
            _this.hp = 0;
        });
        _this.particles = scene.add.particles("helixShipParticle");
        _this.pEmitter = _this.particles.createEmitter({
            lifespan: 500,
            scale: 1.5,
            rotate: 0,
            x: 0,
            y: 0,
            quantity: 1
        });
        _this.pEmitter.setAlpha(function (p, k, t) {
            return 1 - t;
        });
        _this.controls = {
            turnLeft: function () {
                return _this.keys.turnLeft.isDown;
            },
            turnRight: function () {
                return _this.keys.turnRight.isDown;
            },
            goForward: function () {
                return _this.keys.goForward.isDown;
            },
            slowDown: function () {
                return _this.keys.slowDown.isDown;
            },
            shoot: function () {
                return false;
            }
        };
        return _this;
    }
    PlayerShip.prototype.resetKeys = function () {
        for (var i in this.keys) {
            this.keys[i].reset();
        }
    };
    PlayerShip.prototype.getXp = function () {
        return this.xp;
    };
    PlayerShip.prototype.getNextLevelXp = function () {
        return this.nextLevelXp;
    };
    PlayerShip.prototype.collectCrests = function (crest) {
        this.crests += crest.amt;
    };
    PlayerShip.prototype.collectXPStars = function (xpStar) {
        this.xp += xpStar.amt;
    };
    PlayerShip.prototype.setBullets = function (playerShipBullets) {
        this.bullets = playerShipBullets;
    };
    PlayerShip.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        var length = this.height * this.scaleX * 0.4;
        this.particles.x = this.x + trig_1.default.cos(this.angle + 90) * length;
        this.particles.y = this.y + trig_1.default.sin(this.angle + 90) * length;
        this.pEmitter.setAngle(this.angle + 67.5 + 45 * Math.random());
        this.pEmitter.setVisible(this.speed > 0.0);
        this.pEmitter.setSpeed(this.speed * 30);
    };
    PlayerShip.prototype.onKill = function () {
        this.scene.handleGameOver();
    };
    return PlayerShip;
}(Ship_1.default));
exports.default = PlayerShip;
//# sourceMappingURL=PlayerShip.js.map