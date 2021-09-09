import Door from "../../gameObjects/planet/Door";
import Lava from "../../gameObjects/planet/Lava";
import Player from "../../gameObjects/planet/Player";
import Slope from "../../gameObjects/planet/Slope";
import Water from "../../gameObjects/planet/Water";
import PlanetEffectsScene from "./PlanetEffectsSceen";
import BLOCK_INDEXES from "./BlockIndexes";
import InvisiblePlatform from "../../gameObjects/planet/InvisiblePlatform";

type playerStats = { hp: number, maxHp: number };

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
    }

    private player: Player;

    public getPlayerStats(): playerStats
    {
        return {
            hp: this.player.hp,
            maxHp: this.player.maxHp,
        };
    }

    private loadData: { 
        loadType: string;
        currentLevel: string;
        currentWorld: string;
        enteredDoor: string;
        currentTileset: string;
        playerStats: playerStats
    };

    public init(data: any)
    {
        const currentWorld = "GrassPlanet2";

        this.loadData = {
            loadType: (data.loadType === undefined) ? "landedByShip" : data.loadType,
            currentLevel: (data.gotoLevel === undefined) ? "start" : data.gotoLevel,
            currentWorld: currentWorld,
            currentTileset: currentWorld.replace("Planet", "Tileset") + "-extruded",
            enteredDoor: data.gotoDoor,
            playerStats: data.playerStats
        };
    }

    public preload()
    {   
        // this.load.image("IcyDwarfTileset", "./assets/Planet/levels/IcyDwarf/Tilesets/IcyDwarfTileset.png");
        // this.load.tilemapTiledJSON("IcyDwarfTilemap", "./assets/Planet/levels/IcyDwarf/Tilemaps/IcyDwarfTilemap.json");
        
        this.load.spritesheet("Helix2", "./assets/Planet/GameObjects/Player/Helix2.png", { frameWidth: 16, frameHeight: 32 });  

        const currentWorld = this.loadData.currentWorld;
        const currentTileset = this.loadData.currentTileset;

        this.load.image(currentTileset, "./assets/Planet/levels/" + currentWorld + "/tilesets/" + currentTileset + ".png");
        this.load.tilemapTiledJSON(this.loadData.currentLevel, "./assets/Planet/levels/" + currentWorld + "/tilemaps/" + this.loadData.currentLevel + ".json");
    }

    // private planetName: string;
    // private currentLevelName: string;   
    
    // private currentLevelAssetsPrefix: string = "IcyDwarf";
    // private currentLevelAssetsPrefix: string = "IcyDwarf";
    
    public receiveLevelInfo(passObj: object)
    {
        // switch(passObj.type)
        // {
        //     case "planet":
        //         var planet = passObj.from;
        //         this.currentLevelAssetsPrefix = this.planetName = planet.texture.key.replace("Planet", "");
        //         break;
        // }
    }
    
    public create()
    {
        let backgraphics = this.add.graphics().setScrollFactor(0);
        backgraphics.fillStyle(0x00ABFF);
        backgraphics.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        backgraphics.setDepth(-1);

        const tilemap: Phaser.Tilemaps.Tilemap = this.make.tilemap({ key: this.loadData.currentLevel, tileWidth: 16, tileHeight: 16 });
        const tileset: Phaser.Tilemaps.Tileset = tilemap.addTilesetImage(this.loadData.currentTileset);

        const worldLayer = tilemap.createLayer("World", tileset, 0, 0);
        worldLayer.setDepth(0);
        worldLayer.setCollisionByProperty({ collides: true });

        const waterGroup = this.add.group();
        const lavaGroup = this.add.group();
        const doorGroup = this.add.group();
        const slopeGroup = this.add.group();
        const invisiblePlatformGroup = this.add.group();

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

                        case INDEXES.SLOPE_UP_LEFT:
                            tile.setCollision(false, false, false, false);
                            slopeGroup.add(new Slope(this, "leftUp", tile.pixelX, tile.pixelY));
                            break;
                        
                        case INDEXES.SLOPE_UP_RIGHT:
                            tile.setCollision(false, false, false, false);
                            slopeGroup.add(new Slope(this, "rightUp", tile.pixelX, tile.pixelY));
                            break;

                        case INDEXES.BACK_GRASS:
                            tile.setCollision(false, false, false, false);
                            invisiblePlatformGroup.add(new InvisiblePlatform(this, tile.pixelX, tile.pixelY));
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

        
        let spawnPoint = tilemap.findObject("Objects", obj => obj.name === "Player Spawn Point");

        this.handleDoors(tilemap, doorGroup, spawnPoint);

        this.player = new Player(this, spawnPoint.x as number, spawnPoint.y as number);

        if(this.loadData.loadType === "door")
        {
            this.player.hp = this.loadData.playerStats.hp;
        }

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

        this.physics.add.overlap(this.player, invisiblePlatformGroup, function(player: Player, invisiblePlatform: InvisiblePlatform)
        {
            invisiblePlatform.processCollision(player);
        }, undefined, this);

        this.physics.world.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);
        this.physics.world.setBoundsCollision(true, true, true, false);
       
        // Camera stuff
        var cam = this.cameras.main;
        cam.startFollow(this.player);
        cam.setZoom(2);
        cam.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);

        (this.scene.get("planetEffects") as PlanetEffectsScene).fadeIn(500, 0, 0, 0);
        this.scene.run("planetUI");
        this.sceneTransitioning = false;
    }

    private handleDoors(tilemap: Phaser.Tilemaps.Tilemap, doorGroup: Phaser.GameObjects.Group, spawnPoint: { x?: number, y?: number})
    {
        const objects = tilemap.getObjectLayer("Objects").objects;

        for(var i = 0; i < objects.length; i++)
        {
            const obj = objects[i];

            if(obj.name === "Door")
            {
                for(var j in obj.properties)
                {
                    const prop = obj.properties[j];

                    if(prop.name === "door" && prop.value === this.loadData.enteredDoor)
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

                doorGroup.getChildren().forEach((door: Door) =>
                {
                    if(door.getBounds().contains(obj.x as number, obj.y as number))
                    {
                        for(var j in obj.properties)
                        {
                            const prop = obj.properties[j];

                            if(prop.name === "gotoLevel")
                            {
                                door.goto.level = prop.value;
                            }
                            else if(prop.name === "gotoDoor")
                            {
                                door.goto.door = prop.value;
                            }
                        }
                    }
                });
            }
        }
    }

    private sceneTransitioning: boolean;

    public update(time: number, delta: number)
    {
        if(this.player.isDead() && !this.sceneTransitioning)
        {
            const effectsScene = this.scene.get("planetEffects") as PlanetEffectsScene;

            effectsScene.fadeOut(500, 0, 0, 0);

            effectsScene.cameras.main.once("camerafadeoutcomplete", () => 
            {
                this.scene.restart();
            });
        
            this.sceneTransitioning = true;
        }
    }
}