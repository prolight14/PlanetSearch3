//@ts-nocheck
import Player from "../../gameObjects/planet/Player";

export default class PlanetLogicScene extends Phaser.Scene
{
    constructor()
    {
        super({
            key: "planetLogic",
            physics: {
                default: "arcade",
                arcade: {
                    gravity: { y: 800 } 
                }
            }
        });
    }

    player: Player

    public preload()
    {
        this.load.image("IcyTileset", "./assets/Planet/Levels/Tilesets/IcyTileset.png");
        this.load.tilemapTiledJSON("IcyTilemap", "./assets/Planet/Levels/Tilemaps/IcyTilemap.json");
    }

    public create()
    {
        const tilemap = this.make.tilemap({ key: "IcyTilemap", tileWidth: 16, tileHeight: 16 });
        const tileset = tilemap.addTilesetImage("IcyTileset", "IcyTileset");
        const worldLayer = tilemap.createStaticLayer("World", tileset, 0, 0);

        worldLayer.setCollisionByProperty({ collides: true });

        // var debugGraphics = this.add.graphics().setAlpha(0.75);

        // worldLayer.renderDebug(debugGraphics, {
        //     tileColor: null, // Color of non-colliding tiles
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        // });

        const spawnPoint = tilemap.findObject("Objects", obj => obj.name === "Spawn Point");

        this.player = new Player(this, spawnPoint.x, spawnPoint.y);

        this.physics.add.collider(this.player, worldLayer);

        // Camera stuff
        var cam = this.cameras.main;
        cam.startFollow(this.player);
        cam.setZoom(2);
        cam.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);
    }

    public update()
    {
        if(this.player.dead)
        {
            this.scene.restart();
        }
    }
}