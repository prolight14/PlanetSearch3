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
var PlanetBackScene = (function (_super) {
    __extends(PlanetBackScene, _super);
    function PlanetBackScene() {
        var _this = _super.call(this, "planetBack") || this;
        _this.ignoreLayersAmt = 2;
        return _this;
    }
    PlanetBackScene.prototype.preload = function () {
        this.load.spritesheet("scrollBackground", "./assets/Planet/Backgrounds/GrassPlanet/GrassPlanet.png", {
            frameWidth: 400,
            frameHeight: 225
        });
    };
    PlanetBackScene.prototype.create = function () {
        var backgraphics = this.add.graphics().setScrollFactor(0);
        backgraphics.fillStyle(0x00ABFF);
        backgraphics.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        backgraphics.setDepth(-2);
        this.layerSpeeds = [
            -1,
            -1,
            0.75,
            0.6,
            0.4
        ];
        this.layers = [];
        this.nextLayers = [];
        for (var i = 0; i < this.layerSpeeds.length; i++) {
            var layer = this.add.image(0, 0, "scrollBackground", i);
            layer.setScrollFactor(0, 0).setDisplayOrigin(0, 0).setScale(2, 2);
            this.layers.push(layer);
            var nextLayer = this.add.image(0, 0, "scrollBackground", i);
            nextLayer.setScrollFactor(0, 0).setDisplayOrigin(0, 0).setScale(2, 2);
            this.nextLayers.push(nextLayer);
        }
    };
    PlanetBackScene.prototype.update = function () {
        var planetLogicScene = this.scene.get("planetLogic");
        var cam = planetLogicScene.cameras.main;
        var width = this.game.config.width;
        var diff = width - cam.scrollX;
        for (var i = this.ignoreLayersAmt; i < this.layers.length; i++) {
            var layer = this.layers[i];
            var speed = diff / this.layerSpeeds[i];
            var index = -Math.floor((speed + width) / layer.displayWidth);
            layer.x = layer.displayWidth * index + speed;
            this.nextLayers[i].x = layer.displayWidth * (index + 1) + speed;
            layer.y = 100;
            this.nextLayers[i].y = 100;
        }
    };
    return PlanetBackScene;
}(Phaser.Scene));
exports.default = PlanetBackScene;
//# sourceMappingURL=PlanetBackScene.js.map