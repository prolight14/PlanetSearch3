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

    private runScenes()
    {
        this.scene.run("spaceCameraController");

        // this.scene.run("spaceDebug");
        this.scene.run("spaceUIDebug");
        
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
            starScroll: 0.8
        });
        this.scene.sendToBack("spaceStar2");

        this.scene.add("spaceStar3", SpaceStarScene, true,
        {
            starsPerCell: 357,
            starSize: 1,
            starScroll: 0.56
        });
        this.scene.sendToBack("spaceStar3");

        this.scene.add("spaceStar4", SpaceStarScene, true,
        {
            starsPerCell: 700,
            starSize: 1,
            starScroll: 0.45
        });
        this.scene.sendToBack("spaceStar4");
    }

    public csp: any;

    public update(time: number, delta: number)
    {
        var follow: { x: number, y: number } = this.getCameraTarget();

        this.csp.setFollow(follow.x, follow.y);
        this.csp.updateWorld();

        // var cam = this.cameras.main;
        // cam.setScroll(follow.x - cam.width / 2, follow.y - cam.height / 2);
        // cam.setZoom(this.scene.get("spaceCameraController").cameras.main.zoom);
    }
}