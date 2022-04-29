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
var MapSystem_1 = require("../../mapSystem/space/MapSystem");
var SpaceMapScene = (function (_super) {
    __extends(SpaceMapScene, _super);
    function SpaceMapScene() {
        return _super.call(this, "spaceMap") || this;
    }
    SpaceMapScene.prototype.preload = function () {
    };
    SpaceMapScene.prototype.create = function () {
        this.starScene = this.scene.get("starSceneController");
        this.spaceSceneCam = this.scene.get("space").cameras.main;
        this.map = new MapSystem_1.default();
        var mapWidth = 170;
        var mapHeight = 150;
        this.map.createMap(this, this.spaceSceneCam.width - mapWidth, this.spaceSceneCam.height - mapHeight, mapWidth, mapHeight);
    };
    SpaceMapScene.prototype.update = function () {
        if (!this.scene.isActive("starSceneController")) {
            return;
        }
        var starScene = this.starScene;
        this.map.updateMap(0.22, this.spaceSceneCam, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            starScene.updateToRenderTexture.apply(starScene, args);
        });
    };
    return SpaceMapScene;
}(Phaser.Scene));
exports.default = SpaceMapScene;
//# sourceMappingURL=SpaceMapScene.js.map