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
var GreenBeaker_1 = require("../../gameObjects/planet/GreenBeaker");
var Checkpoint_1 = require("../../gameObjects/planet/Checkpoint");
var logger_1 = require("../../logger");
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
            currentWorld: "GrassPlanet2",
            currentTileset: "GrassTileset2-extruded",
            currentLevel: "start"
        };
    };
    PlanetLogicScene.prototype.preload = function () {
        this.load.spritesheet("checkpoint", "./assets/Planet/GameObjects/Interactibles/Checkpoint.png", { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("Player", "./assets/Planet/GameObjects/Player/Helix2.png", { frameWidth: 16, frameHeight: 32 });
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
                            doorGroup.add(new Door_1.default(_this, tile.pixelX + tile.width / 2, tile.pixelY + tile.height));
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
        var spawnPoint = tilemap.findObject("Objects", function (obj) { return obj.name === "Player Spawn Point"; });
        if (!spawnPoint) {
            spawnPoint = {
                x: 0,
                y: 0
            };
        }
        if (inputData.loadType === "door") {
            spawnPoint = this.getDoorEntryPoint(tilemap, doorGroup, inputData.doorGoto);
        }
        this.handleDoors(tilemap, doorGroup);
        this.player = new Player_1.default(this, spawnPoint.x, spawnPoint.y);
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
        this.physics.add.overlap(this.player, slopeGroup, function (player, slope) {
            slope.processCollision(player);
        }, undefined, this);
        this.physics.add.overlap(this.player, invisiblePlatformGroup, function (player, invisiblePlatform) {
            invisiblePlatform.processCollision(player);
        }, undefined, this);
        this.physics.add.collider(greenBeakerGroup, worldLayer);
        this.physics.add.overlap(greenBeakerGroup, waterGroup, function (beaker, water) {
            water.onCollide(beaker);
        }, undefined, this);
        this.physics.add.overlap(greenBeakerGroup, lavaGroup, function (beaker, lava) {
            lava.onCollide(beaker);
        }, undefined, this);
        this.physics.add.overlap(greenBeakerGroup, slopeGroup, function (beaker, slope) {
            slope.processCollision(beaker);
        }, undefined, this);
        this.physics.add.overlap(greenBeakerGroup, slopeGroup, function (beaker, slope) {
            beaker.onCollide(slope);
        }, undefined, this);
        this.physics.add.collider(greenBeakerGroup, this.player, function (beaker, player) {
            beaker.onCollide(player);
        }, undefined, this);
        this.physics.add.overlap(checkpointGroup, this.player, function (checkpoint, player) {
            checkpoint.onCollide(player);
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
    PlanetLogicScene.prototype.getDoorEntryPoint = function (tilemap, doorGroup, doorGoto) {
        var objects = tilemap.getObjectLayer("Objects").objects;
        for (var i = 0; i < objects.length; i++) {
            var obj = objects[i];
            if (obj.name !== "Door") {
                continue;
            }
            for (var j in obj.properties) {
                var prop = obj.properties[j];
                if (prop.name === "door" && prop.value === doorGoto.door) {
                    var doors = doorGroup.children.getArray();
                    for (var i = 0; i < doors.length; i++) {
                        var door = doors[i];
                        var doorBounds = door.getBounds();
                        if (doorBounds.contains(obj.x, obj.y)) {
                            return {
                                x: door.x,
                                y: door.y
                            };
                        }
                    }
                }
            }
        }
        logger_1.default.warn("Couldn't find door at door symbol '" + doorGoto.door + "'");
        return {
            x: 0,
            y: 0
        };
    };
    PlanetLogicScene.prototype.handleDoors = function (tilemap, doorGroup, spawnPoint, doorGoto) {
        var objects = tilemap.getObjectLayer("Objects").objects;
        var _loop_1 = function () {
            var obj = objects[i];
            if (obj.name === "Door") {
                if (spawnPoint !== undefined && doorGoto !== undefined) {
                    for (var j in obj.properties) {
                        var prop = obj.properties[j];
                        if (prop.name === "door" && prop.value === doorGoto.door) {
                            doorGroup.getChildren().forEach(function (door) {
                                var doorBounds = door.getBounds();
                                if (doorBounds.contains(obj.x, obj.y)) {
                                    spawnPoint.x = door.x;
                                    spawnPoint.y = door.y;
                                }
                            });
                        }
                    }
                }
                doorGroup.getChildren().forEach(function (door) {
                    if (door.getBounds().contains(obj.x, obj.y)) {
                        var gotoLevel, gotoDoor;
                        for (var j in obj.properties) {
                            var prop = obj.properties[j];
                            if (prop.name === "gotoLevel") {
                                gotoLevel = prop.value;
                            }
                            else if (prop.name === "gotoDoor") {
                                gotoDoor = prop.value;
                            }
                        }
                        if (gotoLevel && gotoDoor) {
                            door.setGoto({
                                level: gotoLevel,
                                door: gotoDoor
                            });
                        }
                    }
                });
            }
        };
        for (var i = 0; i < objects.length; i++) {
            _loop_1();
        }
    };
    PlanetLogicScene.prototype.update = function (time, delta) {
        this.processBrickCollision();
    };
    PlanetLogicScene.prototype.processBrickCollision = function () {
        if (!this.player.body.blocked.up) {
            return;
        }
        var mainCam = this.cameras.main;
        var tileLeft = this.tilemap.getTileAtWorldXY(this.player.body.x, this.player.body.y - 1, undefined, mainCam, "World");
        var tileRight = this.tilemap.getTileAtWorldXY(this.player.body.right, this.player.body.y - 1, undefined, mainCam, "World");
        if (tileLeft && tileLeft.index === BlockIndexes_1.default.GRASS_PLANET_2.BRICK) {
            var bounds = tileLeft.getBounds();
            this.tilemap.removeTileAt(tileLeft.x, tileLeft.y, true, true, "World");
            this.scene.get("planetEffects").emitBricks(bounds);
        }
        else if (tileRight && tileRight.index === BlockIndexes_1.default.GRASS_PLANET_2.BRICK) {
            var bounds = tileRight.getBounds();
            this.tilemap.removeTileAt(tileRight.x, tileRight.y, true, true, "World");
            this.scene.get("planetEffects").emitBricks(bounds);
        }
    };
    PlanetLogicScene.prototype.restart = function (inputData) {
        var _this = this;
        this.scene.pause("planetLogic");
        var effectsScene = this.scene.get("planetEffects");
        effectsScene.fadeOut(500, 0, 0, 0);
        effectsScene.cameras.main.once("camerafadeoutcomplete", function () {
            _this.scene.run("planetLogic");
            if (inputData.loadType === "door") {
                _this.loadData.currentLevel = inputData.doorGoto.level;
            }
            _this.scene.restart(inputData);
        });
    };
    return PlanetLogicScene;
}(Phaser.Scene));
exports.default = PlanetLogicScene;
//# sourceMappingURL=PlanetLogicScene.js.map