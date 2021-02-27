import PlayerShip from "../../gameObjects/space/PlayerShip";

export default class SpaceScene extends Phaser.Scene
{
    private cspConfig: any;

    constructor()
    {
        super("space");
    }

    public preload()
    {
        this.load.image("playerShip", "./assets/playership.png");

        this.load.scenePlugin({
            key: "CartesianSystemPlugin",
            url: "../src/libraries/CartesianSystemPlugin.js",
            sceneKey: 'csp'
        });
    }

    public playerShip: PlayerShip;

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

        this.playerShip = this.csp.world.add.gameObjectArray(PlayerShip).add(this, 69000, 69000, "playerShip");

        this.csp.syncWithGrid();

        this.cameras.main.startFollow(this.playerShip);

        this.runScenes();
    }

    private runScenes()
    {
        this.scene.run("spaceDebug");
    }

    fpsText: Phaser.GameObjects.Text;
    csp: any;

    public update(time: number, delta: number)
    {
        this.csp.setFollow(this.playerShip.x, this.playerShip.y);
        this.csp.updateWorld();
    }
}