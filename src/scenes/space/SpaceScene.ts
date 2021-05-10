import EntryScene from "../EntryScene";
import ISceneGroupHead from "../ISceneGroupHead";
import SpaceLogicScene from "./SpaceLogicScene";

export default class SpaceScene extends Phaser.Scene implements ISceneGroupHead
{
    constructor()
    {
        super("space");
    }

    public preload()
    {
        this.load.image("playerShip", "./assets/Space/Ships/playerShip.png");
        this.load.image("IcyDwarfPlanet", "./assets/Space/Planets/IcyDwarfPlanet.png");
        this.load.image("RedDustPlanet", "./assets/Space/Planets/RedDustPlanet.png");

        this.load.scenePlugin({
            key: "CartesianSystemPlugin",
            url: "./libraries/CartesianSystemPlugin.js",
            sceneKey: 'csp'
        });
    }

    public cspConfig: any;

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

        this.runScenes();
    }

    public runScenes(calledByEntryScene?: boolean)
    {
        this.scene.run("spaceLogic");
        this.scene.run("spaceCameraController");
        this.scene.run("starSceneController");
        this.runDebugScenes();

        if(calledByEntryScene)
        {
            (this.scene.get("spaceLogic") as SpaceLogicScene).playerShip.y += 500;
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
        this.scene.sleep("spaceLogic");
        this.scene.sleep("spaceCameraController");
        this.scene.sleep("spaceDebug");
        this.scene.sleep("spaceUIDebug");
        this.scene.sleep("starSceneController");
    }

    public switchToPlanetSceneGroup()
    {
        var entryScene: EntryScene = this.scene.get("entry") as EntryScene;

        entryScene.switchSceneGroup("planet");
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
        var cam = this.cameras.main;

        this.csp.setFollow(cam.scrollX, cam.scrollY);
        this.csp.updateWorld();
    }
}