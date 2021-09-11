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
var Player_1 = require("../../gameObjects/planet/Player");
var Slope_1 = require("../../gameObjects/planet/Slope");
var Water_1 = require("../../gameObjects/planet/Water");
var BlockIndexes_1 = require("./BlockIndexes");
var InvisiblePlatform_1 = require("../../gameObjects/planet/InvisiblePlatform");
var PlanetLogicScene = (function (_super) {
    __extends(PlanetLogicScene, _super);
    function PlanetLogicScene() {
        return _super.call(this, {
            key: "planetLogic",
            physics: {
                default: "arcade",
                arcade: {
                    gravity: { y: 950 },
                }
            },
        }) || this;
    }
    PlanetLogicScene.prototype.getPlayerStats = function () {
        return {
            hp: this.player.hp,
            maxHp: this.player.maxHp,
        };
    };
    PlanetLogicScene.prototype.init = function (data) {
        var currentWorld = "GrassPlanet2";
        this.loadData = {
            loadType: (data.loadType === undefined) ? "landedByShip" : data.loadType,
            currentLevel: (data.gotoLevel === undefined) ? "start" : data.gotoLevel,
            currentWorld: currentWorld,
            currentTileset: currentWorld.replace("Planet", "Tileset") + "-extruded",
            enteredDoor: data.gotoDoor,
            playerStats: data.playerStats
        };
    };
    PlanetLogicScene.prototype.preload = function () {
        this.load.spritesheet("Helix2", "./assets/Planet/GameObjects/Player/Helix2.png", { frameWidth: 16, frameHeight: 32 });
        var currentWorld = this.loadData.currentWorld;
        var currentTileset = this.loadData.currentTileset;
        this.load.image(currentTileset, "./assets/Planet/levels/" + currentWorld + "/tilesets/" + currentTileset + ".png");
        this.load.tilemapTiledJSON(this.loadData.currentLevel, "./assets/Planet/levels/" + currentWorld + "/tilemaps/" + this.loadData.currentLevel + ".json");
        this.load.image("brick", "./assets/Planet/GameObjects/blocks/brick.png");
    };
    PlanetLogicScene.prototype.receiveLevelInfo = function (passObj) {
    };
    PlanetLogicScene.prototype.getLevelWidth = function () {
        return this.levelWidth;
    };
    PlanetLogicScene.prototype.getLevelHeight = function () {
        return this.levelHeight;
    };
    PlanetLogicScene.prototype.create = function () {
        var _this = this;
        var tilemap = this.make.tilemap({ key: this.loadData.currentLevel, tileWidth: 16, tileHeight: 16 });
        var tileset = tilemap.addTilesetImage(this.loadData.currentTileset);
        tilemap.createLayer("BackWorld", tileset, 0, 0).setDepth(-1);
        var worldLayer = tilemap.createLayer("World", tileset, 0, 0);
        worldLayer.setDepth(0);
        worldLayer.setCollisionByProperty({ collides: true });
        tilemap.createLayer("Foreground", tileset, 0, 0).setDepth(10);
        this.levelWidth = tilemap.widthInPixels;
        this.levelHeight = tilemap.heightInPixels;
        var waterGroup = this.add.group();
        var lavaGroup = this.add.group();
        var doorGroup = this.add.group();
        var slopeGroup = this.add.group();
        var brickGroup = this.add.group();
        var invisiblePlatformGroup = this.add.group();
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
                            doorGroup.add(new Door_1.default(_this, tile.pixelX + tile.width / 2, tile.pixelY + tile.height));
                            break;
                        case INDEXES_1.DOOR_BOTTOM:
                            tile.setCollision(false, false, false, false);
                            break;
                        case INDEXES_1.SLOPE_UP_LEFT:
                            tile.setCollision(false, false, false, false);
                            slopeGroup.add(new Slope_1.default(_this, "leftUp", tile.pixelX, tile.pixelY));
                            break;
                        case INDEXES_1.SLOPE_UP_RIGHT:
                            tile.setCollision(false, false, false, false);
                            slopeGroup.add(new Slope_1.default(_this, "rightUp", tile.pixelX, tile.pixelY));
                            break;
                        case INDEXES_1.BACK_GRASS:
                            tile.setCollision(false, false, false, false);
                            invisiblePlatformGroup.add(new InvisiblePlatform_1.default(_this, tile.pixelX, tile.pixelY));
                            break;
                        case INDEXES_1.BRICK:
                            break;
                    }
                });
                break;
        }
        var spawnPoint = tilemap.findObject("Objects", function (obj) { return obj.name === "Player Spawn Point"; });
        this.handleDoors(tilemap, doorGroup, spawnPoint);
        this.player = new Player_1.default(this, spawnPoint.x, spawnPoint.y);
        if (this.loadData.loadType === "door") {
            this.player.hp = this.loadData.playerStats.hp;
        }
        this.physics.add.collider(this.player, worldLayer);
        this.physics.add.overlap(this.player, waterGroup, function (player, water) {
            water.onCollide(player);
        }, undefined, this);
        this.physics.add.overlap(this.player, lavaGroup, function (player, lava) {
            lava.onCollide(player);
        }, undefined, this);
        this.physics.add.overlap(this.player, doorGroup, function (player, door) {
            door.onCollide(player);
        }, undefined, this);
        this.physics.add.overlap(this.player, slopeGroup, function (player, slope) {
            slope.processCollision(player);
        }, undefined, this);
        this.physics.add.overlap(this.player, invisiblePlatformGroup, function (player, invisiblePlatform) {
            invisiblePlatform.processCollision(player);
        }, undefined, this);
        this.physics.add.collider(this.player, brickGroup, function (player, brick) {
            brick.onCollide(player);
        }, undefined, this);
        this.physics.world.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);
        this.physics.world.setBoundsCollision(true, true, true, false);
        var cam = this.cameras.main;
        cam.startFollow(this.player);
        cam.setZoom(2);
        cam.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);
        this.scene.get("planetEffects").fadeIn(500, 0, 0, 0);
        this.scene.run("planetUI");
        this.sceneTransitioning = false;
    };
    PlanetLogicScene.prototype.handleDoors = function (tilemap, doorGroup, spawnPoint) {
        var objects = tilemap.getObjectLayer("Objects").objects;
        var _loop_1 = function () {
            var obj = objects[i];
            if (obj.name === "Door") {
                for (var j in obj.properties) {
                    var prop = obj.properties[j];
                    if (prop.name === "door" && prop.value === this_1.loadData.enteredDoor) {
                        doorGroup.getChildren().forEach(function (door) {
                            var doorBounds = door.getBounds();
                            if (doorBounds.contains(obj.x, obj.y)) {
                                spawnPoint.x = door.x;
                                spawnPoint.y = door.y;
                            }
                        });
                    }
                }
                doorGroup.getChildren().forEach(function (door) {
                    if (door.getBounds().contains(obj.x, obj.y)) {
                        for (var j in obj.properties) {
                            var prop = obj.properties[j];
                            if (prop.name === "gotoLevel") {
                                door.goto.level = prop.value;
                            }
                            else if (prop.name === "gotoDoor") {
                                door.goto.door = prop.value;
                            }
                        }
                    }
                });
            }
        };
        var this_1 = this;
        for (var i = 0; i < objects.length; i++) {
            _loop_1();
        }
    };
    PlanetLogicScene.prototype.update = function (time, delta) {
        var _this = this;
        if (this.player.isDead() && !this.sceneTransitioning) {
            var effectsScene = this.scene.get("planetEffects");
            effectsScene.fadeOut(500, 0, 0, 0);
            effectsScene.cameras.main.once("camerafadeoutcomplete", function () {
                _this.scene.restart();
            });
            this.sceneTransitioning = true;
        }
    };
    return PlanetLogicScene;
}(Phaser.Scene));
exports.default = PlanetLogicScene;
//# sourceMappingURL=PlanetLogicScene.js.map