import Door from "../../gameObjects/planet/Door";
import Lava from "../../gameObjects/planet/Lava";
import Player from "../../gameObjects/planet/Player";
import Slope from "../../gameObjects/planet/Slope";
import Water from "../../gameObjects/planet/Water";
import PlanetEffectsScene from "./PlanetEffectsSceen";

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
                    debug: true 
                }
            },
        });
    }

    private player: Player;
    // private controls: Phaser.Cameras.Controls.FixedKeyControl;

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
        enteredDoor: string;
        playerStats: playerStats
    };

    public init(data: any)
    {
        this.loadData = {
            loadType: (data.loadType === undefined) ? "landedByShip" : data.loadType,
            currentLevel: (data.gotoLevel === undefined) ? "start" : data.gotoLevel,
            enteredDoor: data.gotoDoor,
            playerStats: data.playerStats
        };
    }

    public preload()
    {   
        // this.load.image("IcyDwarfTileset", "./assets/Planet/levels/IcyDwarf/Tilesets/IcyDwarfTileset.png");
        // this.load.tilemapTiledJSON("IcyDwarfTilemap", "./assets/Planet/levels/IcyDwarf/Tilemaps/IcyDwarfTilemap.json");
        
        this.load.spritesheet("Helix2", "./assets/Planet/GameObjects/Player/Helix2.png", { frameWidth: 16, frameHeight: 32 });  

        this.load.image("GrassTileset-extruded", "./assets/Planet/levels/GrassPlanet/tilesets/GrassTileset-extruded.png");
        this.load.tilemapTiledJSON(this.loadData.currentLevel, "./assets/Planet/levels/GrassPlanet/tilemaps/" + this.loadData.currentLevel + ".json");
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

        // const tilemap = this.make.tilemap({ key: this.currentLevelAssetsPrefix + "Tilemap", tileWidth: 16, tileHeight: 16 });
        // const tileset = tilemap.addTilesetImage( this.currentLevelAssetsPrefix + "Tileset");

        const tilemap: Phaser.Tilemaps.Tilemap = this.make.tilemap({ key: this.loadData.currentLevel, tileWidth: 16, tileHeight: 16 });
        const tileset: Phaser.Tilemaps.Tileset = tilemap.addTilesetImage("GrassTileset-extruded");
        const worldLayer = tilemap.createLayer("World", tileset, 0, 0);
        const fgLayer = tilemap.createLayer("FG", tileset, 0, 0);
        fgLayer.setDepth(4);
        
        const waterGroup = this.add.group();
        const lavaGroup = this.add.group();
        const doorGroup = this.add.group();
        const slopeGroup = this.add.group();

        const WORLD_INDEXES = {
            BACK_GRASS: 1,
            BACK_GRASS_2: 2,
            BACK_DIRT: 3,
            GRASS: 4,
            GRASS_2: 5,
            DIRT: 6,
            STONE_BRICKS: 7,
            TOP_WATER: 8,
            WATER: 9,
            WATER_2: 10,
            TOP_LAVA: 11,
            LAVA: 12,
            LAVA_2: 13,
            GREEN_DOOR_TOP: 20,
            GREEN_DOOR_BOTTOM: 21,
            SLOPE_LEFT_UP: 23,
            SLOPE_RIGHT_UP: 24
        };

        worldLayer.setCollisionByProperty({ collides: true });
        worldLayer.forEachTile((tile: Phaser.Tilemaps.Tile) =>
        {
            if(tile.index === WORLD_INDEXES.BACK_DIRT)
            {
                tile.collideLeft = false;
                tile.collideRight = false;
                tile.collideDown = false;
                tile.collideUp = false;
            }
            else if(tile.index === WORLD_INDEXES.BACK_GRASS || tile.index === WORLD_INDEXES.BACK_GRASS_2)
            {
                tile.collideLeft = false;
                tile.collideRight = false;
                tile.collideDown = false;
                tile.collideUp = true;

                var tileAbove;
                if((tileAbove = worldLayer.getTileAt(tile.x, tile.y - 1)) && 
                   tileAbove.index === WORLD_INDEXES.BACK_DIRT)
                {
                    tile.faceTop = true;
                }
            }
            else if(tile.index > WORLD_INDEXES.BACK_DIRT)
            {
                const toAvoid = [WORLD_INDEXES.BACK_GRASS, WORLD_INDEXES.BACK_GRASS_2, WORLD_INDEXES.BACK_DIRT];

                let tileLeft;
                if(
                    tile.x > 0 && 
                    (tileLeft = worldLayer.getTileAt(tile.x - 1, tile.y)) && 
                    toAvoid.indexOf(tileLeft.index) !== -1)
                {
                    tile.faceLeft = true;
                }

                let tileRight;
                if(
                    tile.x < tilemap.width && 
                    (tileRight = worldLayer.getTileAt(tile.x + 1, tile.y)) && 
                    toAvoid.indexOf(tileRight.index) !== -1)
                {
                    tile.faceRight = true;
                }

                let tileAbove;
                if(
                    tile.y > 0 && 
                    (tileAbove = worldLayer.getTileAt(tile.x, tile.y - 1)) && 
                    (toAvoid.indexOf(tileAbove.index) !== -1)
                )
                {
                    tile.faceTop = true;
                }

                let tileBelow;
                if(
                    tile.y < tilemap.height && 
                    (tileBelow = worldLayer.getTileAt(tile.x, tile.y + 1)) && 
                    (toAvoid.indexOf(tileBelow.index) !== -1)
                )
                {
                    tile.faceBottom = true;
                }
            }

            switch(tile.index)
            {
                case WORLD_INDEXES.TOP_WATER: case WORLD_INDEXES.WATER: case WORLD_INDEXES.WATER_2:
                    tile.setCollision(false, false, false, false);

                    var water = new Water(this, tile.pixelX, tile.pixelY);

                    waterGroup.add(water);
                    break;

                case WORLD_INDEXES.TOP_LAVA: case WORLD_INDEXES.LAVA: case WORLD_INDEXES.LAVA_2: 
                    tile.setCollision(false, false, false, false);

                    var lava = new Lava(this, tile.pixelX, tile.pixelY);

                    lavaGroup.add(lava);
                    break;

                case WORLD_INDEXES.GREEN_DOOR_TOP:
                    tile.setCollision(false, false, false, false);

                    doorGroup.add(new Door(this, tile.pixelX + tile.width / 2, tile.pixelY + tile.height));
                    break;

                case WORLD_INDEXES.GREEN_DOOR_BOTTOM:
                    tile.setCollision(false, false, false, false);
                    break;

                case WORLD_INDEXES.SLOPE_LEFT_UP:
                    tile.setCollision(false, false, false, false);

                    slopeGroup.add(new Slope(this, "leftUp", tile.pixelX, tile.pixelY));
                    break;
            }
        });

        // var debugGraphics = this.add.graphics().setAlpha(0.75);

        // worldLayer.renderDebug(debugGraphics, {
        //     tileColor: null, // Color of non-colliding tiles
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        // });

        let spawnPoint = tilemap.findObject("Objects", obj => obj.name === "Player Spawn Point");

        const objects = tilemap.getObjectLayer("Objects").objects;

        for(var i = 0; i < objects.length; i++)
        {
            const obj = objects[i];

            if(obj.name === "Door")
            {
                for(var j in obj.properties)
                {
                    const prop = obj.properties[j];

                    if(prop.name === "door")
                    {
                        if(prop.value === this.loadData.enteredDoor)
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

        this.player = new Player(this, spawnPoint.x as number, spawnPoint.y as number);

        if(this.loadData.loadType === "door")
        {
            this.player.hp = this.loadData.playerStats.hp;
        }

        this.physics.add.collider(this.player, worldLayer);

        this.physics.add.overlap(this.player, waterGroup, function(objectA: Player, objectB: Water)
        {
            objectB.onCollide(objectA);
        }, undefined, this);

        this.physics.add.overlap(this.player, lavaGroup, function(objectA: Player, objectB: Lava)
        {
            objectB.onCollide(objectA);
        }, undefined, this);

        this.physics.add.overlap(this.player, doorGroup, function(objectA: Player, objectB: Door)
        {
            objectB.onCollide(objectA);
        }, undefined, this);

        this.physics.add.overlap(this.player, slopeGroup, function(objectA: Player, objectB: Slope)
        {
            objectB.onCollide(objectA);
        }, undefined, this);

        this.physics.world.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);
        this.physics.world.setBoundsCollision(true, true, true, false);
       
        // Camera stuff
        var cam = this.cameras.main;
        cam.startFollow(this.player);
        cam.setZoom(2);
        cam.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);
        // cam.setScroll(-300, 0); 

        // const cursors = this.input.keyboard.createCursorKeys();
        // const controlConfig = {
        //     camera: this.cameras.main,  
        //     left: cursors.left,
        //     right: cursors.right,
        //     up: cursors.up,
        //     down: cursors.down,
        //     speed: 0.25
        // };
        // this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);

        (this.scene.get("planetEffects") as PlanetEffectsScene).fadeIn(500, 0, 0, 0);

        this.scene.run("planetUI");
        this.sceneTransitioning = false;
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