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
        var _this = _super.call(this, {
            key: "planetLogic",
            physics: {
                default: "arcade",
                arcade: {
                    gravity: { y: 950 },
                }
            },
        }) || this;
        _this.init();
        return _this;
    }
    PlanetLogicScene.prototype.init = function () {
        if (this.loadData !== undefined) {
            return;
        }
        this.loadData = {
            currentWorld: "CavePLanet",
            currentTileset: "CaveTileset-extruded",
            currentLevel: "Cave"
        };
        this.presetData = {
            currentLevel: this.loadData.currentLevel
        };
    };
    PlanetLogicScene.prototype.receiveLevelInfo = function (levelInfo) {
    };
    PlanetLogicScene.prototype.preload = function () {
        this.load.spritesheet("Player", "./assets/Planet/GameObjects/Player/NewHelix.png", { frameWidth: 17, frameHeight: 29 });
        var currentWorld = this.loadData.currentWorld;
        var currentTileset = this.loadData.currentTileset;
        var currentLevel = this.loadData.currentLevel;
        this.load.image(currentTileset, "./assets/Planet/levels/" + currentWorld + "/tilesets/" + currentTileset + ".png");
        this.load.tilemapTiledJSON(currentLevel, "./assets/Planet/levels/" + currentWorld + "/tilemaps/" + currentLevel + ".json");
    };
    PlanetLogicScene.prototype.create = function (inputData) {
        var tilemap = this.make.tilemap({ key: this.loadData.currentLevel, tileWidth: 16, tileHeight: 16 });
        var tileset = tilemap.addTilesetImage(this.loadData.currentTileset);
        var foregroundLayer = tilemap.createLayer("Foreground", tileset, 0, 0);
        var groundLayer = tilemap.createLayer("Ground", tileset, 0, 0).setCollisionByProperty({ collides: true });
        var backgroundLayer = tilemap.createLayer("Background", tileset, 0, 0);
        this.player = new Player_1.default(this, 200, 100);
        this.physics.add.collider(this.player, groundLayer);
        this.physics.world.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);
        this.physics.world.setBoundsCollision(true, true, true, false);
        var cam = this.cameras.main;
        cam.startFollow(this.player);
        cam.setZoom(2);
        cam.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);
    };
    PlanetLogicScene.prototype.getPlayerStats = function () {
        return this.player.getStats();
    };
    return PlanetLogicScene;
}(Phaser.Scene));
exports.default = PlanetLogicScene;
//# sourceMappingURL=PlanetLogicScene.js.map