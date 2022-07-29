import EnemyShip from "../../gameObjects/space/EnemyShip";
import SpaceGameObject from "../../gameObjects/space/SpaceGameObject";
import trig from "../../gameObjects/Utils/trig";
import { PhaserMatterCollisionPlugin } from "phaser-matter-collision-plugin";
import EntryScene from "../EntryScene";
import ISceneGroupHead from "../ISceneGroupHead";
import PlanetScene from "../planet/PlanetScene";
import SpaceGrid from "./SpaceGrid";
import SpaceLogicScene from "./SpaceLogicScene";
import spaceManagerScene from "./SpaceManagerScene";

export default class SpaceScene extends Phaser.Scene implements ISceneGroupHead
{
    constructor()
    {
        super({
            key: "space",
            // physics: {
            //     default: "matter",
            //     matter: {
            //         gravity: false,
            //         autoUpdate: false, 
            //         // positionIterations: 4,
            //         // velocityIterations: 2,
            //         // constraintIterations: 1
            //     }
            // },
            // plugins: {
            //     scene: [
            //         {
            //             plugin: PhaserMatterCollisionPlugin, // The plugin class
            //             key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
            //             mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision
            //         }
            //     ]
            // }
        });
    }
    public preload()
    {
        // Ships and projectiles
        this.load.image("helixShip", "./assets/Space/Ships/helixShip.png");
        this.load.image("helixShipParticle", "./assets/Space/Ships/helixShipParticle.png");
        this.load.image("helixShipLvl1Bullet", "./assets/Space/Bullets/helixShipLvl1Bullet.png");
        this.load.json("helixShipShape", "./assets/Space/Ships/helixShipShape.json");
        this.load.spritesheet("greenShip", "./assets/Space/Ships/GreenShip1.png", { frameWidth: 24, frameHeight: 24 });
        this.load.image("hyperBeamerSTypeGreen", "./assets/Space/Ships/hyperBeamerSTypeGreen.png");
        this.load.image("hyperBeamerSTypeGreenParticle", "./assets/Space/Ships/hyperBeamerSTypeGreenParticle.png");

        // Pickups
        this.load.image("xpStar", "./assets/Space/DroppedItems/XPStar.png");
        this.load.image("smallXPStar", "./assets/Space/DroppedItems/SmallXPStar.png");
        this.load.image("crest", "./assets/Space/DroppedItems/Crest.png");
        
        // Planets
        this.load.image("IcyDwarfPlanet", "./assets/Space/Planets/IcyDwarfPlanet.png");
        this.load.image("RedDustPlanet", "./assets/Space/Planets/RedDustPlanet.png");
        this.load.image("JunglePlanet", "./assets/Space/Planets/JunglePlanet.png");

        // Suns
        this.load.image("Sun", "./assets/Space/Suns/Sun.png");

        // Other stuff
        this.load.image("asteroid1", "./assets/Space/Asteroids/Asteroid.png");
        this.load.image("grayNebula", "./assets/Space/nebula/grayNebula.png");
        this.load.image("purpleNebula", "./assets/Space/nebula/purpleNebula.png");
        this.load.image("shrapnel1", "./assets/Space/Shrapnel/shrapnel1.png");
        this.load.image("shrapnel2", "./assets/Space/Shrapnel/shrapnel2.png");
        this.load.image("shrapnel3", "./assets/Space/Shrapnel/shrapnel3.png");
        this.load.image("shrapnel4", "./assets/Space/Shrapnel/shrapnel4.png");

        // UI
        this.load.spritesheet("shipHealthBar", "./assets/Space/UI/ShipHealthBar.png", { frameWidth: 40, frameHeight: 57 });


        // Shaders
        this.load.glsl("planetLighting", "./assets/space/shaders/planetLighting.glsl");

        this.load.audio("space", "./assets/Music/space.mp3");
    } 

    public cspConfig: any;
    public loaded: boolean = false;

    matterCollision: PhaserMatterCollisionPlugin;
    
