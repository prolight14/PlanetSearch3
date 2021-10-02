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
var InvisiblePlatform = (function (_super) {
    __extends(InvisiblePlatform, _super);
    function InvisiblePlatform(scene, x, y) {
        var _this = _super.call(this, scene, x, y, "invisiblePlatform", undefined, false) || this;
        scene.physics.add.existing(_this);
        _this.setMaxVelocity(0, 0);
        _this.setOrigin(0, 0);
        _this.setScale(0.5, 0.5);
        _this.setVisible(false);
        return _this;
    }
    InvisiblePlatform.prototype.onOverlap = function (object) {
        if (object.body.velocity.y > 0 && object.body.y + object.body.height <= this.body.y + object.body.deltaAbsY()) {
            object.body.y = this.body.y - object.body.height;
            object.body.velocity.y = 0;
            object.body.blocked.down = true;
        }
    };
    return InvisiblePlatform;
}(StaticGameObject_1.default));
exports.default = InvisiblePlatform;
//# sourceMappingURL=InvisiblePlatform.js.map