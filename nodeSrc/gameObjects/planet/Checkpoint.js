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
var GameObject_1 = require("./GameObject");
var Checkpoint = (function (_super) {
    __extends(Checkpoint, _super);
    function Checkpoint(scene, x, y) {
        var _this = _super.call(this, scene, x, y, "checkpoint", 0) || this;
        _this.setOrigin(0, 0);
        scene.physics.add.existing(_this);
        _this.setImmovable(true);
        _this.setGravity(0, 0);
        _this.setMaxVelocity(0, 0);
        return _this;
    }
    Checkpoint.prototype.onCollide = function (object) {
        if (object.texture.key === "Player") {
            var player = object;
            this.setFrame(1);
            player.onCheckpoint(this);
            this.scene.scene.get("planetLoader").setTravelerSaveInfo({
                playerStats: player.getStats()
            });
        }
    };
    return Checkpoint;
}(GameObject_1.default));
exports.default = Checkpoint;
//# sourceMappingURL=Checkpoint.js.map