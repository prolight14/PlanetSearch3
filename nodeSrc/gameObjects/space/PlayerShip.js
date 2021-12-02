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
var timer_1 = require("../Utils/timer");
var Ship_1 = require("./Ship");
var PlayerShip = (function (_super) {
    __extends(PlayerShip, _super);
    function PlayerShip(scene, x, y) {
        var _this = _super.call(this, scene, x, y, "helixShip", undefined, { shape: scene.cache.json.get("helixShipShape").helixShip }) || this;
        _this.xp = 0;
        _this.crests = 0;
        _this.maxSpeed = 5;
        _this.speedAcl = 0.25;
        _this.speedDeacl = 0.025;
        _this.manualSpeedDeacl = 0.15;
        _this.angleDeacl = 0.05;
        _this.pointerDX = 0;
        _this.pointerDY = 0;
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
        var shots = 0;
        _this.shootTimer = timer_1.default(false, 625, function () {
            shots = 0;
        });
        _this.scene.input.keyboard.on("keyup-Z", function () {
            if (++shots === 15) {
                _this.shootTimer.reset();
            }
            if (shots >= 15) {
                return;
            }
            var theta = 30 * Phaser.Math.DEG_TO_RAD + _this.rotation;
            var length = 25;
            var bullet = _this.bullets.add(_this.scene, _this.x + Math.cos(theta) * length, _this.y + Math.sin(theta) * length, _this.angle - 90);
            bullet.setRotation(_this.rotation);
            var theta = 150 * Phaser.Math.DEG_TO_RAD + _this.rotation;
            var length = 25;
            var bullet = _this.bullets.add(_this.scene, _this.x + Math.cos(theta) * length, _this.y + Math.sin(theta) * length, _this.angle - 90);
            bullet.setRotation(_this.rotation);
            var theta = (30 - 50) * Phaser.Math.DEG_TO_RAD + _this.rotation;
            var length = 17;
            var bullet = _this.bullets.add(_this.scene, _this.x + Math.cos(theta) * length, _this.y + Math.sin(theta) * length, _this.angle - 90);
            bullet.setRotation(_this.rotation);
            var theta = (150 + 50) * Phaser.Math.DEG_TO_RAD + _this.rotation;
            var length = 17;
            var bullet = _this.bullets.add(_this.scene, _this.x + Math.cos(theta) * length, _this.y + Math.sin(theta) * length, _this.angle - 90);
            bullet.setRotation(_this.rotation);
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
    PlayerShip.prototype.collectCrests = function (crest) {
        this.crests += crest.amt;
        console.log(this.crests);
    };
    PlayerShip.prototype.collectXPStars = function (xpStar) {
        this.xp += xpStar.amt;
    };
    PlayerShip.prototype.setBullets = function (playerShipBullets) {
        this.bullets = playerShipBullets;
    };
    PlayerShip.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        this.shootTimer.update();
        var rot = this.rotation + Math.PI / 2;
        var length = this.height * this.scaleX * 0.4;
        this.particles.x = this.x + Math.cos(rot) * length;
        this.particles.y = this.y + Math.sin(rot) * length;
        this.pEmitter.setAngle(this.angle + 67.5 + 45 * Math.random());
        this.pEmitter.setVisible(this.speed > 0.0);
        this.pEmitter.setSpeed(this.speed * 30);
    };
    return PlayerShip;
}(Ship_1.default));
exports.default = PlayerShip;
//# sourceMappingURL=PlayerShip.js.map