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
                // default: "arcade",
                // arcade: {
                //     gravity: { y: 800 } 
                // }
                default: "matter",
                matter: {
                    gravity: { y: 1 }
                }
            },
        });
    }

    player: Player;
    controls: Phaser.Cameras.Controls.FixedKeyControl;
    matterCollision: any;
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
        
        this.matter.world.convertTilemapLayer(worldLayer);

        worldLayer.forEachTile(function(tile: Phaser.Tilemaps.Tile)
        {
            if(tile.index === 1 || tile.index === 2)
            {
                tile.setCollision(false, false, true, false, true);
                worldLayer.getTileAt(tile.x, tile.y + 1).setCollision(true, true, true, true);
            }
            else if(tile.index === 3)
            {
                tile.setCollision(false, false, false, false, true);
            }
            else if(tile.index !== -1)
            {
                tile.setCollision(true, true, true, true);
            }
        });

        // var debugGraphics = this.add.graphics().setAlpha(0.75);

        // worldLayer.renderDebug(debugGraphics, {
        //     tileColor: null, // Color of non-colliding tiles
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        // });
        // const spawnPoint = tilemap.findObject("Objects", obj => obj.name === "Spawn Point");

        // var m_images = [];
        // for(var x = 0; x < 1200; x += 30)
        // {
        //     m_images.push(this.matter.add.image(x, 100, "test", "prolight").setRectangle(30, 30, { restitution: 0.2, friction: 0.2 }));//setCircle(20, { restitution: 0.25, friction: 0.5 });
        // }
 
        // var smallRect = this.matter.add.image(200, 0, "nothing2", "nothing").setRectangle(12, 12, {restitution: 0.1, friction: 0.1 });

        this.player = new Player(this, 300, 0);
 
        // this.physics.add.collider(this.player, worldLayer);

        // this.matterCollision.addOnCollideStart({
        //     objectA: smallRect,
        //     objectB: m_images,
        //     callback: eventData => {
        //         console.log("Player hit an enemy");
        //     }
        // });


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
        // if(this.player.dead)
        // {
        //     this.scene.restart();
        // }

        // this.controls.update(delta);
    }
}