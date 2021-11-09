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
var SpaceStatsUIScene = (function (_super) {
    __extends(SpaceStatsUIScene, _super);
    function SpaceStatsUIScene() {
        return _super.call(this, "spaceStatsUI") || this;
    }
    SpaceStatsUIScene.prototype.preload = function () {
    };
    SpaceStatsUIScene.prototype.create = function () {
        this.spaceScene = this.scene.get("space");
        this.statsGraphics = this.add.graphics();
        this.arraysWithShips = ["hyperBeamerSType"];
        this.cameras.main.startFollow(this.spaceScene.cameras.main);
    };
    SpaceStatsUIScene.prototype.update = function () {
        this.statsGraphics.clear();
        var world = this.spaceScene.csp.world;
    };
    return SpaceStatsUIScene;
}(Phaser.Scene));
exports.default = SpaceStatsUIScene;
//# sourceMappingURL=SpaceStatsUIScene.js.map