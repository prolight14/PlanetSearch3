import EnemyShip from "../../gameObjects/space/EnemyShip";
import PlayerShip from "../../gameObjects/space/PlayerShip";
import EntryScene from "../EntryScene";
import ISceneGroupHead from "../ISceneGroupHead";
import PlanetScene from "../planet/PlanetScene";
import SpaceCameraControllerScene from "./SpaceCameraControllerScene";
import SpaceLogicScene from "./SpaceLogicScene";

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
            //         positionIterations: 4,
            //         velocityIterations: 2,
            //         constraintIterations: 1
            //     }
            // }
        });
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
        this.load.image("grayNebula", "./assets/Space/nebula/grayNebula.png");
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
        this.cspConfig = {
            window: {
                width: this.game.config.width,
                height: this.game.config.height
            },
            grid: {
                cols: 200,
                rows: 200,
                cellWidth: 800,
                cellHeight: 800
            }
        };
        
        this.csp.initWorld(this.cspConfig);
        (this.scene.get("spaceLogic") as SpaceLogicScene).addObjectsToSpace();
        this.csp.syncWithGrid();
        this.runScenes(false);
        this.loaded = true;

        this.prepareStatsGraphics();
    }

    private statsGraphics: Phaser.GameObjects.Graphics;

    private prepareStatsGraphics()
    {
        this.statsGraphics = this.add.graphics().setDepth(4);
    }

    // private stepMatter: number = 0;

    private playerShip: PlayerShip;

    public runScenes(calledByEntryScene?: boolean)
    { 
        this.scene.run("spaceBackground");
        this.scene.run("spaceLogic");
        this.scene.run("spaceCameraController");
        this.scene.run("starSceneController");
        this.scene.run("spaceUI");

        this.runDebugScenes();

        this.scene.bringToTop("spaceUI");
        if(calledByEntryScene)
        {
            var playerShip = (this.scene.get("spaceLogic") as SpaceLogicScene).playerShip;
            playerShip.y += 500;
            playerShip.resetKeys();
        }


    }

    private runDebugScenes()
    {
        this.scene.run("spaceDebug");
        this.scene.run("spaceUIDebug");
        
        this.scene.sleep("spaceDebug");
 
        this.input.keyboard.on("keydown-U", () =>
        {
            if(this.scene.isSleeping("spaceUIDebug"))
            {
                this.scene.wake("spaceUIDebug");
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
    }

    public sleepScenes(calledByEntryScene?: boolean)
    {
        this.scene.sleep("spaceBackground");
        this.scene.sleep("spaceLogic");
        this.scene.sleep("spaceCameraController");
        this.scene.sleep("spaceDebug");
        this.scene.sleep("spaceUIDebug");
        this.scene.sleep("starSceneController");
        this.scene.sleep("spaceUI");
    }

    public switchToPlanetSceneGroup(levelInfo: object)
    {
        var entryScene: EntryScene = this.scene.get("entry") as EntryScene;

        entryScene.switchSceneGroup("planet", (fromScene: SpaceScene, nextScene: PlanetScene) =>
        {
            nextScene.receiveInfo(levelInfo);
        });
    }

    private cameraTarget: { x: number; y: number; };

    public setCameraTarget(cameraTarget: object)
    {
        this.cameraTarget = cameraTarget as { x: number; y: number; };
        this.cameras.main.startFollow(this.cameraTarget);
    }

    public getCameraTarget()
    {
        return this.cameraTarget;
    }

    public csp: any;

    public update(time: number, delta: number)
    {
        var playerShip = (this.scene.get("spaceLogic") as SpaceLogicScene).playerShip;

        this.csp.setFollow(playerShip.x, playerShip.y);
        this.csp.updateWorld((csp?: any) =>
        {
            this.updateStatsGraphics();

            this.csp.systems.displayList.add(playerShip.particles);
            
            this.sys.displayList.list.forEach((object: any) =>
            {   
                if(object.particles)
                {
                    csp.systems.displayList.add(object.particles);
                }
                if(object.dead)
                {
                    object.bodyConf.destroy();
                    object.destroy();
                    csp.systems.displayList.remove(object);
                }
            });
        });
        
        // if(this.stepMatter++ >= 2)
        // {
        //     this.matter.step(33.33333);
        //     this.stepMatter = 0;
        // }
    }

    private updateStatsGraphics()
    {
        this.csp.systems.displayList.add(this.statsGraphics);

        var cam = this.cameras.main;

        this.statsGraphics.clear();
        this.statsGraphics.setAngle(0);

        this.sys.displayList.list.forEach((object: any) =>
        {
            if(object.getTypeName !== undefined && object.getTypeName() === "enemyShip" && object.getHp() < object.getMaxHp())
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