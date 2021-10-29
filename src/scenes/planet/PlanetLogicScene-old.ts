// @ts-nocheck


import Door from "../../gameObjects/planet/Door";
import Lava from "../../gameObjects/planet/Lava";
import Player from "../../gameObjects/planet/Player";
import Slope from "../../gameObjects/planet/Slope";
import Water from "../../gameObjects/planet/Water";
import PlanetEffectsScene from "./PlanetEffectsScene";
import BLOCK_INDEXES from "./BlockIndexes";
import InvisiblePlatform from "../../gameObjects/planet/InvisiblePlatform";
import GreenBeaker from "../../gameObjects/planet/GreenBeaker";
import Checkpoint from "../../gameObjects/planet/Checkpoint";
import PlanetLoaderScene from "../planet/PlanetLoaderScene";
import GameObject from "../../gameObjects/planet/GameObject";

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

    public preload()
    {   
        this.load.spritesheet("checkpoint", "./assets/Planet/GameObjects/Interactibles/Checkpoint.png", { frameWidth: 16, frameHeight: 16 });

        this.load.spritesheet("Player", "./assets/Planet/GameObjects/Player/NewHelix.png", { frameWidth: 17, frameHeight: 29 });  
        this.load.spritesheet("GreenBeaker", "./assets/Planet/GameObjects/Enemy/Beakers/GreenBeaker.png", { frameWidth: 16, frameHeight: 16 });  

       
        const currentWorld = this.loadData.currentWorld;
        const currentTileset = this.loadData.currentTileset;
        const currentLevel = this.loadData.currentLevel;

        this.load.image(currentTileset, "./assets/Planet/levels/" + currentWorld + "/tilesets/" + currentTileset + ".png");
        this.load.tilemapTiledJSON(currentLevel, "./assets/Planet/levels/" + currentWorld + "/tilemaps/" + currentLevel + ".json");
    }

    public receiveLevelInfo(levelInfo: object)
    {

    }

    public gameObjects: Array<Phaser.GameObjects.GameObject> = [];
    public solidGameObjects: Array<Phaser.GameObjects.GameObject> = [];

    public create(inputData?: any)
    {
        var tilemap: Phaser.Tilemaps.Tilemap = this.make.tilemap({ key: this.loadData.currentLevel, tileWidth: 16, tileHeight: 16 });
        const tileset: Phaser.Tilemaps.Tileset = tilemap.addTilesetImage(this.loadData.currentTileset);
        
        tilemap.createLayer("BackWorld", tileset, 0, 0).setDepth(-1);
        
        const worldLayer = tilemap.createLayer("World", tileset, 0, 0);
        worldLayer.setDepth(0);
        worldLayer.setCollisionByProperty({ collides: true });
        
        tilemap.createLayer("Foreground", tileset, 0, 0).setDepth(10);
        
        this.gameObjects.length = 0;
        this.solidGameObjects.length = 0;

        const waterGroup = this.add.group();
        const lavaGroup = this.add.group();
        const doorGroup = this.add.group();
        const slopeGroup = this.add.group();
        const invisiblePlatformGroup = this.add.group();
        const greenBeakerGroup = this.add.group();
        const checkpointGroup = this.add.group();
        
        switch(this.loadData.currentWorld)
        {
            case "GrassPlanet2":
                const INDEXES = BLOCK_INDEXES.GRASS_PLANET_2;
                const WATERS = [INDEXES.WATER_TOP, INDEXES.WATER, INDEXES.WATER_BLANK];
                const LAVA = [INDEXES.LAVA_TOP, INDEXES.LAVA, INDEXES.LAVA_BLANK];
                worldLayer.forEachTile((tile: Phaser.Tilemaps.Tile) =>
                {
                    if(WATERS.indexOf(tile.index) !== -1)
                    {
                        tile.setCollision(false, false, false, false);
                        waterGroup.add(new Water(this, tile.pixelX, tile.pixelY));
                        return;
                    }
                    else if(LAVA.indexOf(tile.index) !== -1)
                    {
                        tile.setCollision(false, false, false, false);
                        lavaGroup.add(new Lava(this, tile.pixelX, tile.pixelY));
                        return;
                    }

                    switch(tile.index)
                    {
                        case INDEXES.DOOR_TOP:
                            tile.setCollision(false, false, false, false);
                            doorGroup.add(new Door(this, tile.pixelX, tile.pixelY));
                        break;

                        case INDEXES.DOOR_BOTTOM:
                            tile.setCollision(false, false, false, false);
                        break;
                        
                        case INDEXES.SLOPE_LEFT_UP:
                            tile.setCollision(false, false, false, false);
                            slopeGroup.add(new Slope(this, "leftUp", tile.pixelX, tile.pixelY));
                        break;
                        
                        case INDEXES.SLOPE_RIGHT_UP:
                            tile.setCollision(false, false, false, false);
                            slopeGroup.add(new Slope(this, "rightUp", tile.pixelX, tile.pixelY));
                            break;
                        
                        case INDEXES.BACK_GRASS:
                            tile.setCollision(false, false, false, false);
                            invisiblePlatformGroup.add(new InvisiblePlatform(this, tile.pixelX, tile.pixelY));
                        break;

                        case INDEXES.CHECKPOINT:
                            worldLayer.removeTileAt(tile.x, tile.y);
                            checkpointGroup.add(new Checkpoint(this, tile.pixelX, tile.pixelY));
                            break;
                    }
                });
                break;
        }  
            
        const itemsLayer = tilemap.createLayer("Items", tileset, 0, 0);
        
        switch(this.loadData.currentWorld)
        {
            case "GrassPlanet2":
                const INDEXES = BLOCK_INDEXES.GRASS_PLANET_2;
                itemsLayer.forEachTile((tile) =>
                {
                    switch(tile.index)
                    {
                        case INDEXES.GREEN_BEAKER:
                            greenBeakerGroup.add(new GreenBeaker(this, tile.pixelX, tile.pixelY));
                            itemsLayer.removeTileAt(tile.x, tile.y);
                            break;
                    }
                });
            break;
        }

        // var debugGraphics = this.add.graphics().setAlpha(0.75);
        
        // worldLayer.renderDebug(debugGraphics, {
        //     tileColor: null, // Color of non-colliding tiles
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        // });
        
        const loaderScene = this.scene.get("planetLoader") as PlanetLoaderScene;

        this.player = loaderScene.loadPlayer(
            inputData, tilemap, doorGroup, checkpointGroup, 
            this.loadData.currentLevel || inputData.currentLevel,
            this.presetData.currentLevel
        );

        checkpointGroup.setDepth(10);

        this.physics.add.collider(this.player, worldLayer);
        this.physics.add.collider(greenBeakerGroup, worldLayer);


        this.physics.add.collider(this.solidGameObjects, this.solidGameObjects, function(objectA: GameObject, objectB: GameObject)
        {
            objectA.onCollide(objectB);
            objectB.onCollide(objectA);
        });
        this.physics.add.overlap(this.gameObjects, this.gameObjects, function(objectA: GameObject, objectB: GameObject)
        {
            objectA.onOverlap(objectB);
            objectB.onOverlap(objectA);
        });
        
        this.physics.world.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);
        this.physics.world.setBoundsCollision(true, true, true, false);
        
        var cam = this.cameras.main;
        cam.startFollow(this.player);
        cam.setZoom(2);
        cam.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);
        
        (this.scene.get("planetEffects") as PlanetEffectsScene).fadeIn(500, 0, 0, 0);

        this.graphics = this.add.graphics();

        this.tilemap = tilemap;
    }

    public getPlayerStats()
    {
        return this.player.getStats();
    }

    private graphics: Phaser.GameObjects.Graphics;
    private tilemap: Phaser.Tilemaps.Tilemap;

    public update(time: number, delta: number)
    {
        (this.scene.get("planetEffects") as PlanetEffectsScene).processBrickCollision(this.player, this.tilemap);
    }
}