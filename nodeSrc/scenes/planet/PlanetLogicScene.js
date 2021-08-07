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
var Water_1 = require("../../gameObjects/planet/Water");
var PlanetLogicScene = (function (_super) {
    __extends(PlanetLogicScene, _super);
    function PlanetLogicScene() {
        return _super.call(this, {
            key: "planetLogic",
            physics: {
                default: "arcade",
                arcade: {
                    gravity: { y: 800 },
                }
            },
        }) || this;
    }
    PlanetLogicScene.prototype.preload = function () {
        this.load.spritesheet("Helix2", "./assets/Planet/GameObjects/Player/Helix2.png", { frameWidth: 16, frameHeight: 32 });
        this.load.image("GrassTileset", "./assets/Planet/Levels/GrassPlanet/GrassTileset.png");
        this.load.tilemapTiledJSON("GrassLevel1Tilemap", "./assets/Planet/Levels/GrassPlanet/level1.json");
    };
    PlanetLogicScene.prototype.receiveLevelInfo = function (passObj) {
    };
    PlanetLogicScene.prototype.create = function () {
        var _this = this;
        var backgraphics = this.add.graphics().setScrollFactor(0);
        backgraphics.fillStyle(0x00ABFF);
        backgraphics.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        var tilemap = this.make.tilemap({ key: "GrassLevel1Tilemap", tileWidth: 16, tileHeight: 16 });
        var tileset = tilemap.addTilesetImage("GrassTileset");
        var worldLayer = tilemap.createLayer("World", tileset, 0, 0);
        var fgLayer = tilemap.createLayer("FG", tileset, 0, 0);
        fgLayer.setDepth(4);
        var waterGroup = this.add.group();
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
            TOP_LAVA: 8,
            LAVA: 9,
            LAVA_2: 10,
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
                    waterGroup.add(new Water_1.default(_this, tile.pixelX, tile.pixelY));
                    break;
            }
        });
        this.player = new Player_1.default(this, 0, 0);
        this.physics.add.collider(this.player, worldLayer);
        this.physics.add.overlap(this.player, waterGroup, function (objectA, objectB) {
            objectB.onCollide(objectA);
        }, undefined, this);
        var cam = this.cameras.main;
        cam.startFollow(this.player);
        cam.setZoom(2);
        cam.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);
        this.physics.world.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);
        this.physics.world.setBoundsCollision(true, true, true, false);
    };
    PlanetLogicScene.prototype.update = function (time, delta) {
        if (this.player.dead) {
            this.scene.restart();
        }
    };
    return PlanetLogicScene;
}(Phaser.Scene));
exports.default = PlanetLogicScene;
//# sourceMappingURL=PlanetLogicScene.js.map