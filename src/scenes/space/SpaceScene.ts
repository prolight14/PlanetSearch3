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

    public cspConfig: object;

    public create()
    {
        this.cspConfig = {
            window: {
                width: this.game.config.width,
                height: this.game.config.height
            },
            grid: {
                cols: 345,
                rows: 345,
                cellWidth: 400,
                cellHeight: 400
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
        this.cameras.main.startFollow(this.playerShip);
    }

    private runScenes()
    {
        this.scene.run("spaceCameraController");
        this.scene.run("spaceStar");
        // this.scene.run("spaceDebug");
        this.scene.run("spaceUIDebug");
    }

    fpsText: Phaser.GameObjects.Text;
    csp: any;

    public update(time: number, delta: number)
    {
        this.csp.setFollow(this.playerShip.x, this.playerShip.y);
        this.csp.updateWorld();
    }
}