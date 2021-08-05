//@ts-nocheck
import Player from "../../gameObjects/planet/Player";
// import PhaserMatterCollisionPlugin from "./libraries/phaser-matter-collision-plugin";

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
        
        worldLayer.setCollisionByProperty({ collides: true });
        worldLayer.forEachTile((tile: Phaser.Tilemaps.Tile) =>
        {
            // if(tile.index === 0)
            // {
            //     return;
            // }

            if(tile.index === 3)
            {
                tile.collideLeft = false;
                tile.collideRight = false;
                tile.collideDown = false;
                tile.collideUp = false;
            }
            else if(tile.index === 1 || tile.index === 2)
            {
                tile.collideLeft = false;
                tile.collideRight = false;
                tile.collideDown = false;
                tile.collideUp = true;
                
                // const tileBelow;
                // if(tileBelow = worldLayer.getTileAt(tile.x, tile.y + 1))
                // {
                //     // tileBelow.collideUp = true;
                //     // tileBelow.faceTop = true;
                //     // tileBelow.faceBottom = true;

                //     tileBelow.resetCollision(true);

                //     tileBelow.setCollision(true, true, true, true, true);
                //     tileBelow.faceTop = true;

                // }

                // tile.faceTop = true;
                // tile.faceBottom = true;
                // tile.faceLeft = false;
                // tile.faceRight = false;

                // tile.setCollision(false, false, true, false, true);

                // tile.resetCollision(true);
            }
            else if(tile.index > 2)
            {
                // tile.resetCollision(true);
                // // tile.setColl = true;
                
                // tile.setCollision(true, true, true, true, true);

                const tileAbove;
                if(tile.y > 0 && 
                    (tileAbove = worldLayer.getTileAt(tile.x, tile.y - 1)) && 
                    ([1, 2, 3].indexOf(tileAbove.index) !== -1)
                )
                {
                    tile.faceTop = true;
                }

                const tileLeft;
                if(tile.x > 0 && 
                    (tileLeft = worldLayer.getTileAt(tile.x - 1, tile.y)) && 
                    [1, 2, 3].indexOf(tileLeft.index) !== -1)
                {
                    tile.faceLeft = true;
                }

                const tileRight;
                if(tile.x < tilemap.width && 
                    (tileRight = worldLayer.getTileAt(tile.x + 1, tile.y)) && 
                    [1, 2, 3].indexOf(tileRight.index) !== -1)
                {
                    tile.faceRight = true;
                }
            }
        });

        tilemap.createBlankLayer

        // tilemap.
        
        // worldLayer.forEachTile(function(tile: Phaser.Tilemaps.Tile)
        // {
        //     if(tile.index === 1 || tile.index === 2)
        //     {
        //         tile.setCollision(false, false, true, false, true);
        //         worldLayer.getTileAt(tile.x, tile.y + 1).setCollision(true, true, true, true);
        //     }
        //     else if(tile.index === 3)
        //     {
        //         tile.setCollision(false, false, false, false, true);
        //     }
        //     else if(tile.index !== -1)
        //     {
        //         tile.setCollision(true, true, true, true);
        //     }
        // });

        var debugGraphics = this.add.graphics().setAlpha(0.75);

        worldLayer.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });
        // const spawnPoint = tilemap.findObject("Objects", obj => obj.name === "Spawn Point");

        this.player = new Player(this, 300, 0);
 
        this.physics.add.collider(this.player, worldLayer);

        // Camera stuff
        var cam = this.cameras.main;
        cam.startFollow(this.player);
        cam.setZoom(2);
        cam.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);
        cam.setScroll(-300, 0);
        
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