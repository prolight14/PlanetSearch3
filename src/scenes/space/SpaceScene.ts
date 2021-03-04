import SpaceStarScene from "./SpaceStarScene";
import PlayerShip from "../../gameObjects/space/PlayerShip";

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

    public playerShip: PlayerShip;

    private addGameObjects()
    {
        this.playerShip = this.csp.world.add.gameObjectArray(PlayerShip).add(this, 69000, 69000, "playerShip");
    }

    private runScenes()
    {
        this.scene.run("spaceCameraController");
        this.scene.run("spaceDebug");
        this.scene.run("spaceUIDebug");

        this.scene.add("spaceStar", SpaceStarScene, true,
        {
            starsPerCell: 100,
            starSize: 2,
            starScroll: 1
        });

        this.scene.sendToBack("spaceStar");

        this.scene.add("spaceStar2", SpaceStarScene, true,
        {
            starsPerCell: 124,
            starSize: 1,
            starScroll: 0.8
        });

        this.scene.sendToBack("spaceStar2");
    }

    public csp: any;

    public update(time: number, delta: number)
    {
        this.csp.setFollow(this.playerShip.x, this.playerShip.y);
        this.csp.updateWorld();
    }
}