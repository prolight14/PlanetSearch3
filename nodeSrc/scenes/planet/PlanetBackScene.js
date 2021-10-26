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
        return _super.call(this, "planetBack") || this;
    }
    PlanetBackScene.prototype.preload = function () {
        this.load.spritesheet("grassLand", "./assets/Planet/Backgrounds/GrassPlanet2/CaveBackground.png", {
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
            3,
            2.3,
            1.6,
            0.8,
            0.67,
            0.5
        ];
        var layerAmt = 4;
        this.layers = [];
        this.nextLayers = [];
        for (var i = 0; i < layerAmt; i++) {
            var layer = this.add.image(0, 0, "grassLand", i);
            layer.setScrollFactor(0, 0).setDisplayOrigin(0, 0).setScale(2, 2);
            this.layers.push(layer);
            var nextLayer = this.add.image(0, 0, "grassLand", i);
            nextLayer.setScrollFactor(0, 0).setDisplayOrigin(0, 0).setScale(2, 2);
            this.nextLayers.push(nextLayer);
        }
    };
    PlanetBackScene.prototype.update = function () {
        var planetLogicScene = this.scene.get("planetLogic");
        var cam = planetLogicScene.cameras.main;
        var width = this.game.config.width;
        var diff = width - cam.scrollX;
        for (var i = 0; i < this.layers.length; i++) {
            if (this.layerSpeeds[i] === -1) {
                continue;
            }
            var layer = this.layers[i];
            var speed = diff / this.layerSpeeds[i];
            var index = -Math.floor((speed + width) / layer.displayWidth);
            layer.x = layer.displayWidth * index + speed;
            this.nextLayers[i].x = layer.displayWidth * (index + 1) + speed;
        }
    };
    return PlanetBackScene;
}(Phaser.Scene));
exports.default = PlanetBackScene;
//# sourceMappingURL=PlanetBackScene.js.map