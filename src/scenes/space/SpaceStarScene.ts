import SpaceScene from "./SpaceScene";

export default class SpaceStarScene extends Phaser.Scene
{
    constructor()
    {
        super("spaceStar");

        this.starsPerCell = 22;
        this.starSize = 2;
    }

    private starsPerCell: number;
    private starSize: number;
    private csStars: any;

    public preload()
    {
        this.load.scenePlugin({
            key: "CartesianSystemPlugin",
            url: "./libraries/CartesianSystemPlugin.js",
            sceneKey: 'csStars'
        });
    }

    private stars: Phaser.GameObjects.Graphics;

    public create()
    {
        var spaceScene: SpaceScene = this.scene.get("space") as SpaceScene;
        this.csStars.initWorld(spaceScene.cspConfig);

        this.stars = this.add.graphics();
    }

    public update()
    {
        var spaceScene: SpaceScene = this.scene.get("space") as SpaceScene;
        this.csStars.setFollow(spaceScene.playerShip.x, spaceScene.playerShip.y);
        this.csStars.updateWorld();

        this.sys.displayList.add(this.stars);
        this.renderStars();
    }

    public renderStars()
    {
        this.stars.clear();
        this.stars.fillStyle(0xFFFFFF);

        this.stars.fillRect(69000, 69000, this.starSize, this.starSize);

        let world: any = this.csStars.world;

        let rng, i, x, y;

        let { cellWidth, cellHeight } = world.cameraGrid;

        world.loopThroughVisibleCells((cell: object, col: number, row: number) =>
        {
            rng = new Phaser.Math.RandomDataGenerator([(col + row).toString()]);

            x = col * cellWidth;
            y = row * cellHeight;

            for(i = 0; i < this.starsPerCell; i++)
            {
                this.stars.fillRect(x + rng.between(0, cellWidth), y + rng.between(0, cellHeight), this.starSize, this.starSize);
            }
        });
    }

    public setCSPCameraWindow(x: number, y: number, width: number, height: number)
    {
        this.csStars.world.camera.setWindow(
            x, y, width, height
        );
    }
}