    public create()
    {
        const worldWidth = 204800;
        const worldHeight = 204800;
        
        /*
            Changing this will affect performance. 
            Higher values mean:
                Shorter load times (because there are less cells to generate)
                More lag if you turn it too high (because there would be too many objects in the same cell)
                Warning: Turn this too high and you will get insane lag!

            Lower values mean:
            Longer load times (because there are more cells to generate)
            More lag if you turn it too low (because there would be too many cells to loop through)
                Warning: Turn this too low and you will run out of memory!
                
            The default for both is 512 
            it's also probably best to keep this to a power of 2
        */
        const cellWidth = 512;
        const cellHeight = 512;
        
        this.cspConfig = {
            window: {
                width: this.game.config.width,
                height: this.game.config.height
            },
            grid: {
                cols: worldWidth / cellWidth,
                rows: worldHeight / cellHeight,
                cellWidth: cellWidth,
                cellHeight: cellHeight
            },
            seed: this.game.config.seed
        };

        
        ///////////////////////////////
        // This is what we're doing now
        this.world = new SpaceGrid(this.sys, this.cspConfig);
        this.world.buildSpace();
        (this.scene.get("spaceLogic") as SpaceLogicScene).addObjectsToSpace();

        this.runScenes(false);
        this.prepareStatsGraphics();
        this.generateBulletsTextures();

        this.cameras.main.startFollow((this.scene.get("spaceLogic") as SpaceLogicScene).playerShip);
        this.loaded = true;

        const spaceMusic: Phaser.Sound.BaseSound = this.sound.add("space", {
            loop: true
        });
        
        spaceMusic.play();
    }

    private generateBulletsTextures()
    {
        this.generateBullet("lightningBlue", 2, 16, 0x3CD3F8);
        this.generateBullet("lightningBlueLong", 2, 24, 0x3CD3F8);
    }

    private generateBullet(key: string, width: number, length: number, color: number)
    {
        const rt = this.add.renderTexture(0, 0, width, length);
        const graphics = this.add.graphics();

        graphics.fillStyle(color);
        graphics.fillRect(0, 0, width, length);
        rt.draw(graphics);
        graphics.setVisible(false);
        graphics.destroy();

        rt.saveTexture(key);
        rt.setVisible(false);
    }

    public world: SpaceGrid;

    public handleGameOver()
    {
        this.reloadSpace();
    }
    
    private reloadSpace()
    {
        (this.scene.get("spaceManager") as spaceManagerScene).destroySolarSystems();
        this.world.resetSpace();
        (this.scene.get("spaceLogic") as SpaceLogicScene).addObjectsToSpace();
        this.cameras.main.startFollow((this.scene.get("spaceLogic") as SpaceLogicScene).playerShip);
    }

    private statsGraphics: Phaser.GameObjects.Graphics;

    private prepareStatsGraphics()
    {
        this.statsGraphics = this.add.graphics().setDepth(4);
    }
    
    private stepMatter: number = 0;

    public runScenes(calledByEntryScene?: boolean)
    { 
        this.runDebugScenes();

        this.scene.run("spaceLogic");
        this.scene.run("spaceCameraController");
        this.scene.run("starSceneController");
        
        this.scene.run("spaceUI");

        this.scene.run("spaceMap");
        // this.scene.bringToTop("spaceUI");

        this.scene.run("spaceManager");

        this.scene.bringToTop("spaceMap");

        var playerShip = (this.scene.get("spaceLogic") as SpaceLogicScene).playerShip;

        if(calledByEntryScene)
        {
            playerShip.y += 500;
            playerShip.resetKeys();
        }
    }

    private runDebugScenes()
    {
        this.scene.run("spaceDebug");
        this.scene.sleep("spaceDebug");
        
        this.scene.bringToTop("spaceUIDebug");
        this.scene.run("spaceUIDebug");
        this.scene.sleep("spaceUIDebug");
        this.scene.get("spaceUIDebug").scene.setVisible(false);

        this.input.keyboard.on("keydown-U", () =>
        {
            if(this.scene.isSleeping("spaceUIDebug"))
            {
                this.scene.wake("spaceUIDebug");
                this.scene.bringToTop("spaceUIDebug");
                this.scene.get("spaceUIDebug").scene.setVisible(true);
            }
            else
            {
                this.scene.sleep("spaceUIDebug");
                this.scene.get("spaceUIDebug").scene.setVisible(false);
            }
        });
        this.input.keyboard.on("keydown-I", () =>
        {
            if(this.scene.isSleeping("spaceDebug"))
            {
                this.scene.wake("spaceDebug");
            }
            else
            {
                this.scene.sleep("spaceDebug");
            }
        });
    }

