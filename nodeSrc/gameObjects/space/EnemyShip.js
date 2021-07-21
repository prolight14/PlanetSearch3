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
var Ship_1 = require("./Ship");
var timer = function (start, interval, func, scope, args) {
    var startTime = performance.now();
    var called = !start;
    var update = function () {
        if (!called && performance.now() - startTime > interval) {
            called = true;
            return func.apply(scope, args);
        }
    };
    var reset = function () {
        startTime = performance.now();
        called = false;
    };
    return {
        update: update,
        reset: reset
    };
};
var EnemyShip = (function (_super) {
    __extends(EnemyShip, _super);
    function EnemyShip(scene, x, y) {
        var _this = _super.call(this, scene, x, y, "enemyShip") || this;
        _this.turnDir = "";
        _this.controls = {
            turnLeft: function () {
                return _this.turnDir === "left";
            },
            turnRight: function () {
                return _this.turnDir === "right";
            },
            goForward: function () { return true; },
            slowDown: function () { return false; },
            shoot: function () { return false; }
        };
        _this.angleVel = 3;
        _this.speed = 4.5;
        _this.turnTimer = timer(true, 1000, function () {
            switch (true) {
                case Math.random() <= 0.33:
                    this.turnDir = "left";
                    break;
                case Math.random() < 0.67:
                    this.turnDir = "right";
                    break;
                case Math.random() <= 1.0:
                    this.turnDir = "";
                    break;
            }
            this.turnTimer.reset();
        }, _this);
        return _this;
    }
    EnemyShip.prototype.preUpdate = function () {
        Ship_1.default.prototype.preUpdate.apply(this, arguments);
        this.turnTimer.update();
    };
    return EnemyShip;
}(Ship_1.default));
exports.default = EnemyShip;
//# sourceMappingURL=EnemyShip.js.map