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
var SpaceBackgroundScene = (function (_super) {
    __extends(SpaceBackgroundScene, _super);
    function SpaceBackgroundScene() {
        return _super.call(this, "spaceBackground") || this;
    }
    SpaceBackgroundScene.prototype.preload = function () {
    };
    SpaceBackgroundScene.prototype.create = function () {
        this.background = this.add.graphics();
        var screenWidth = this.game.config.width;
        var screenHeight = this.game.config.height;
        this.background.fillStyle(0x000022);
        this.background.fillRect(0, 0, screenWidth, screenHeight);
    };
    return SpaceBackgroundScene;
}(Phaser.Scene));
exports.default = SpaceBackgroundScene;
//# sourceMappingURL=SpaceBackgroundScene.js.map