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
var Beaker_1 = require("./Beaker");
var GreenBeaker = (function (_super) {
    __extends(GreenBeaker, _super);
    function GreenBeaker(scene, x, y) {
        var _this = _super.call(this, scene, x, y, "GreenBeaker", 0) || this;
        _this.anims.create({
            key: "left",
            frames: [{ key: "GreenBeaker", frame: 0 }],
            frameRate: 20
        });
        _this.anims.create({
            key: "right",
            frames: [{ key: "GreenBeaker", frame: 1 }],
            frameRate: 20
        });
        _this.anims.create({
            key: "idle",
            frames: [{ key: "GreenBeaker", frame: 2 }],
            frameRate: 20
        });
        _this.anims.create({
            key: "leftSmall",
            frames: [{ key: "GreenBeaker", frame: 3 }],
            frameRate: 20
        });
        _this.anims.create({
            key: "rightSmall",
            frames: [{ key: "GreenBeaker", frame: 4 }],
            frameRate: 20
        });
        _this.anims.create({
            key: "idleSmall",
            frames: [{ key: "GreenBeaker", frame: 5 }],
            frameRate: 20
        });
        return _this;
    }
    GreenBeaker.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        if (this.hp < 2) {
            this.setScale(1, 0.5);
            this.displayHeight *= 2;
            if (this.controls.left()) {
                this.anims.play("leftSmall");
            }
            if (this.controls.right()) {
                this.anims.play("rightSmall");
            }
            if (!this.controls.left() && !this.controls.right()) {
                this.anims.play("idleSmall");
            }
        }
        else {
            if (this.controls.left()) {
                this.anims.play("left");
            }
            if (this.controls.right()) {
                this.anims.play("right");
            }
            if (!this.controls.left() && !this.controls.right()) {
                this.anims.play("idle");
            }
        }
    };
    return GreenBeaker;
}(Beaker_1.default));
exports.default = GreenBeaker;
//# sourceMappingURL=GreenBeaker.js.map