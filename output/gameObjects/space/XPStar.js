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
var SpaceGameObject_1 = require("./SpaceGameObject");
var XPStar = (function (_super) {
    __extends(XPStar, _super);
    function XPStar(scene, x, y, texture) {
        var _this = _super.call(this, scene, x, y, texture) || this;
        _this.startBlinkingTime = 10000;
        _this.blinkInterval = 30;
        _this.despawnAfterBlinkingTime = 4500;
        _this.isBlinking = false;
        _this.amt = 1;
        _this.setAngle(Phaser.Math.RND.between(0, 180));
        _this.setCollisionGroup(2);
        _this.setCollidesWith(0);
        _this.despawnTimer = timer_1.default(true, _this.startBlinkingTime, function () {
            _this.startBlinking();
        });
        if (texture === "xpStar") {
            _this.amt = 2;
        }
        _this.setOnCollide(function (colData) {
            if (colData.bodyA.gameObject && colData.bodyA.gameObject._arrayName === "playerShip") {
                var playerShip = colData.bodyA.gameObject;
                _this.onCollide(playerShip);
            }
        });
        return _this;
    }
    XPStar.prototype.startBlinking = function () {
        var _this = this;
        if (this.isBlinking) {
            return;
        }
        this.isBlinking = true;
        this.blinkTimer = timer_1.default(true, this.blinkInterval, function () {
            _this.setVisible(!_this.visible);
            _this.blinkTimer.reset(_this.blinkInterval);
        });
        this.despawnTimer = timer_1.default(true, this.despawnAfterBlinkingTime, function () {
            _this.destroy();
        });
    };
    XPStar.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        this.despawnTimer.update();
        if (this.isBlinking) {
            this.blinkTimer.update();
        }
    };
    XPStar.prototype.onCollide = function (playerShip) {
        playerShip.collectXPStars(this);
        this.kill();
    };
    return XPStar;
}(SpaceGameObject_1.default));
exports.default = XPStar;
//# sourceMappingURL=XPStar.js.map