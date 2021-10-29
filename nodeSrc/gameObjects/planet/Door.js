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
var StaticGameObject_1 = require("./StaticGameObject");
var Door = (function (_super) {
    __extends(Door, _super);
    function Door(scene, x, y) {
        var _this = _super.call(this, scene, x, y, "door", undefined, false) || this;
        scene.physics.add.existing(_this);
        _this.setImmovable(true);
        _this.setVisible(false);
        _this.setMaxVelocity(0, 0);
        _this.setOrigin(0, 0);
        _this.width = _this.displayWidth = 16;
        _this.height = _this.displayHeight = 32;
        return _this;
    }
    Door.prototype.setGoto = function (goto) {
        this.goto = goto;
    };
    Door.prototype.onOverlap = function (object) {
        if (object.texture.key === "Player") {
            var player = object;
            if (player.activate() && player.body.blocked.down) {
                this.scene.scene.get("planetLoader").restart({
                    loadType: "door",
                    reason: "door",
                    doorGoto: this.goto,
                });
            }
        }
    };
    return Door;
}(StaticGameObject_1.default));
exports.default = Door;
//# sourceMappingURL=Door.js.map