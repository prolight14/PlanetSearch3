import SpaceScene from "./SpaceScene";

export default class SpaceStarScene extends Phaser.Scene
{
    constructor()
    {
        super("spaceStar");

        this.starsPerCell = 200;
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
    private spaceScene: SpaceScene;
    public create()
    {
        this.spaceScene = this.scene.get("space") as SpaceScene;
       
        this.csStars.initWorld(this.spaceScene.cspConfig);

        this.stars = this.add.graphics();
    }

    public update()
    {
        // var cam: Phaser.Cameras.Scene2D.Camera = this.cameras.main;

        this.csStars.setFollow(this.spaceScene.playerShip.x, this.spaceScene.playerShip.y);
        this.csStars.updateWorld();

        this.sys.displayList.add(this.stars);
        this.renderStars();
    }

    public renderStars()
    {
        this.stars.clear();
        this.stars.fillStyle(0xFFFFFF);

        let world: any = this.csStars.world;

        let rng, i, x, y;

        let cellWidth: number = world.cameraGrid.cellWidth;
        let cellHeight: number = world.cameraGrid.cellHeight;

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