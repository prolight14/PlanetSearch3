import Player from "../../gameObjects/planet/Player";
import Water from "../../gameObjects/planet/Water";

export default class PlanetLogicScene extends Phaser.Scene
{
    constructor()
    {
        super({
            key: "planetLogic",
            physics: {
                default: "arcade",
                arcade: {
                    gravity: { y: 800 },
                    // debug: true 
                }
            },
        });
    }

    player: Player;
    controls: Phaser.Cameras.Controls.FixedKeyControl;

    public preload()
    {   
        // this.load.image("IcyDwarfTileset", "./assets/Planet/Levels/IcyDwarf/Tilesets/IcyDwarfTileset.png");
        // this.load.tilemapTiledJSON("IcyDwarfTilemap", "./assets/Planet/Levels/IcyDwarf/Tilemaps/IcyDwarfTilemap.json");
        
        this.load.image("GrassTileset", "./assets/Planet/Levels/GrassPlanet/GrassTileset.png");
        this.load.tilemapTiledJSON("GrassLevel1Tilemap", "./assets/Planet/Levels/GrassPlanet/level1.json");
    }
    
    
    // private planetName: string;
    // private levelName: string;   
    
    // private levelAssetsPrefix: string = "IcyDwarf";
    // private levelAssetsPrefix: string = "IcyDwarf";
    
    public receiveLevelInfo(passObj: object)
    {
        // switch(passObj.type)
        // {
        //     case "planet":
        //         var planet = passObj.from;
        //         this.levelAssetsPrefix = this.planetName = planet.texture.key.replace("Planet", "");
        //         break;
        // }
    }
    
    public create()
    {
        let backgraphics = this.add.graphics().setScrollFactor(0);

        backgraphics.fillStyle(0x00ABFF);
        backgraphics.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);

        // const tilemap = this.make.tilemap({ key: this.levelAssetsPrefix + "Tilemap", tileWidth: 16, tileHeight: 16 });
        // const tileset = tilemap.addTilesetImage( this.levelAssetsPrefix + "Tileset");

        const tilemap: Phaser.Tilemaps.Tilemap = this.make.tilemap({ key: "GrassLevel1Tilemap", tileWidth: 16, tileHeight: 16 });
        const tileset: Phaser.Tilemaps.Tileset = tilemap.addTilesetImage("GrassTileset");
        const worldLayer = tilemap.createLayer("World", tileset, 0, 0);
        const fgLayer = tilemap.createLayer("FG", tileset, 0, 0);
        fgLayer.setDepth(4);        
        
        var waterGroup = this.add.group();

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
            TOP_LAVA: 8,
            LAVA: 9,
            LAVA_2: 10,
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
                    tile.faceTop = true;
                }
            }

            switch(tile.index)
            {
                case WORLD_INDEXES.TOP_WATER: case WORLD_INDEXES.WATER: case WORLD_INDEXES.WATER_2:
                    tile.setCollision(false, false, false, false);

                    waterGroup.add(new Water(this, tile.pixelX, tile.pixelY));
                    break;
            }
        });

        // var debugGraphics = this.add.graphics().setAlpha(0.75);

        // worldLayer.renderDebug(debugGraphics, {
        //     tileColor: null, // Color of non-colliding tiles
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        // });
        // const spawnPoint = tilemap.findObject("Objects", obj => obj.name === "Spawn Point");

        this.player = new Player(this, 1300, 0);
 
        this.physics.add.collider(this.player, worldLayer);

        // this.physics.add.collider(this.player, waterGroup);
        this.physics.add.overlap(this.player, waterGroup, function(objectA: Player, objectB: Water)
        {
            objectB.onCollide(objectA);
        }, undefined, this);

        // Camera stuff
        var cam = this.cameras.main;
        cam.startFollow(this.player);
        cam.setZoom(2);
        cam.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);
        // cam.setScroll(-300, 0);
        
        // this.physics.world.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);
        // this.physics.world.setBoundsCollision(true, true, true, false);

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
    }

    public update(time: number, delta: number)
    {
        if(this.player.dead)
        {
            this.scene.restart();
        }

        // this.controls.update(delta);
    }
}