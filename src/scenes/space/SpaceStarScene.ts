import SpaceScene from "./SpaceScene";

export default class SpaceStarScene extends Phaser.Scene
{
    private starsPerCell: number;
    private starSize: number;
    private starScroll: number;
    private csStars: any;

    constructor()
    {
        super("spaceStar");
    }

    public preload()
    {
        this.load.scenePlugin({
            key: "CartesianSystemPlugin",
            url: "./libraries/CartesianSystemPlugin.js",
            sceneKey: 'csStars'
        });
    }

    private spaceScene: SpaceScene;
    private subScrollX: number;
    private subScrollY: number;
    private stars: Phaser.GameObjects.Graphics;

    public create(data: any)
    {
        this.starsPerCell = 200;
        this.starSize = 2;
        this.starScroll = 1;

        this.spaceScene = this.scene.get("space") as SpaceScene;
        this.csStars.initWorld(this.spaceScene.cspConfig);

        this.stars = this.add.graphics();

        var bounds = this.csStars.world.bounds;
        var width = bounds.maxX - bounds.minX;
        var height = bounds.maxY - bounds.minY;

        this.subScrollX = (width - width / this.starScroll) * this.starScroll;
        this.subScrollY = (height - height / this.starScroll) * this.starScroll;
    }

    public update()
    {  
        var scrollX = this.spaceScene.playerShip.x * this.starScroll - this.subScrollX;
        var scrollY = this.spaceScene.playerShip.y * this.starScroll - this.subScrollY;

        this.csStars.setFollow(scrollX, scrollY);
        this.csStars.updateWorld();

        this.renderStars();
        this.sys.displayList.add(this.stars);
    }

    private renderStars()
    {
        var stars: Phaser.GameObjects.Graphics = this.stars;

        stars.clear();
        stars.fillStyle(0xFFFFFF);

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
                stars.fillRect(x + rng.between(0, cellWidth), y + rng.between(0, cellHeight), this.starSize, this.starSize);
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