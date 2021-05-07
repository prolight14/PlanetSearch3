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
var Planet_1 = require("../../gameObjects/space/Planet");
var PlayerShip_1 = require("../../gameObjects/space/PlayerShip");
var SpaceLoadingScene = (function (_super) {
    __extends(SpaceLoadingScene, _super);
    function SpaceLoadingScene() {
        return _super.call(this, "spaceLoading") || this;
    }
    SpaceLoadingScene.prototype.preload = function () {
        this.load.image("playerShip", "./assets/Space/Ships/playerShip.png");
        this.load.image("IcyDwarfPlanet", "./assets/Space/Planets/IcyDwarfPlanet.png");
        this.load.image("RedDustPlanet", "./assets/Space/Planets/RedDustPlanet.png");
    };
    SpaceLoadingScene.prototype.addObjectsToSpace = function () {
        console.log("loading");
        var world = this.scene.get("space").csp.world;
        var planets = world.add.gameObjectArray(Planet_1.default);
        planets.add(this, 69000, 60000, "IcyDwarfPlanet").setScale(13, 13);
        planets.add(this, 56000, 70000, "RedDustPlanet").setScale(13, 13);
        world.add.gameObjectArray(PlayerShip_1.default).add(this.scene.get("space"), 56000, 70000 + 1000, "playerShip");
    };
    SpaceLoadingScene.prototype.update = function () {
    };
    return SpaceLoadingScene;
}(Phaser.Scene));
exports.default = SpaceLoadingScene;
//# sourceMappingURL=SpaceLoadingScene.js.map