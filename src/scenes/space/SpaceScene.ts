import EnemyShip from "../../gameObjects/space/EnemyShip";
import PlayerShip from "../../gameObjects/space/PlayerShip";
import SpaceGameObject from "../../gameObjects/space/SpaceGameObject";
import EntryScene from "../EntryScene";
import ISceneGroupHead from "../ISceneGroupHead";
import PlanetScene from "../planet/PlanetScene";
import CameraTargetTracker from "./CameraTargetTracker";
import SpaceLogicScene from "./SpaceLogicScene";

export default class SpaceScene extends Phaser.Scene implements ISceneGroupHead
{
    constructor()
    {
        super({
            key: "space",
            physics: {
                default: "matter",
                matter: {
                    gravity: false,
                    autoUpdate: false, 
                    // positionIterations: 4,
                    // velocityIterations: 2,
                    // constraintIterations: 1
                }
            }
        });

        this.cameraTargetTracker = new CameraTargetTracker();

    }
    
    public preload()
    {
        this.load.image("helixShip", "./assets/Space/Ships/helixShip.png");
        this.load.image("helixShipParticle", "./assets/Space/Ships/helixShipParticle.png");
        this.load.image("helixShipLvl1Bullet", "./assets/Space/Bullets/helixShipLvl1Bullet.png");
        this.load.json("helixShipShape", "./assets/Space/Ships/helixShipShape.json");
        this.load.image("hyperBeamerSTypeGreen", "./assets/Space/Ships/hyperBeamerSTypeGreen.png");
        this.load.image("hyperBeamerSTypeGreenParticle", "./assets/Space/Ships/hyperBeamerSTypeGreenParticle.png");
        this.load.spritesheet("shipHealthBar", "./assets/Space/UI/ShipHealthBar.png", { frameWidth: 40, frameHeight: 57 });
        
        this.load.image("asteroid1", "./assets/Space/Asteroids/Asteroid.png")
        this.load.image("IcyDwarfPlanet", "./assets/Space/Planets/IcyDwarfPlanet.png");
        this.load.image("RedDustPlanet", "./assets/Space/Planets/RedDustPlanet.png");
        this.load.image("GreenPlanet", "./assets/Space/Planets/GreenPlanet.png");
        this.load.image("grayNebula", "./assets/Space/nebula/grayNebula.png");
        this.load.image("purpleNebula", "./assets/Space/nebula/purpleNebula.png");
        this.load.image("xpStar", "./assets/Space/DroppedItems/XPStar.png");
        this.load.image("smallXPStar", "./assets/Space/DroppedItems/SmallXPStar.png");
        this.load.image("crest", "./assets/Space/DroppedItems/Crest.png");

        this.load.image("shrapnel1", "./assets/Space/Shrapnel/shrapnel1.png");
        this.load.image("shrapnel2", "./assets/Space/Shrapnel/shrapnel2.png");
        this.load.image("shrapnel3", "./assets/Space/Shrapnel/shrapnel3.png");
        this.load.image("shrapnel4", "./assets/Space/Shrapnel/shrapnel4.png");
        
        this.load.scenePlugin({
            key: "CartesianSystemPlugin",
            url: "./libraries/CartesianSystemPlugin.js",
            sceneKey: 'csp'
        });
    }

