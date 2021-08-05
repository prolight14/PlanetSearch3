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
            },
        }) || this;
    }
    PlanetLogicScene.prototype.preload = function () {
        this.load.image("GrassTileset", "./assets/Planet/Levels/GrassPlanet/GrassTileset.png");
        this.load.tilemapTiledJSON("GrassLevel1Tilemap", "./assets/Planet/Levels/GrassPlanet/level1.json");
    };
    PlanetLogicScene.prototype.receiveLevelInfo = function (passObj) {
    };
    PlanetLogicScene.prototype.create = function () {
        var backgraphics = this.add.graphics().setScrollFactor(0);
        backgraphics.fillStyle(0x00ABFF);
        backgraphics.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        var tilemap = this.make.tilemap({ key: "GrassLevel1Tilemap", tileWidth: 16, tileHeight: 16 });
        var tileset = tilemap.addTilesetImage("GrassTileset");
        var worldLayer = tilemap.createLayer("World", tileset, 0, 0);
        var fgLayer = tilemap.createLayer("FG", tileset, 0, 0);
        fgLayer.setDepth(4);
        worldLayer.setCollisionByProperty({ collides: true });
        worldLayer.forEachTile(function (tile) {
            if (tile.index === 3) {
                tile.collideLeft = false;
                tile.collideRight = false;
                tile.collideDown = false;
                tile.collideUp = false;
            }
            else if (tile.index === 1 || tile.index === 2) {
                tile.collideLeft = false;
                tile.collideRight = false;
                tile.collideDown = false;
                tile.collideUp = true;
            }
            else if (tile.index > 2) {
                var tileAbove;
                if (tile.y > 0 &&
                    (tileAbove = worldLayer.getTileAt(tile.x, tile.y - 1)) &&
                    ([1, 2, 3].indexOf(tileAbove.index) !== -1)) {
                    tile.faceTop = true;
                }
                var tileLeft;
                if (tile.x > 0 &&
                    (tileLeft = worldLayer.getTileAt(tile.x - 1, tile.y)) &&
                    [1, 2, 3].indexOf(tileLeft.index) !== -1) {
                    tile.faceLeft = true;
                }
                var tileRight;
                if (tile.x < tilemap.width &&
                    (tileRight = worldLayer.getTileAt(tile.x + 1, tile.y)) &&
                    [1, 2, 3].indexOf(tileRight.index) !== -1) {
                    tile.faceRight = true;
                }
            }
        });
        tilemap.createBlankLayer;
        var debugGraphics = this.add.graphics().setAlpha(0.75);
        worldLayer.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
            faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        });
        this.player = new Player_1.default(this, 300, 0);
        this.physics.add.collider(this.player, worldLayer);
        var cam = this.cameras.main;
        cam.startFollow(this.player);
        cam.setZoom(2);
        cam.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);
        cam.setScroll(-300, 0);
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