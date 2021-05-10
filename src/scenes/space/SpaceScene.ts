import Planet from "../../gameObjects/space/Planet";
import PlayerShip from "../../gameObjects/space/PlayerShip";
import SpaceGameObject from "../../gameObjects/space/SpaceGameObject";
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
        this.addObjectsToSpace();
        this.csp.syncWithGrid();
        this.runScenes(false);
        this.loaded = true;
    }

    playerShip: PlayerShip;   

    private addObjectsToSpace()
    {
        var world: any = this.csp.world;

        var planets = world.add.gameObjectArray(Planet);

        planets.add(this, 69000, 60000, "IcyDwarfPlanet").setScale(13, 13);
        planets.add(this, 56000, 70000, "RedDustPlanet").setScale(13, 13);

        this.playerShip = world.add.gameObjectArray(PlayerShip).add(this, 56000, 70000 + 1000, "playerShip");

        this.setCameraTarget(this.playerShip);
    }

    private updatePlanets()
    {
        let playerShip = this.playerShip;

        this.sys.displayList.list.forEach((object: SpaceGameObject) =>
        {
            if(object._arrayName === "planet")
            {
                var planet = object;

                var dx = planet.x - playerShip.x;
                var dy = planet.y - playerShip.y;

                if(dx * dx + dy * dy < Math.pow(planet.displayWidth / 2, 2))
                {
                    this.switchToPlanetSceneGroup();
                }
            }
        });
    }

    public runScenes(calledByEntryScene?: boolean)
    {
        this.scene.run("spaceCameraController");
        this.scene.run("starSceneController");
        this.runDebugScenes();

        if(calledByEntryScene)
        {
            this.playerShip.y += 500;
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

        this.updatePlanets();
    }
}