    public cspConfig: any;
    public loaded: boolean = false;

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
            }
        };
        
        this.csp.initWorld(this.cspConfig);
        (this.scene.get("spaceLogic") as SpaceLogicScene).addObjectsToSpace();
        this.runScenes(false);
        this.loaded = true;
        
        // this.matter.world.engine.enableSleeping = true;
        this.prepareStatsGraphics();
        
        this.cameras.main.startFollow(this.cameraTargetTracker);

        // this.matter.grid.create({
        //     bucketWidth: 65536,
        //     bucketHeight: 65536
        // });

        // this.matter.grid.create({
        //     bucketWidth: this.cspConfig.cellWidth * 0.5,
        //     bucketHeight: this.cspConfig.cellWidth * 0.5
        // })
    }

    public handleGameOver()
    {
        this.reloadSpace();
    }

    public reloadSpace()
    {
        this.csp.initWorld(this.cspConfig);
        (this.scene.get("spaceLogic") as SpaceLogicScene).addObjectsToSpace();
    }

    private statsGraphics: Phaser.GameObjects.Graphics;

    private prepareStatsGraphics()
    {
        this.statsGraphics = this.add.graphics().setDepth(4);
    }
    
    private stepMatter: number = 0;
    
    private playerShip: PlayerShip;
    private cameraTargetTracker: CameraTargetTracker;

    public setCameraTarget(object: any)
    {
        this.cameraTargetTracker.setTrackedObject(object);
    }

    public getCameraTarget()
    {
        return this.cameraTargetTracker;
    }

    public runScenes(calledByEntryScene?: boolean)
    { 
        // this.scene.run("spaceBackground");
        this.scene.run("spaceLogic");
        this.scene.run("spaceCameraController");
        this.scene.run("starSceneController");
        
        this.scene.run("spaceUI");
        // this.scene.bringToTop("spaceUI");
        
        this.runDebugScenes();
        
        // this.scene.run("spaceEffects");
        this.scene.bringToTop("spaceEffects");

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
        
        this.scene.run("spaceUIDebug");
        this.scene.sleep("spaceUIDebug");
        this.scene.bringToTop("spaceUIDebug");

        this.input.keyboard.on("keydown-U", () =>
        {
            if(this.scene.isSleeping("spaceUIDebug"))
            {
                this.scene.wake("spaceUIDebug");
                this.scene.bringToTop("spaceUIDebug");
            }
            else
            {
                this.scene.sleep("spaceUIDebug");
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

        this.scene.bringToTop("spaceEffects");
    }

    private sleepDebugScenes()
    {
        this.scene.sleep("spaceDebug");
        this.scene.sleep("spaceUIDebug");
    }

    public sleepScenes(calledByEntryScene?: boolean)
    {

        this.scene.moveBelow("spaceUI", "spaceEffects");
        this.scene.sleep("spaceUI");
        this.scene.sleep("starSceneController");
        this.scene.sleep("spaceCameraController");
        this.scene.sleep("spaceLogic");
        // this.scene.sleep("spaceBackground");

        // // this.scene.sleep("spaceBackground");
        // this.scene.sleep("spaceLogic");
        // this.scene.sleep("spaceCameraController");
        // this.scene.sleep("spaceDebug");
        // this.scene.sleep("spaceUIDebug");
        // this.scene.sleep("starSceneController");
        // this.scene.sleep("spaceUI");
        // // this.scene.sleep("spaceEffects");
    }

    public switchToPlanetSceneGroup(levelInfo: object)
    {
        var entryScene: EntryScene = this.scene.get("entry") as EntryScene;

        entryScene.switchSceneGroup("planet", (fromScene: SpaceScene, nextScene: PlanetScene) =>
        {
            nextScene.receiveInfo(levelInfo);
        });
    }

    public getEffectsScene()
    {
        return this.scene.get("spaceEffects");
    }

    public csp: any;

    public update(time: number, delta: number)
    {
        var playerShip = (this.scene.get("spaceLogic") as SpaceLogicScene).playerShip;

        this.cameraTargetTracker.update();

        this.updateStatsGraphics();

        this.csp.setFollow(playerShip.x, playerShip.y);
        this.csp.updateWorld((csp?: any) =>
        {
            this.csp.systems.displayList.add(playerShip.particles);
            
            this.sys.displayList.list.forEach((gameObject: any) =>
            {   
                if(gameObject.particles !== undefined)
                {
                    csp.systems.displayList.add(gameObject.particles);
                }
                if(gameObject.destroyQueued)
                {
                    gameObject.destroy();
                    gameObject.destroyQueued = false;
                }
            });

            this.csp.systems.displayList.add(this.statsGraphics);

            this.sys.updateList.getActive().forEach((gameObject: SpaceGameObject) =>
            {
                if(gameObject.destroyQueued)
                {
                    gameObject.destroy();
                    gameObject.destroyQueued = false;
                }
            });
        });
        
        if(this.stepMatter++ >= 2)
        {
            // this.matter.grid.clear(this.matter.grid);
            // this.matter.grid.update(this.matter.grid, this.sys.updateList.getActive().map(obj => obj.body) as MatterJS.BodyType[], this.matter.world.engine, true);
            this.matter.step(1000 / 30, 0);
            // this.matter.step();
            this.stepMatter = 0;
        }
    }

    private updateStatsGraphics()
    { 
        var cam = this.cameras.main;

        this.statsGraphics.clear();
        this.statsGraphics.setAngle(0);

        this.sys.displayList.list.forEach((object: any) =>
        {
            // Might need to change this
            if((object as EnemyShip).showHpBar && object.getHp() < object.getMaxHp())
            {
                var enemyShip = object as EnemyShip;
                // var cameraRotation = (this.scene.get("spaceCameraController") as SpaceCameraControllerScene).getCameraAngle() * Phaser.Math.DEG_TO_RAD;

                var barX = enemyShip.x - enemyShip.width * 0.5;
                var barY = enemyShip.y - enemyShip.width * 0.7;

                // var rectShape = new Phaser.Geom.Rectangle(barX, barY, enemyShip.getHp() * enemyShip.width / enemyShip.getMaxHp(), 4);

                // this.statsGraphics.fillRectShape(rectShape);

                // this.statsGraphics.rotateCanvas(30 * Phaser.Math.DEG_TO_RAD);
                this.statsGraphics.fillStyle(0x0A297E);
                this.statsGraphics.fillRect(barX, barY, enemyShip.width, 4);
                this.statsGraphics.fillStyle(0x54B70E);
                this.statsGraphics.fillRect(barX, barY, enemyShip.getHp() * enemyShip.width / enemyShip.getMaxHp(), 4);
            }
        });
    }
}