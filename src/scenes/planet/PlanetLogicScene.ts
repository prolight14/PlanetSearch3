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
import PlanetUIScene from "./PlanetUIScene";
import logger from "../../logger";
import Traveler from "../../Saver/Traveler";

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

    private loadData: any;

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

    public create(inputData?: any)
    {
        const currentLevel = (this.loadData.currentLevel || inputData.currentLevel);

        const tilemap: Phaser.Tilemaps.Tilemap = this.make.tilemap({ key: this.loadData.currentLevel, tileWidth: 16, tileHeight: 16 });
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
        
        let spawnPoint = (tilemap.findObject("Objects", obj => obj.name === "Player Spawn Point") as ({ x: number; y: number }));
        
        if(!spawnPoint)
        {
            spawnPoint = {
                x: 0,
                y: 0
            };
        }

        this.handleDoors(tilemap, doorGroup);
        this.handleCheckpoints(checkpointGroup, currentLevel);

        if(inputData.loadType === "door")
        {
            spawnPoint = this.getDoorEntryPoint(tilemap, doorGroup, inputData.doorGoto);
        }
        else if(inputData.loadType === "checkpoint")
        {
            spawnPoint = this.getCheckpointPlace(checkpointGroup, inputData.checkpointGoto);
        }

        this.player = new Player(this, spawnPoint.x as number, spawnPoint.y as number);
        this.player.startLevel = this.presetData.currentLevel;

        if(inputData.loadType === "checkpoint" && 
            this.traveler.saveInfo !== undefined &&
            this.traveler.saveInfo.playerStats !== undefined)
        {
            this.player.setStats(this.traveler.saveInfo.playerStats);
        }

        if(this.traveler.containsInfo)
        {
            var info = this.traveler.getInfo();

            this.player.setCurrentState(info.player);
        }

        checkpointGroup.setDepth(10);

        this.physics.add.collider(this.player, worldLayer);

        this.physics.add.overlap(this.player, waterGroup, function(player: Player, water: Water)
        {
            water.onCollide(player);
        }, undefined, this);
        
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
            slope.processCollision(beaker);
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

        this.physics.world.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);
        this.physics.world.setBoundsCollision(true, true, true, false);
        
        // Camera stuff add
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

    private getDoorEntryPoint(tilemap: Phaser.Tilemaps.Tilemap, doorGroup: Phaser.GameObjects.Group, doorGoto: { level: string, door: string }): { x: number, y: number }
    {
        const objects = tilemap.getObjectLayer("Objects").objects;

        for(var i = 0; i < objects.length; i++)
        {
            const obj = objects[i];
            
            if(obj.name !== "Door")
            {
                continue;
            }

            for(var j in obj.properties)
            {
                const prop = obj.properties[j];
                
                if(prop.name === "door" && prop.value === doorGoto.door)
                {
                    let doors = doorGroup.children.getArray();

                    for(var i = 0; i < doors.length; i++)
                    {
                        var door = doors[i] as Door;

                        const doorBounds = door.getBounds();

                        if(doorBounds.contains(obj.x as number, obj.y as number))
                        {
                            return {
                                x: door.x,
                                y: door.y
                            };
                        }
                    }
                }
            }
        }

        logger.warn("Couldn't find door at door symbol '" + doorGoto.door + "'");

        return {
            x: 0,
            y: 0
        };
    }

    private handleDoors(tilemap: Phaser.Tilemaps.Tilemap, doorGroup: Phaser.GameObjects.Group, spawnPoint?: { x?: number, y?: number}, doorGoto?: { level: string, door: string })
    {
        const objects = tilemap.getObjectLayer("Objects").objects;
        
        for(var i = 0; i < objects.length; i++)
        {
            const obj = objects[i];
            
            if(obj.name === "Door")
            {
                if(spawnPoint !== undefined && doorGoto !== undefined)
                {
                    for(var j in obj.properties)
                    {
                        const prop = obj.properties[j];
                        
                        if(prop.name === "door" && prop.value === doorGoto.door)
                        {
                            doorGroup.getChildren().forEach((door: Door) =>
                            {
                                const doorBounds = door.getBounds();
    
                                if(doorBounds.contains(obj.x as number, obj.y as number))
                                {
                                    spawnPoint.x = door.x;
                                    spawnPoint.y = door.y;
                                }
                            });
                        }
                    }
                }
                
                doorGroup.getChildren().forEach((door: Door) =>
                {
                    if(door.getBounds().contains(obj.x as number, obj.y as number))
                    {
                        var gotoLevel, gotoDoor;

                        for(var j in obj.properties)
                        {
                            const prop = obj.properties[j];

                            if(prop.name === "gotoLevel")
                            {
                                gotoLevel = prop.value;
                            }
                            else if(prop.name === "gotoDoor")
                            {
                                gotoDoor = prop.value;
                            }
                        }

                        if(gotoLevel && gotoDoor)
                        {
                            door.setGoto({
                                level: gotoLevel,
                                door: gotoDoor
                            })
                        }
                    }
                });
            }
        }
    }

    private getCheckpointPlace(checkpointGroup: Phaser.GameObjects.Group, goto: { level: string, index: number}): { x: number, y: number }
    {
        var checkpoints = checkpointGroup.getChildren() as Array<Checkpoint>;

        for(var i = 0; i < checkpoints.length; i++)
        {
            if(checkpoints[i].goto.index === goto.index)
            {
                return {
                    x: checkpoints[i].x + checkpoints[i].body.halfWidth,
                    y: checkpoints[i].y
                };
            }
        }

        logger.warn("Couldn't load from checkpoint index '" + goto.index + "'")

        return {
            x: 0,
            y: 0
        };
    }

    private handleCheckpoints(checkpointGroup: Phaser.GameObjects.Group, currentLevel: string)
    {
        checkpointGroup.getChildren().forEach((checkpoint: Checkpoint, index: number) =>
        {
            checkpoint.goto = {
                level: currentLevel,
                index: index
            };
        });
    }

    public update(time: number, delta: number)
    {
        this.processBrickCollision();
    }

    private processBrickCollision()
    {
        if(!this.player.body.blocked.up)
        {
            return;
        }

        const mainCam = this.cameras.main;

        let tileLeft = this.tilemap.getTileAtWorldXY(this.player.body.x, this.player.body.y - 1, undefined, mainCam, "World");
        let tileRight = this.tilemap.getTileAtWorldXY(this.player.body.right, this.player.body.y - 1, undefined, mainCam, "World");

        if(tileLeft && tileLeft.index === BLOCK_INDEXES.GRASS_PLANET_2.BRICK)
        {
            const bounds = tileLeft.getBounds() as Phaser.Geom.Rectangle;
            this.tilemap.removeTileAt(tileLeft.x, tileLeft.y, true, true, "World");
            (this.scene.get("planetEffects") as PlanetEffectsScene).emitBricks(bounds);
        }
        else if(tileRight && tileRight.index === BLOCK_INDEXES.GRASS_PLANET_2.BRICK)
        {
            const bounds = tileRight.getBounds() as Phaser.Geom.Rectangle;
            this.tilemap.removeTileAt(tileRight.x, tileRight.y, true, true, "World");
            (this.scene.get("planetEffects") as PlanetEffectsScene).emitBricks(bounds);
        }
    }

    public traveler: Traveler = new Traveler();

    public restart(inputData: any)
    {
        this.scene.pause("planetLogic");

        if(["restart", "death"].indexOf(inputData.reason) === -1)
        {
            this.traveler.setInfo({
                player: this.player.getCurrentState()
            });
        }
       
        let effectsScene = this.scene.get("planetEffects") as PlanetEffectsScene;
        effectsScene.fadeOut(500, 0, 0, 0);

        effectsScene.cameras.main.once("camerafadeoutcomplete", () => 
        {
            this.scene.run("planetLogic");

            if(inputData.loadType === "door")
            {
                this.loadData.currentLevel = inputData.doorGoto.level;
            }   
            else if(inputData.loadType === "checkpoint")
            {
                this.loadData.currentLevel = inputData.checkpointGoto.level;
            }
            else if(inputData.loadType === "start")
            {
                this.loadData.currentLevel = inputData.startGoto.level;
            }

            this.scene.restart(inputData);
        });
    }
}