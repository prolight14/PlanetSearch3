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
    PlanetEffectsScene.prototype.preload = function () {
        this.load.image("brick", "./assets/Planet/GameObjects/blocks/brick.png");
    };
    PlanetEffectsScene.prototype.create = function () {
        this.initBrickBreaking(3, 3);
    };
    PlanetEffectsScene.prototype.update = function (time, delta) {
    };
    PlanetEffectsScene.prototype.initBrickBreaking = function (blocksCol, blocksRow) {
        var graphicsHolders = {};
        var srcTexture = this.textures.get("brick").getSourceImage();
        for (var col = 0; col < blocksCol; col++) {
            for (var row = 0; row < blocksRow; row++) {
                var texKey = "brick" + col.toString() + row.toString();
                graphicsHolders[texKey] = this.make.graphics({ x: 0, y: 0, add: false });
                var maxX = srcTexture.width / blocksCol;
                var maxY = srcTexture.height / blocksRow;
                for (var x = 0; x < maxX; x++) {
                    for (var y = 0; y < maxY; y++) {
                        var pixel = this.textures.getPixel(x + maxX * col, y + maxY * row, "brick");
                        if (pixel.alpha > 0) {
                            graphicsHolders[texKey].fillStyle(pixel.color, pixel.alpha);
                            graphicsHolders[texKey].fillRect(x, y, 1, 1);
                        }
                    }
                }
                graphicsHolders[texKey].generateTexture(texKey, maxX, maxY);
            }
        }
        this.add.image(200, 200, "brick00").setScrollFactor(0).setScale(2);
        this.add.image(200, 200 + 16, "brick01").setScrollFactor(0).setScale(2);
        this.add.image(200 + 16, 200, "brick10").setScrollFactor(0).setScale(2);
        this.add.image(200 + 16, 200 + 16, "brick11").setScrollFactor(0).setScale(2);
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
//# sourceMappingURL=PlanetEffectsScene-old%20copy.js.map