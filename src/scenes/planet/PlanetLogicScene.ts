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
        this.load.image("IcyDwarfTileset", "./assets/Planet/Levels/IcyDwarf/Tilesets/IcyDwarfTileset.png");
        this.load.tilemapTiledJSON("IcyDwarfTilemap", "./assets/Planet/Levels/IcyDwarf/Tilemaps/IcyDwarfTilemap.json");
    }

    levelAssetsPrefix: string;

    public receiveLevelInfo(passObj: object)
    {
        switch(passObj.type)
        {
            case "planet":
                var planet = passObj.from;
                this.levelAssetsPrefix = planet.texture.key.replace("Planet", "");
                break;
        }
    }

    public create()
    {
        const tilemap = this.make.tilemap({ key: this.levelAssetsPrefix + "Tilemap", tileWidth: 16, tileHeight: 16 });
        const tileset = tilemap.addTilesetImage( this.levelAssetsPrefix + "Tileset");
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