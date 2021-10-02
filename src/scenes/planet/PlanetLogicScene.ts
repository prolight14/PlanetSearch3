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
import PlanetLoaderScene from "./PlanetLoaderScene";
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
            currentWorld: "GrassPlanet2",
            currentTileset: "GrassTileset2-extruded",
            currentLevel: "start"
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

        this.load.spritesheet("Player", "./assets/Planet/GameObjects/Player/Helix2.png", { frameWidth: 16, frameHeight: 32 });  
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
                            doorGroup.add(new Door(this, tile.pixelX + tile.width / 2, tile.pixelY + tile.height));
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
        
        // this.physics.add.overlap(this.player, waterGroup, function(player: Player, water: Water)
        // {
        //     water.onCollide(player);
        // }, undefined, this);
        /*
        
        this.physics.add.overlap(this.player, lavaGroup, function(player: Player, lava: Lava)
        {
            lava.onCollide(player);
        }, undefined, this);
        
        this.physics.add.overlap(this.player, doorGroup, function(player: Player, door: Door)
        {
            door.onCollide(player);
        }, undefined, this);
        
        this.physics.add.overlap(this.player, slopeGroup, function(player: Player, slope: Slope)
        {
            slope.processCollision(player);
        }, undefined, this);

        this.physics.add.overlap(this.player, slopeGroup, function(player: Player, slope: Slope)
        {
            slope.processCollision(player);
        }, undefined, this);

        this.physics.add.overlap(this.player, invisiblePlatformGroup, function(player: Player, invisiblePlatform: InvisiblePlatform)
        {
            invisiblePlatform.processCollision(player);
        }, undefined, this);
        
        // Slope stuff

        this.physics.add.collider(greenBeakerGroup, worldLayer);
        
        this.physics.add.overlap(greenBeakerGroup, waterGroup, function(beaker: GreenBeaker, water: Water)
        {
            water.onCollide(beaker);
        }, undefined, this);
        
        this.physics.add.overlap(greenBeakerGroup, lavaGroup, function(beaker: GreenBeaker, lava: Lava)
        {
            lava.onCollide(beaker);
        }, undefined, this);

        
        this.physics.add.overlap(greenBeakerGroup, slopeGroup, function(beaker: GreenBeaker, slope: Slope)
        {
            beaker.onCollide(slope);
        }, undefined, this);
        
        this.physics.add.collider(greenBeakerGroup, this.player, function(beaker: GreenBeaker, player: Player)
        {
            beaker.onCollide(player);
        }, undefined, this);
        
        // Checkpoint
        this.physics.add.overlap(checkpointGroup, this.player, function(checkpoint: Checkpoint, player: Player)
        {
            checkpoint.onCollide(player);
        });
        
        this.physics.add.overlap(slopeGroup, greenBeakerGroup, function(slope: Slope, beaker: GameObject)
        {
            slope.processCollision(beaker);
        }, undefined, this);
        */

        /*
        var updateGameObjects = this.sys.updateList.getActive();
        var displayGameObjects = this.sys.displayList.getChildren();
        
        this.physics.add.overlap(slopeGroup, updateGameObjects, function(slope: Slope, object: GameObject)
        {
            slope.processCollision(object);
        }, undefined, this);
        */

        // this.physics.add.collider(updateGameObjects, updateGameObjects, function(objectA: GameObject, objectB: GameObject)
        // {
        //     objectA.onCollide(objectB);
        //     objectB.onCollide(objectA);
        //     objectA.processCollision(objectB);
        //     objectB.processCollision(objectA);
        // }, undefined, this);

        // this.physics.add.overlap(updateGameObjects, displayGameObjects, function(objectA: GameObject, objectB: GameObject)
        // {
        //     objectA.onCollide(objectB);
        //     objectB.onCollide(objectA);
        //     objectA.processCollision(objectB);
        //     objectB.processCollision(objectA);
        // }, undefined, this);

        // this.physics.add.overlap(updateGameObjects, displayGameObjects, function(objectA: GameObject, objectB: GameObject)
        // {
        //     if(objectA.onOverlap !== undefined)
        //     {
        //         objectA.onOverlap(objectB);
        //     }
        //     if(objectB.onOverlap !== undefined)
        //     {
        //         objectB.onOverlap(objectA);
        //     }

        //     if(objectB.body !== undefined && objectA.processCollision !== undefined)
        //     {   
        //         objectA.processCollision(objectB);
        //     }

        // }, undefined, this);

        // this.physics.add.collider(updateGameObjects, displayGameObjects, function(objectA: GameObject, objectB: GameObject)
        // {
        //     if(objectB.onCollide !== undefined)
        //     {
        //         objectA.onCollide(objectB);
        //         objectB.onCollide(objectA);
        //     }
        //     // console.log(objectA, objectB);
        // });

        // this.physics.add.overlap(updateGameObjects, displayGameObjects, function(objectA: GameObject, objectB: GameObject)
        // {
        //     if(objectB.onOverlap !== undefined)
        //     {
        //         objectA.onOverlap(objectB);
        //         objectB.onOverlap(objectA);
        //     }
        //     // console.log(objectA, objectB);
        // });]

        // this.physics.world.on("collide", () =>
        // {
        //     console.log(true);
        // });

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

        // const activeList =  this.sys.updateList.getActive();
        
        // activeList.forEach((objectA: GameObject, i: number) => 
        // {
        //     var bodyA = objectA;
        //     const rectA = new Phaser.Geom.Rectangle(bodyA.x, bodyA.y, bodyA.width, bodyA.height);

        //     activeList.forEach((objectB: GameObject, j: number) => 
        //     {
        //         if(i === j)
        //         {
        //             return;
        //         }
        //         var bodyB = objectB;
        //         const rectB = new Phaser.Geom.Rectangle(bodyB.x, bodyB.y, bodyB.width, bodyB.height);

        //         if(Phaser.Geom.Intersects.RectangleToRectangle(rectA, rectB))
        //         {
        //             objectA.onCollide(objectB);
        //         }
        //     }); 
        // }); 
    }
}