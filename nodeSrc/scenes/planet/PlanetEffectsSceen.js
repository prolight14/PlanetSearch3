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
var PlanetEffectsScene = (function (_super) {
    __extends(PlanetEffectsScene, _super);
    function PlanetEffectsScene() {
        return _super.call(this, "planetEffects") || this;
    }
    PlanetEffectsScene.prototype.create = function () {
        this.load.image("brick", "./assets/Planet/GameObjects/blocks/brick.png");
        this.initBrickBreaking(2, 2);
    };
    PlanetEffectsScene.prototype.update = function (time, delta) {
    };
    PlanetEffectsScene.prototype.initBrickBreaking = function (blocksCol, blocksRow) {
        var graphicsHolders = {};
        var srcTexture = this.textures.get("brick").getSourceImage();
        var blocksWidth = srcTexture.width / blocksCol;
        var blocksHeight = srcTexture.height / blocksRow;
        for (var col = 0; col < blocksCol; col++) {
            for (var row = 0; row < blocksRow; row++) {
                graphicsHolders[col + "-" + row] = this.make.graphics({ x: col * blocksWidth, y: row * blocksHeight, add: false });
            }
        }
    };
    PlanetEffectsScene.prototype.showBrickBreaking = function () {
    };
    PlanetEffectsScene.prototype.fadeOut = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.cameras.main.fadeOut.apply(this.cameras.main, arguments);
    };
    PlanetEffectsScene.prototype.fadeIn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.cameras.main.fadeIn.apply(this.cameras.main, arguments);
    };
    return PlanetEffectsScene;
}(Phaser.Scene));
exports.default = PlanetEffectsScene;
//# sourceMappingURL=PlanetEffectsSceen.js.map