    private sleepDebugScenes()
    {
        this.scene.sleep("spaceDebug");
        this.scene.sleep("spaceUIDebug");
    }

    public sleepScenes(calledByEntryScene?: boolean)
    {
        this.scene.moveBelow("spaceUI");
        this.scene.sleep("spaceUI");
        this.scene.sleep("starSceneController");
        this.scene.sleep("spaceCameraController");
        this.scene.sleep("spaceMap");
        this.scene.sleep("spaceLogic");
        // this.scene.sleep("spaceManager");
        this.sleepDebugScenes();
    }

    public stopScenes()
    {
        this.scene.stop("spaceUIDebug");
        this.scene.stop("spaceDebug");
        this.scene.stop("spaceUI");
        this.scene.stop("starSceneController");
        this.scene.stop("spaceCameraController");
        this.scene.stop("spaceMap");
        this.scene.stop("spaceLogic");
        this.scene.stop("spaceManager");
    }

    public switchToPlanetSceneGroup(levelInfo: object)
    {
        var entryScene: EntryScene = this.scene.get("entry") as EntryScene;

        entryScene.switchSceneGroup("planet", (fromScene: SpaceScene, nextScene: PlanetScene) =>
        {
            nextScene.receiveInfo(levelInfo);
        });
    }

    public update(time: number, delta: number)
    {
        var cam = this.cameras.main;
        this.world.updateScroll(cam.scrollX + cam.centerX, cam.scrollY + cam.centerY);
        this.world.updateSpace();

        this.sys.displayList.list.forEach((gameObject: any) =>
        {   
            if(gameObject.particles !== undefined)
            {
                this.sys.displayList.add(gameObject.particles);
            }
        });

        this.updateStatsGraphics();


        if(this.stepMatter++ >= 2)
        {
            this.matter.step(1000 / 30, 0);

            this.stepMatter = 0;
        }
    }

    private updateStatsGraphics()
    { 
        this.statsGraphics.clear();
        this.statsGraphics.setAngle(0);

        this.sys.displayList.list.forEach((object: any) =>
        {
            // Might need to change this
            if((object as EnemyShip).showHpBar)
            {
                var enemyShip = object as EnemyShip;

                const graphics = this.statsGraphics;
                
                if(enemyShip.getHp() < enemyShip.getMaxHp())
                {
                    // var cameraRotation = (this.scene.get("spaceCameraController") as SpaceCameraControllerScene).getCameraAngle() * Phaser.Math.DEG_TO_RAD;

                    var barX = enemyShip.x - enemyShip.width * 0.5;
                    var barY = enemyShip.y - enemyShip.width * 0.7;

                    // var rectShape = new Phaser.Geom.Rectangle(barX, barY, enemyShip.getHp() * enemyShip.width / enemyShip.getMaxHp(), 4);

                    // this.statsGraphics.fillRectShape(rectShape);

                    // this.statsGraphics.rotateCanvas(30 * Phaser.Math.DEG_TO_RAD);
                    graphics.fillStyle(0x0A297E);
                    graphics.fillRect(barX, barY, enemyShip.width, 4);
                    graphics.fillStyle(0x54B70E);
                    graphics.fillRect(barX, barY, enemyShip.getHp() * enemyShip.width / enemyShip.getMaxHp(), 4);

                    graphics.lineStyle(10, 0x0FAB23);
                    // graphics.strokeCircle(this.x, this.y, this.fovRadius);
            
                  

                }

                // enemyShip.debugFov(this.statsGraphics);

                // // Renders fov
                // const fovStats = enemyShip.fovStats;
                // graphics.lineStyle(10, 0x0FAB23);
                // graphics.fillStyle(0xBB0012, 0.4);
                // graphics.beginPath();
                // graphics.arc(
                //     enemyShip.x, 
                //     enemyShip.y, 
                //     fovStats.range,
                //     (enemyShip.angle - 90 - fovStats.fov * 0.5) * Phaser.Math.DEG_TO_RAD, 
                //     (enemyShip.angle - 90 + fovStats.fov * 0.5) * Phaser.Math.DEG_TO_RAD
                // );
                // graphics.strokePath();
        
                // if(enemyShip.canSeeSomething)
                // {
                //     graphics.fillPath();
                // }
            }
        });

        this.sys.displayList.add(this.statsGraphics);
    }
}