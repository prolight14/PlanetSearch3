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
var PlanetLogicScene = (function (_super) {
    __extends(PlanetLogicScene, _super);
    function PlanetLogicScene() {
        return _super.call(this, {
            key: "planetLogic",
            physics: {
                default: "matter",
                matter: {
                    gravity: { y: 1 }
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
        console.log(this.matterCollision);
        var backgraphics = this.add.graphics().setScrollFactor(0);
        backgraphics.fillStyle(0x00ABFF);
        backgraphics.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        var tilemap = this.make.tilemap({ key: "GrassLevel1Tilemap", tileWidth: 16, tileHeight: 16 });
        var tileset = tilemap.addTilesetImage("GrassTileset");
        var worldLayer = tilemap.createLayer("World", tileset, 0, 0);
        var fgLayer = tilemap.createLayer("FG", tileset, 0, 0);
        fgLayer.setDepth(4);
        worldLayer.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(worldLayer);
        worldLayer.forEachTile(function (tile) {
            if (tile.index === 1 || tile.index === 2) {
                tile.setCollision(false, false, true, false, true);
                worldLayer.getTileAt(tile.x, tile.y + 1).setCollision(true, true, true, true);
            }
            else if (tile.index === 3) {
                tile.setCollision(false, false, false, false, true);
            }
            else if (tile.index !== -1) {
                tile.setCollision(true, true, true, true);
            }
        });
        var cam = this.cameras.main;
        cam.setZoom(2);
        cam.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);
        cam.setScroll(-300, 0);
        var cursors = this.input.keyboard.createCursorKeys();
        var controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            speed: 0.25
        };
        this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
    };
    PlanetLogicScene.prototype.update = function (time, delta) {
        this.controls.update(delta);
    };
    return PlanetLogicScene;
}(Phaser.Scene));
exports.default = PlanetLogicScene;
//# sourceMappingURL=PlanetLogicScene.js.map