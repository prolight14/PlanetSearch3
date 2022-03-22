import Player from "../../gameObjects/planet/Player";
import PlanetLoaderScene from "./PlanetLoaderScene";

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
            currentWorld: "CavePLanet",
            currentTileset: "CaveTileset-extruded",
            currentLevel: "Cave"
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
        
        const foregroundLayer = tilemap.createLayer("Foreground", tileset, 0, 0);
        const groundLayer = tilemap.createLayer("Ground", tileset, 0, 0).setCollisionByProperty({ collides: true });
        const backgroundLayer = tilemap.createLayer("Background", tileset, 0, 0);

        this.player = new Player(this, 200, 100);

        this.physics.add.collider(this.player, groundLayer);


        this.physics.world.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);
        this.physics.world.setBoundsCollision(true, true, true, false);

        var cam = this.cameras.main;
        cam.startFollow(this.player);
        cam.setZoom(2);
        cam.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);

        foregroundLayer.setVisible(false);
        groundLayer.setVisible(false);
        backgroundLayer.setVisible(false);
    }

    public getPlayerStats()
    {
        return this.player.getStats();
    }
}