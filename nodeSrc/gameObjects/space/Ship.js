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
var SpaceGameObject_1 = require("./SpaceGameObject");
var Ship = (function (_super) {
    __extends(Ship, _super);
    function Ship(scene, x, y, texture) {
        return _super.call(this, scene, x, y, texture) || this;
    }
    Ship.prototype.preUpdate = function () {
        if (this.controls.turnLeft()) {
            this.setAngle(this.angle - this.angleVel);
        }
        if (this.controls.turnRight()) {
            this.setAngle(this.angle + this.angleVel);
        }
        if (this.controls.goForward()) {
            var angle = Phaser.Math.DEG_TO_RAD * (this.angle - 90);
            this.x += Math.cos(angle) * this.speed;
            this.y += Math.sin(angle) * this.speed;
        }
        this.bodyConf.update();
    };
    return Ship;
}(SpaceGameObject_1.default));
exports.default = Ship;
//# sourceMappingURL=Ship.js.map