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
var Door_1 = require("../../gameObjects/planet/Door");
var Lava_1 = require("../../gameObjects/planet/Lava");
var Slope_1 = require("../../gameObjects/planet/Slope");
var Water_1 = require("../../gameObjects/planet/Water");
var BlockIndexes_1 = require("./BlockIndexes");
var InvisiblePlatform_1 = require("../../gameObjects/planet/InvisiblePlatform");
var GreenBeaker_1 = require("../../gameObjects/planet/GreenBeaker");
var Checkpoint_1 = require("../../gameObjects/planet/Checkpoint");
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
        _this.gameObjects = [];
        _this.solidGameObjects = [];
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
    PlanetLogicScene.prototype.preload = function () {
        this.load.spritesheet("checkpoint", "./assets/Planet/GameObjects/Interactibles/Checkpoint.png", { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("Player", "./assets/Planet/GameObjects/Player/NewHelix.png", { frameWidth: 17, frameHeight: 29 });
        this.load.spritesheet("GreenBeaker", "./assets/Planet/GameObjects/Enemy/Beakers/GreenBeaker.png", { frameWidth: 16, frameHeight: 16 });
        var currentWorld = this.loadData.currentWorld;
        var currentTileset = this.loadData.currentTileset;
        var currentLevel = this.loadData.currentLevel;
        this.load.image(currentTileset, "./assets/Planet/levels/" + currentWorld + "/tilesets/" + currentTileset + ".png");
        this.load.tilemapTiledJSON(currentLevel, "./assets/Planet/levels/" + currentWorld + "/tilemaps/" + currentLevel + ".json");
    };
    PlanetLogicScene.prototype.receiveLevelInfo = function (levelInfo) {
    };
    PlanetLogicScene.prototype.create = function (inputData) {
        var _this = this;
        var tilemap = this.make.tilemap({ key: this.loadData.currentLevel, tileWidth: 16, tileHeight: 16 });
        var tileset = tilemap.addTilesetImage(this.loadData.currentTileset);
        tilemap.createLayer("BackWorld", tileset, 0, 0).setDepth(-1);
        var worldLayer = tilemap.createLayer("World", tileset, 0, 0);
        worldLayer.setDepth(0);
        worldLayer.setCollisionByProperty({ collides: true });
        tilemap.createLayer("Foreground", tileset, 0, 0).setDepth(10);
        this.gameObjects.length = 0;
        this.solidGameObjects.length = 0;
        var waterGroup = this.add.group();
        var lavaGroup = this.add.group();
        var doorGroup = this.add.group();
        var slopeGroup = this.add.group();
        var invisiblePlatformGroup = this.add.group();
        var greenBeakerGroup = this.add.group();
        var checkpointGroup = this.add.group();
        switch (this.loadData.currentWorld) {
            case "GrassPlanet2":
                var INDEXES_1 = BlockIndexes_1.default.GRASS_PLANET_2;
                var WATERS_1 = [INDEXES_1.WATER_TOP, INDEXES_1.WATER, INDEXES_1.WATER_BLANK];
                var LAVA_1 = [INDEXES_1.LAVA_TOP, INDEXES_1.LAVA, INDEXES_1.LAVA_BLANK];
                worldLayer.forEachTile(function (tile) {
                    if (WATERS_1.indexOf(tile.index) !== -1) {
                        tile.setCollision(false, false, false, false);
                        waterGroup.add(new Water_1.default(_this, tile.pixelX, tile.pixelY));
                        return;
                    }
                    else if (LAVA_1.indexOf(tile.index) !== -1) {
                        tile.setCollision(false, false, false, false);
                        lavaGroup.add(new Lava_1.default(_this, tile.pixelX, tile.pixelY));
                        return;
                    }
                    switch (tile.index) {
                        case INDEXES_1.DOOR_TOP:
                            tile.setCollision(false, false, false, false);
                            doorGroup.add(new Door_1.default(_this, tile.pixelX, tile.pixelY));
                            break;
                        case INDEXES_1.DOOR_BOTTOM:
                            tile.setCollision(false, false, false, false);
                            break;
                        case INDEXES_1.SLOPE_LEFT_UP:
                            tile.setCollision(false, false, false, false);
                            slopeGroup.add(new Slope_1.default(_this, "leftUp", tile.pixelX, tile.pixelY));
                            break;
                        case INDEXES_1.SLOPE_RIGHT_UP:
                            tile.setCollision(false, false, false, false);
                            slopeGroup.add(new Slope_1.default(_this, "rightUp", tile.pixelX, tile.pixelY));
                            break;
                        case INDEXES_1.BACK_GRASS:
                            tile.setCollision(false, false, false, false);
                            invisiblePlatformGroup.add(new InvisiblePlatform_1.default(_this, tile.pixelX, tile.pixelY));
                            break;
                        case INDEXES_1.CHECKPOINT:
                            worldLayer.removeTileAt(tile.x, tile.y);
                            checkpointGroup.add(new Checkpoint_1.default(_this, tile.pixelX, tile.pixelY));
                            break;
                    }
                });
                break;
        }
        var itemsLayer = tilemap.createLayer("Items", tileset, 0, 0);
        switch (this.loadData.currentWorld) {
            case "GrassPlanet2":
                var INDEXES_2 = BlockIndexes_1.default.GRASS_PLANET_2;
                itemsLayer.forEachTile(function (tile) {
                    switch (tile.index) {
                        case INDEXES_2.GREEN_BEAKER:
                            greenBeakerGroup.add(new GreenBeaker_1.default(_this, tile.pixelX, tile.pixelY));
                            itemsLayer.removeTileAt(tile.x, tile.y);
                            break;
                    }
                });
                break;
        }
        var loaderScene = this.scene.get("planetLoader");
        this.player = loaderScene.loadPlayer(inputData, tilemap, doorGroup, checkpointGroup, this.loadData.currentLevel || inputData.currentLevel, this.presetData.currentLevel);
        checkpointGroup.setDepth(10);
        this.physics.add.collider(this.player, worldLayer);
        this.physics.add.collider(greenBeakerGroup, worldLayer);
        this.physics.add.collider(this.solidGameObjects, this.solidGameObjects, function (objectA, objectB) {
            objectA.onCollide(objectB);
            objectB.onCollide(objectA);
        });
        this.physics.add.overlap(this.gameObjects, this.gameObjects, function (objectA, objectB) {
            objectA.onOverlap(objectB);
            objectB.onOverlap(objectA);
        });
        this.physics.world.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);
        this.physics.world.setBoundsCollision(true, true, true, false);
        var cam = this.cameras.main;
        cam.startFollow(this.player);
        cam.setZoom(2);
        cam.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);
        this.scene.get("planetEffects").fadeIn(500, 0, 0, 0);
        this.graphics = this.add.graphics();
        this.tilemap = tilemap;
    };
    PlanetLogicScene.prototype.getPlayerStats = function () {
        return this.player.getStats();
    };
    PlanetLogicScene.prototype.update = function (time, delta) {
        this.scene.get("planetEffects").processBrickCollision(this.player, this.tilemap);
    };
    return PlanetLogicScene;
}(Phaser.Scene));
exports.default = PlanetLogicScene;
//# sourceMappingURL=PlanetLogicScene-old.js.map