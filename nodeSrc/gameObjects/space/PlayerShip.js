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
        _this.useAngleAcl = true;
        _this.angleVel = 0;
        _this.keys = {
            a: scene.input.keyboard.addKey('a'),
            d: scene.input.keyboard.addKey('d'),
            w: scene.input.keyboard.addKey('w'),
            s: scene.input.keyboard.addKey('s'),
            space: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        };
        _this.particles = scene.add.particles("helixShipParticle");
        _this.pEmitter = _this.particles.createEmitter({
            lifespan: 500,
            scale: 1.5,
            speed: 70,
            angle: { min: 65, max: 115 },
            rotate: 0,
            x: 0,
            y: 0,
            quantity: 1,
            alpha: {
                start: 0xFF,
                end: 0x00,
                steps: 10
            }
        });
        _this.controls = {
            turnLeft: function () {
                return _this.keys.a.isDown;
            },
            turnRight: function () {
                return _this.keys.d.isDown;
            },
            goForward: function () {
                return _this.keys.w.isDown;
            },
            slowDown: function () {
                return _this.keys.s.isDown;
            },
            shoot: function () {
                return _this.keys.space.isDown;
            }
        };
        _this.setScale(1, 1);
        _this.speed = 6;
        _this.setupShootTimer();
        return _this;
    }
    PlayerShip.prototype.setupShootTimer = function () {
        var _this = this;
        this.shootTimer = timer_1.default(true, 450, function () {
            if (_this.controls.shoot()) {
                _this.bullets.add(_this.scene, _this.x, _this.y, _this.angle - 90);
            }
            _this.shootTimer.reset();
        });
    };
    PlayerShip.prototype.setBullets = function (playerShipBullets) {
        this.bullets = playerShipBullets;
    };
    PlayerShip.prototype.preUpdate = function () {
        Ship_1.default.prototype.preUpdate.apply(this, arguments);
        var rot = this.rotation + Math.PI / 2;
        this.particles.x = this.x + Math.cos(rot) * this.height;
        this.particles.y = this.y + Math.sin(rot) * this.height;
        this.pEmitter.setAngle(this.angle + 90 + 90 * Math.random() - 45);
        this.pEmitter.setVisible(this.speed >= 0.005);
        this.pEmitter.setSpeed(this.speed * 10);
        this.shootTimer.update();
    };
    return PlayerShip;
}(Ship_1.default));
exports.default = PlayerShip;
//# sourceMappingURL=PlayerShip.js.map