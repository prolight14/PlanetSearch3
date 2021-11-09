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
var HyperBeamerShip_1 = require("./HyperBeamerShip");
var timer_1 = require("../Utils/timer");
var StateMachine_1 = require("../Utils/StateMachine");
var HyperBeamerSType = (function (_super) {
    __extends(HyperBeamerSType, _super);
    function HyperBeamerSType(scene, x, y) {
        var _this_1 = _super.call(this, scene, x, y, "hyperBeamerSTypeGreen") || this;
        _this_1.setCollisionGroup(1);
        _this_1.setCollidesWith(0);
        _this_1.particles = scene.add.particles("hyperBeamerSTypeGreenParticle");
        _this_1.pEmitter = _this_1.particles.createEmitter({
            lifespan: 500,
            scale: 1.5,
            rotate: 0,
            x: 0,
            y: 0,
            quantity: 1
        });
        _this_1.pEmitter.setAlpha(function (p, k, t) {
            return 1 - t;
        });
        var _this = _this_1;
        _this_1.sm = new StateMachine_1.default({
            "wander": {
                start: function () {
                    var _this_1 = this;
                    this.changeDirTimer = timer_1.default(true, 500, function (stopTurningTime) {
                        _this_1.turn(Math.random() < 0.5 ? "left" : "right", stopTurningTime || 500, function () {
                            _this_1.changeDirTimer.reset(Phaser.Math.Between(500, 1500), [Phaser.Math.Between(500, 1500)]);
                        });
                    });
                },
                turn: function (turnDir, time, callback) {
                    _this.turnDir = turnDir;
                    this.redirectTimer = timer_1.default(true, time, function () {
                        _this.turnDir = "";
                        callback();
                    });
                },
                update: function () {
                    this.changeDirTimer.update();
                    if (this.redirectTimer !== undefined) {
                        this.redirectTimer.update();
                    }
                }
            }
        });
        _this_1.sm.start("wander");
        return _this_1;
    }
    HyperBeamerSType.prototype.preUpdate = function () {
        HyperBeamerShip_1.default.prototype.preUpdate.apply(this, arguments);
        var rot = this.rotation + Math.PI / 2;
        var length = this.height * this.scaleX * 0.4;
        this.particles.x = this.x + Math.cos(rot) * length;
        this.particles.y = this.y + Math.sin(rot) * length;
        this.pEmitter.setAngle(this.angle + 67.5 + 45 * Math.random());
        this.pEmitter.setVisible(this.speed >= 0.005);
        this.pEmitter.setSpeed(this.speed * 30);
        this.sm.emit("update", []);
    };
    return HyperBeamerSType;
}(HyperBeamerShip_1.default));
exports.default = HyperBeamerSType;
//# sourceMappingURL=HyperBeamerSType.js.map