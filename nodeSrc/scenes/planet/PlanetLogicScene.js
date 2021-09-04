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
        this.loadData = {
            loadType: (data.loadType === undefined) ? "landedByShip" : data.loadType,
            currentLevel: (data.gotoLevel === undefined) ? "start" : data.gotoLevel,
            enteredDoor: data.gotoDoor,
            playerStats: data.playerStats
        };
    };
    PlanetLogicScene.prototype.preload = function () {
        this.load.spritesheet("Helix2", "./assets/Planet/GameObjects/Player/Helix2.png", { frameWidth: 16, frameHeight: 32 });
        this.load.image("GrassTileset-extruded", "./assets/Planet/levels/GrassPlanet/tilesets/GrassTileset-extruded.png");
        this.load.tilemapTiledJSON(this.loadData.currentLevel, "./assets/Planet/levels/GrassPlanet/tilemaps/" + this.loadData.currentLevel + ".json");
    };
    PlanetLogicScene.prototype.receiveLevelInfo = function (passObj) {
    };
    PlanetLogicScene.prototype.create = function () {
        var _this = this;
        var backgraphics = this.add.graphics().setScrollFactor(0);
        backgraphics.fillStyle(0x00ABFF);
        backgraphics.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        var tilemap = this.make.tilemap({ key: this.loadData.currentLevel, tileWidth: 16, tileHeight: 16 });
        var tileset = tilemap.addTilesetImage("GrassTileset-extruded");
        if (tilemap.getTileLayerNames().indexOf("BackWorld") !== -1) {
            tilemap.createLayer("BackWorld", tileset, 0, 0).setDepth(-1);
        }
        var worldLayer = tilemap.createLayer("World", tileset, 0, 0);
        var fgLayer = tilemap.createLayer("FG", tileset, 0, 0);
        backgraphics.setDepth(-7);
        worldLayer.setDepth(0);
        fgLayer.setDepth(1);
        var waterGroup = this.add.group();
        var lavaGroup = this.add.group();
        var doorGroup = this.add.group();
        var slopeGroup = this.add.group();
        var WORLD_INDEXES = {
            BACK_GRASS: 1,
            BACK_GRASS_2: 2,
            BACK_DIRT: 3,
            GRASS: 4,
            GRASS_2: 5,
            DIRT: 6,
            STONE_BRICKS: 7,
            TOP_WATER: 8,
            WATER: 9,
            WATER_2: 10,
            TOP_LAVA: 11,
            LAVA: 12,
            LAVA_2: 13,
            GREEN_DOOR_TOP: 20,
            GREEN_DOOR_BOTTOM: 21,
            SLOPE_LEFT_UP: 23,
            SLOPE_RIGHT_UP: 24
        };
        worldLayer.setCollisionByProperty({ collides: true });
        worldLayer.forEachTile(function (tile) {
            if (tile.index === WORLD_INDEXES.BACK_DIRT) {
                tile.collideLeft = false;
                tile.collideRight = false;
                tile.collideDown = false;
                tile.collideUp = false;
            }
            else if (tile.index === WORLD_INDEXES.BACK_GRASS || tile.index === WORLD_INDEXES.BACK_GRASS_2) {
                tile.collideLeft = false;
                tile.collideRight = false;
                tile.collideDown = false;
                tile.collideUp = true;
                var tileAbove;
                if ((tileAbove = worldLayer.getTileAt(tile.x, tile.y - 1)) &&
                    tileAbove.index === WORLD_INDEXES.BACK_DIRT) {
                    tile.faceTop = true;
                }
            }
            else if (tile.index > WORLD_INDEXES.BACK_DIRT) {
                var toAvoid = [WORLD_INDEXES.BACK_GRASS, WORLD_INDEXES.BACK_GRASS_2, WORLD_INDEXES.BACK_DIRT];
                var tileLeft = void 0;
                if (tile.x > 0 &&
                    (tileLeft = worldLayer.getTileAt(tile.x - 1, tile.y)) &&
                    toAvoid.indexOf(tileLeft.index) !== -1) {
                    tile.faceLeft = true;
                }
                var tileRight = void 0;
                if (tile.x < tilemap.width &&
                    (tileRight = worldLayer.getTileAt(tile.x + 1, tile.y)) &&
                    toAvoid.indexOf(tileRight.index) !== -1) {
                    tile.faceRight = true;
                }
                var tileAbove_1;
                if (tile.y > 0 &&
                    (tileAbove_1 = worldLayer.getTileAt(tile.x, tile.y - 1)) &&
                    (toAvoid.indexOf(tileAbove_1.index) !== -1)) {
                    tile.faceTop = true;
                }
                var tileBelow = void 0;
                if (tile.y < tilemap.height &&
                    (tileBelow = worldLayer.getTileAt(tile.x, tile.y + 1)) &&
                    (toAvoid.indexOf(tileBelow.index) !== -1)) {
                    tile.faceBottom = true;
                }
            }
            switch (tile.index) {
                case WORLD_INDEXES.TOP_WATER:
                case WORLD_INDEXES.WATER:
                case WORLD_INDEXES.WATER_2:
                    tile.setCollision(false, false, false, false);
                    var water = new Water_1.default(_this, tile.pixelX, tile.pixelY);
                    waterGroup.add(water);
                    break;
                case WORLD_INDEXES.TOP_LAVA:
                case WORLD_INDEXES.LAVA:
                case WORLD_INDEXES.LAVA_2:
                    tile.setCollision(false, false, false, false);
                    var lava = new Lava_1.default(_this, tile.pixelX, tile.pixelY);
                    lavaGroup.add(lava);
                    break;
                case WORLD_INDEXES.GREEN_DOOR_TOP:
                    tile.setCollision(false, false, false, false);
                    doorGroup.add(new Door_1.default(_this, tile.pixelX + tile.width / 2, tile.pixelY + tile.height));
                    break;
                case WORLD_INDEXES.GREEN_DOOR_BOTTOM:
                    tile.setCollision(false, false, false, false);
                    break;
                case WORLD_INDEXES.SLOPE_LEFT_UP:
                    tile.setCollision(false, false, false, false);
                    slopeGroup.add(new Slope_1.default(_this, "leftUp", tile.pixelX, tile.pixelY));
                    break;
                case WORLD_INDEXES.SLOPE_RIGHT_UP:
                    tile.setCollision(false, false, false, false);
                    slopeGroup.add(new Slope_1.default(_this, "rightUp", tile.pixelX, tile.pixelY));
                    break;
            }
        });
        var spawnPoint = tilemap.findObject("Objects", function (obj) { return obj.name === "Player Spawn Point"; });
        var objects = tilemap.getObjectLayer("Objects").objects;
        var _loop_1 = function () {
            var obj = objects[i];
            if (obj.name === "Door") {
                for (var j in obj.properties) {
                    var prop = obj.properties[j];
                    if (prop.name === "door") {
                        if (prop.value === this_1.loadData.enteredDoor) {
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
        this.player = new Player_1.default(this, spawnPoint.x, spawnPoint.y);
        if (this.loadData.loadType === "door") {
            this.player.hp = this.loadData.playerStats.hp;
        }
        this.physics.add.collider(this.player, worldLayer);
        this.physics.add.overlap(this.player, waterGroup, function (objectA, objectB) {
            objectB.onCollide(objectA);
        }, undefined, this);
        this.physics.add.overlap(this.player, lavaGroup, function (objectA, objectB) {
            objectB.onCollide(objectA);
        }, undefined, this);
        this.physics.add.overlap(this.player, doorGroup, function (objectA, objectB) {
            objectB.onCollide(objectA);
        }, undefined, this);
        this.physics.add.overlap(this.player, slopeGroup, function (objectA, objectB) {
            objectB.processCollision(objectA);
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