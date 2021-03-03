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
var SpaceStarScene_1 = require("./SpaceStarScene");
var SpaceStarLayer1Scene = (function (_super) {
    __extends(SpaceStarLayer1Scene, _super);
    function SpaceStarLayer1Scene() {
        return _super.call(this, "spaceStarLayer1") || this;
    }
    SpaceStarLayer1Scene.prototype.create = function () {
        this.input.once('pointerdown', function () {
            this.scene.add('spaceStarScene', SpaceStarScene_1.default, true, { x: 400, y: 300 });
        }, this);
    };
    SpaceStarLayer1Scene.prototype.update = function () {
    };
    return SpaceStarLayer1Scene;
}(Phaser.Scene));
exports.default = SpaceStarLayer1Scene;
//# sourceMappingURL=odl.js.map