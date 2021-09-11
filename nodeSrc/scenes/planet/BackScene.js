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
        this.load.image("grassLnadFront", "./assets/Planet/Backgrounds/GrassPlanet2/GrassLandFront.png");
    };
    PlanetBackScene.prototype.create = function () {
        var backgraphics = this.add.graphics().setScrollFactor(0);
        backgraphics.fillStyle(0x00ABFF);
        backgraphics.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        backgraphics.setDepth(-2);
        this.add.image(this.game.canvas.width / 4, this.game.canvas.height / 4, "background").setScrollFactor(0).setDisplayOrigin(0, 0);
        this.add.image(this.game.canvas.width, this.game.canvas.height / 4, "background").setScrollFactor(0).setDisplayOrigin(0, 0);
    };
    PlanetBackScene.prototype.update = function () {
    };
    return PlanetBackScene;
}(Phaser.Scene));
exports.default = PlanetBackScene;
//# sourceMappingURL=BackScene.js.map