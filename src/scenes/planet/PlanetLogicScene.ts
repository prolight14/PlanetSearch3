import GameObject from "../../gameObjects/planet/GameObject";
import Player from "../../gameObjects/planet/Player";
import Water from "../../gameObjects/planet/Water";
import BlockIndexes from "./BlockIndexes";

export default class PlanetLogicScene extends Phaser.Scene
{
    constructor()
    {
        super({
            key: "planetLogic",
            physics: {
                default: "arcade",
                arcade: {
                    gravity: { y: 950 },
                }
            },
        });

        this.init();
    }

    public loadData: any;

    private init()
    {   
        if(this.loadData !== undefined)
        {
            return;
        }

        this.loadData = {
            currentWorld: "GrassPlanet",
            currentTileset: "GrassPlanet",
            currentLevel: "Level1"
        };

        this.presetData = {
            currentLevel: this.loadData.currentLevel
        };
    }

    private presetData: {
        currentLevel: string    
    };

    private player: Player;

    public receiveLevelInfo(levelInfo: object)
    {

    }

    public preload()
    {   
        this.load.spritesheet("Player", "./assets/Planet/GameObjects/Player/NewHelix.png", { frameWidth: 17, frameHeight: 29 });  
       
        const currentWorld = this.loadData.currentWorld;
        const currentTileset = this.loadData.currentTileset;
        const currentLevel = this.loadData.currentLevel;
 
        this.load.image(currentTileset, "./assets/Planet/levels/" + currentWorld + "/tilesets/" + currentTileset + ".png");
        this.load.tilemapTiledJSON(currentLevel, "./assets/Planet/levels/" + currentWorld + "/tilemaps/" + currentLevel + ".json");
    }

    public create(inputData?: any)
    {
        var tilemap: Phaser.Tilemaps.Tilemap = this.make.tilemap({ key: this.loadData.currentLevel, tileWidth: 16, tileHeight: 16 });
        const tileset: Phaser.Tilemaps.Tileset = tilemap.addTilesetImage(this.loadData.currentTileset);
        
        const backgroundLayer = tilemap.createLayer("Background", tileset, 0, 0);
        const groundLayer = tilemap.createLayer("Ground", tileset, 0, 0).setCollisionByProperty({ collides: true });
        const foregroundLayer = tilemap.createLayer("Foreground", tileset, 0, 0);

        this.player = new Player(this, 200, 100);

        this.physics.add.collider(this.player, groundLayer);

        backgroundLayer.setDepth(0);
        groundLayer.setDepth(1);
        foregroundLayer.setDepth(10);

        this.physics.world.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);
        this.physics.world.setBoundsCollision(true, true, true, false);

        var cam = this.cameras.main;
        cam.startFollow(this.player);
        cam.setZoom(2);
        cam.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);

        const water = this.add.group();

        this.physics.add.collider(this.player, water, function(objectA: GameObject, objectB: GameObject)
        {
            // objectA.onCollide(objectB);
            objectB.onCollide(objectA);
        });

        // //value: Phaser.Tilemaps.Tile, index: number, array: Phaser.Tilemaps.Tile[])
        // groundLayer.forEachTile((tile: Phaser.Tilemaps.Tile, index: number) =>
        // {
        //     // if(tile.index === BlockIndexes.GRASS_PLANET.WATER || tile.index === BlockIndexes.GRASS_PLANET.WATER_2)
        //     if(tile.index > 82 && tile.index < 93)
        //     {
        //         tile.alpha = 0.8;
        //         // tile.destroy();
        //         water.add(new Water(this, tile.pixelX, tile.pixelY));
        //     }
        //     // if(tile.index === 86 || tile.index === 87)
        //     // {
        //         // water.add(new Water(this, tile.pixelX, tile.pixelY));
        //     // }
        // });

        groundLayer.forEachTile((tile: Phaser.Tilemaps.Tile) =>
        {
            if(tile.index > 82 && tile.index < 99)
            {
                tile.alpha = 0.8;
                water.add(new Water(this, tile.pixelX, tile.pixelY));
            }
        });

        // groundLayer.forEachTile((tile: Phaser.Tilemaps.Tile, index: number) =>
        // {
        //     if(tile.index > 82 && tile.index < 93)
        //     {
        //         // groundLayer.removeTileAt(tile.x, tile.y);
        //         water.add(new Water(this, tile.pixelX, tile.pixelY));
        //         // tile.destroy();
        //     }
        // });
    }

    public getPlayerStats()
    {
        return this.player.getStats();
    }
}