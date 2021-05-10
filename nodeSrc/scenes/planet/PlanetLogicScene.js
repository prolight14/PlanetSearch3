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
var Player_1 = require("../../gameObjects/planet/Player");
var PlanetLogicScene = (function (_super) {
    __extends(PlanetLogicScene, _super);
    function PlanetLogicScene() {
        return _super.call(this, {
            key: "planetLogic",
            physics: {
                default: "arcade",
                arcade: {
                    gravity: { y: 800 }
                }
            }
        }) || this;
    }
    PlanetLogicScene.prototype.preload = function () {
        this.load.image("IcyTileset", "./assets/Planet/Levels/Tilesets/IcyTileset.png");
        this.load.tilemapTiledJSON("IcyTilemap", "./assets/Planet/Levels/Tilemaps/IcyTilemap.json");
    };
    PlanetLogicScene.prototype.create = function () {
        var tilemap = this.make.tilemap({ key: "IcyTilemap", tileWidth: 16, tileHeight: 16 });
        var tileset = tilemap.addTilesetImage("IcyTileset", "IcyTileset");
        var worldLayer = tilemap.createStaticLayer("World", tileset, 0, 0);
        worldLayer.setCollisionByProperty({ collides: true });
        var spawnPoint = tilemap.findObject("Objects", function (obj) { return obj.name === "Spawn Point"; });
        this.player = new Player_1.default(this, spawnPoint.x, spawnPoint.y);
        this.physics.add.collider(this.player, worldLayer);
        var cam = this.cameras.main;
        cam.startFollow(this.player);
        cam.setZoom(2);
        cam.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);
    };
    PlanetLogicScene.prototype.update = function () {
        if (this.player.dead) {
            this.scene.restart();
        }
    };
    return PlanetLogicScene;
}(Phaser.Scene));
exports.default = PlanetLogicScene;
//# sourceMappingURL=PlanetLogicScene.js.map