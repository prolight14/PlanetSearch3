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
var trig_1 = require("../Utils/trig");
var Bullet_1 = require("./Bullet");
var CollisionCategories_1 = require("./CollisionCategories");
var Ship_1 = require("./Ship");
var PlayerShip = (function (_super) {
    __extends(PlayerShip, _super);
    function PlayerShip(scene, x, y) {
        var _this = _super.call(this, scene, x, y, "helixShip", undefined) || this;
        _this.hp = 10;
        _this.maxHp = 10;
        _this.xp = 0;
        _this.nextLevelXp = 100;
        _this.crests = 0;
        _this.maxSpeed = 7.5;
        _this.speedAcl = 0.2;
        _this.speedDeacl = 0.0745;
        _this.manualSpeedDeacl = 0.15;
        _this.angleDeacl = 0.06;
        _this.destroyOnKill = false;
        _this.canShoot = true;
        _this.gamepadControls = {
            forward: false,
            slowdown: false,
        };
        _this.targetAngle = 0;
        _this.setCollisionCategory(CollisionCategories_1.default.PLAYER);
        _this.setCollidesWith([CollisionCategories_1.default.ENEMY, CollisionCategories_1.default.PICK_UP, CollisionCategories_1.default.ENEMY_BULLETS]);
        _this.ignoreDestroy = true;
        _this.useAngleAcl = true;
        _this.angleVel = 0;
        _this.keys = {
            turnLeft: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            turnRight: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            goForward: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            slowdown: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
        };
        if (!(_this.bullets = scene.world.get.gameObjectArray("playerShipBullet"))) {
            _this.bullets = scene.world.add.gameObjectArray(Bullet_1.default, "playerShipBullet");
            _this.bullets.define("ignoreDestroy", true);
        }
        var shootInterval = 200;
        _this.shootLimiterTimer = timer_1.default(true, shootInterval, function () {
            _this.canShoot = true;
            _this.shootLimiterTimer.reset();
        });
        _this.particles = scene.add.particles("helixShipParticle");
        _this.pEmitter = _this.particles.createEmitter({
            lifespan: 500,
            scale: { start: 1.5, end: 0 },
            rotate: 45,
            x: 0,
            y: 0,
            quantity: 1,
        });
        _this.pEmitter.setAlpha(function (p, k, t) {
            return 1 - t;
        });
        var BTNS = {
            B: 0,
            A: 1,
            Y: 2,
            X: 3,
            L: 4,
            R: 5,
            ZL: 6,
            ZR: 7,
        };
        if (scene.input.gamepad !== undefined &&
            scene.input.gamepad.total > 0 &&
            scene.input.gamepad.gamepads.length > 0) {
            _this.usingGamepad = true;
            _this.gamepad = scene.input.gamepad.gamepads[0];
        }
        scene.input.gamepad.on('connected', function (gamepad) {
            this.usingGamepad = true;
            this.gamepad = gamepad;
        });
        scene.input.gamepad.on('disconnected', function (gamepad) {
            this.usingGamepad = false;
            delete this.gamepad;
        });
        scene.input.gamepad.on('down', function (gamepad, button, value) {
            if (value !== 1) {
                return;
            }
            if (!_this.usingGamepad) {
                _this.gamepad = gamepad;
                _this.usingGamepad = true;
            }
            if (button.index === BTNS.ZL) {
                _this.gamepadControls.forward = true;
            }
            if (button.index === BTNS.B) {
                _this.gamepadControls.slowdown = true;
            }
        });
        scene.input.gamepad.on('up', function (gamepad, button, value) {
            if (value !== 0) {
                return;
            }
            if (button.index === BTNS.ZL) {
                _this.gamepadControls.forward = false;
            }
            if (button.index === BTNS.B) {
                _this.gamepadControls.slowdown = false;
            }
            if ((button.index === BTNS.A || button.index === BTNS.ZR) && _this.canShoot) {
                _this.shoot();
                _this.canShoot = false;
            }
        });
        _this.scene.input.keyboard.on("keyup-Z", function () {
            if (_this.canShoot) {
                _this.shoot();
                _this.canShoot = false;
            }
        });
        _this.scene.input.keyboard.on("keyup-SPACE", function () {
            if (_this.canShoot) {
                _this.shoot();
                _this.canShoot = false;
            }
        });
        _this.controls = {
            turnLeft: function () {
                return _this.keys.turnLeft.isDown;
            },
            turnRight: function () {
                return _this.keys.turnRight.isDown;
            },
            goForward: function () {
                return _this.keys.goForward.isDown || _this.gamepadControls.forward;
            },
            slowDown: function () {
                return _this.keys.slowdown.isDown || _this.gamepadControls.slowdown;
            },
            shoot: function () {
                return false;
            }
        };
        _this.targetAngle = _this.angle;
        return _this;
    }
    PlayerShip.prototype.resetStats = function () {
        this.resetKeys();
        this.killed = false;
        this.hp = this.maxHp;
    };
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
    PlayerShip.prototype.shoot = function () {
        this.initBullet(this.angle + 30, 25);
        this.initBullet(this.angle + 150, 25);
        this.initBullet(this.angle - 20, 17);
        this.initBullet(this.angle + 200, 17);
    };
    PlayerShip.prototype.initBullet = function (theta, length, life) {
        var bullet = this.bullets.add(this.scene, this.x + trig_1.default.cos(theta) * length, this.y + trig_1.default.sin(theta) * length, "lightningBlueLong", this.angle - 90, life || 3200, 600, this.bulletOnCollide, this, this.scene.scene.get("spaceLogic").hyperBeamerSTypeArray);
        bullet.speed = 16;
        bullet.setComparePosition(this.x, this.y);
        bullet.setAngle(this.angle);
        bullet.setCollisionCategory(CollisionCategories_1.default.PLAYER_BULLETS);
        bullet.setCollidesWith(CollisionCategories_1.default.ENEMY);
    };
    PlayerShip.prototype.bulletOnCollide = function (gameObject) {
        if (gameObject._arrayName === "hyperBeamerSType") {
            return gameObject.takeDamage(this);
        }
        return false;
    };
    PlayerShip.prototype.updateGamepad = function () {
        if (!this.usingGamepad || this.gamepad === undefined) {
            return;
        }
        var gamepad = this.gamepad;
        var axisX = gamepad.leftStick.x;
        var axisY = gamepad.leftStick.y;
        if (axisX !== 0 || axisY !== 0) {
            this.targetAngle = Phaser.Math.Angle.Normalize(Math.atan2(axisY, axisX) + 90 * Phaser.Math.DEG_TO_RAD);
        }
        this.rotation = Phaser.Math.Angle.RotateTo(this.rotation, this.targetAngle, 0.09);
    };
    PlayerShip.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        this.updateGamepad();
        var length = this.displayHeight * 0.4;
        var refAngle = this.angle + 90;
        this.particles.x = this.x + trig_1.default.cos(refAngle) * length;
        this.particles.y = this.y + trig_1.default.sin(refAngle) * length;
        this.pEmitter.setAngle(this.angle + 67.5 + 45 * Phaser.Math.RND.frac());
        this.pEmitter.setVisible(this.speed > 0.0);
        this.pEmitter.setSpeed(this.speed * 30);
        this.shootLimiterTimer.update();
    };
    PlayerShip.prototype.onKill = function () {
        _super.prototype.onKill.call(this);
        this.scene.handleGameOver();
    };
    return PlayerShip;
}(Ship_1.default));
exports.default = PlayerShip;
//# sourceMappingURL=PlayerShip.js.map