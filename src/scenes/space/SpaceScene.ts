import SpaceStarScene from "./SpaceStarScene";
import PlayerShip from "../../gameObjects/space/PlayerShip";
import Planet from "../../gameObjects/space/Planet";
import SpaceGameObject from "../../gameObjects/space/SpaceGameObject";
import EntryScene from "../EntryScene";

export default class SpaceScene extends Phaser.Scene
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

        this.addGameObjects();
        this.csp.syncWithGrid();

        this.runScenes();
    }

    playerShip: PlayerShip;

    private addGameObjects()
    {
        var world: any = this.csp.world;

        var planets = world.add.gameObjectArray(Planet);

        planets.add(this, 69000, 60000, "IcyDwarfPlanet").setScale(13, 13);
        planets.add(this, 56000, 70000, "RedDustPlanet").setScale(13, 13);

        var playerShip: PlayerShip = world.add.gameObjectArray(PlayerShip).add(this, 69000, 61000, "playerShip");

        this.setCameraTarget(playerShip);

        this.playerShip = playerShip;
    }

    private cameraTarget: { x: number, y: number };

    private setCameraTarget(target: any)
    {
        this.cameraTarget = target as { x: number, y: number };
        this.cameras.main.startFollow(target);
    }
    
    public getCameraTarget(): { x: number, y: number }
    {
        return this.cameraTarget;
    }
    
    private runScenes()
    {
        this.scene.run("spaceCameraController");

        this.runDebugScenes();
        this.runStarScenes();
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

    private runStarScenes()
    {
        this.scene.add("spaceStar", SpaceStarScene, true,
        {
            starsPerCell: 100,
            starSize: 3,
            starScroll: 1
        });
        this.scene.sendToBack("spaceStar");

        this.scene.add("spaceStar2", SpaceStarScene, true,
        {
            starsPerCell: 124,
            starSize: 2,
            starScroll: 0.73
        });
        this.scene.sendToBack("spaceStar2");

        this.scene.add("spaceStar3", SpaceStarScene, true,
        {
            starsPerCell: 250,
            starSize: 1,
            starScroll: 0.56
        });
        this.scene.sendToBack("spaceStar3");

        this.starScenesSleeping = false;
    }

    private starScenesSleeping: boolean;
    
    public sleepScenes()
    {
        this.scene.sleep("spaceCameraController");
        this.scene.sleep("spaceDebug");
        this.scene.sleep("spaceUIDebug");
        this.scene.sleep("spaceStar");
        this.scene.sleep("spaceStar2");
        this.scene.sleep("spaceStar3");

        this.starScenesSleeping = true;
    }

    public csp: any;

    public update(time: number, delta: number)
    {
        var follow: { x: number, y: number } = this.getCameraTarget();

        this.csp.setFollow(follow.x, follow.y);
        this.csp.updateWorld();

        this.updatePlanets();
        this.updateStarFade();
    }
    
    private updatePlanets()
    {
        let world = this.csp.world;
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
                    this.gotoPlanetSceneGroup();
                }
            }
        });
    }

    private gotoPlanetSceneGroup()
    {
        var entryScene = this.scene.get("entry") as EntryScene;

        entryScene.sleepSceneGroup("space");
        entryScene.runSceneGroup("planet");
    }

    private updateStarFade()
    {
        if(this.starScenesSleeping)
        {
            return;
        }

        if(this.cameras.main.zoom <= 0.5)
        {
            this.scene.sleep("spaceStar3");
        }
        else
        {
            this.scene.wake("spaceStar3");
        }

        if(this.cameras.main.zoom <= 0.35)
        {
            this.scene.sleep("spaceStar2");
        }
        else
        {
            this.scene.wake("spaceStar2");
        }
    }
}