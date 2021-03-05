import SpaceStarScene from "./SpaceStarScene";
import PlayerShip from "../../gameObjects/space/PlayerShip";
import SpaceCameraControllerScene from "./SpaceCameraControllerScene";

export default class SpaceScene extends Phaser.Scene
{
    constructor()
    {
        super("space");
    }

    public preload()
    {
        this.load.image("playerShip", "./assets/playership.png");

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
                cols: 182,
                rows: 182,
                cellWidth: 800,
                cellHeight: 800
            }
        };

        this.csp.initWorld(this.cspConfig);

        this.addGameObjects();
        this.csp.syncWithGrid();

        this.runScenes();
    }

    private addGameObjects()
    {
        var playerShip: PlayerShip = this.csp.world.add.gameObjectArray(PlayerShip).add(this, 69000, 69000, "playerShip");

        this.setCameraTarget(playerShip);
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
            starsPerCell: 201,
            starSize: 1,
            starScroll: 0.56
        });
        this.scene.sendToBack("spaceStar3");
    }

    private runScenes()
    {
        this.scene.run("spaceCameraController");

        this.runDebugScenes();
        this.runStarScenes();
    }

    public csp: any;

    public update(time: number, delta: number)
    {
        var follow: { x: number, y: number } = this.getCameraTarget();

        this.csp.setFollow(follow.x, follow.y);
        this.csp.updateWorld();

        if(this.cameras.main.zoom <= 0.5)
        {
            this.scene.sleep("spaceStar3");
        }
        else
        {
            this.scene.wake("spaceStar3");
        }

        if(this.cameras.main.zoom <= 0.3)
        {
            this.scene.sleep("spaceStar2");
        }
        else
        {
            this.scene.wake("spaceStar2");
        }
    }
}