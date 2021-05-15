import SpaceCameraControllerScene from "./SpaceCameraControllerScene";
import SpaceScene from "./SpaceScene";

export default class SpaceStarScene extends Phaser.Scene
{
    private starsPerCell: number;
    private starSize: number;
    private starScroll: number;
    private csStars: any;

    public preload()
    {
        this.load.scenePlugin({
            key: "CartesianSystemPlugin",
            url: "./libraries/CartesianSystemPlugin.js",
            sceneKey: 'csStars'
        });
    }

    private spaceScene: SpaceScene;
    private spaceCameraControllerScene: SpaceCameraControllerScene;
    private subScrollX: number;
    private subScrollY: number;
    private stars: Phaser.GameObjects.Graphics;

    public create(data: { starsPerCell: number, starSize: number, starScroll: number })
    {
        this.starsPerCell = data.starsPerCell;
        this.starSize = data.starSize;
        this.starScroll = (!data.starScroll || data.starScroll <= 0) ? 1 : data.starScroll;

        this.spaceScene = this.scene.get("space") as SpaceScene;
        this.spaceCameraControllerScene = this.scene.get("spaceCameraController") as SpaceCameraControllerScene;
        this.csStars.initWorld(this.spaceScene.cspConfig);

        this.stars = this.add.graphics();

        var bounds = this.csStars.world.bounds;
        var width = bounds.maxX - bounds.minX;
        var height = bounds.maxY - bounds.minY;

        this.subScrollX = (width - width / this.starScroll) * this.starScroll;
        this.subScrollY = (height - height / this.starScroll) * this.starScroll;

        // this.blitter = this.add.blitter(0, 0, "blueStar0");

        // this.templateBlueStar0 = this.add.image(0, 0, "blueStar0");
        // this.grayNebula1 = this.add.image(0, 0, "grayNebula").setScale(13, 13);

        // this.rt = this.add.renderTexture(0, 0, (Number)(this.game.config.width), Number(this.game.config.height));
        // this.rt.draw(this.templateBlueStar0, 200, 200);
        // this.rt.clear();
        // this.rt.setScrollFactor(0);

        this.loadCellImages();
    }

    private loadCellImages()
    {
        this.starImg1 = this.add.image(0, 0, "blueStar0");

        let world: any = this.csStars.world;

        let cellWidth: number = world.cameraGrid.cellWidth;
        let cellHeight: number = world.cameraGrid.cellHeight;

        for(var i = 10; i >= 0; i--)
        {
            var texKey = "starCell" + this.scene.key + i.toString();

            var curRT = this.createCellImage(cellWidth, cellHeight, texKey);
            curRT.saveTexture(texKey);
            curRT.destroy();

            this.texKeys.push(texKey);
        }

        this.imgGroup = this.add.group();
    }  

    imgGroup: Phaser.GameObjects.Group;

    texKeys: Array<string> = [];
    starImg1: Phaser.GameObjects.Image;

    private createCellImage(cellWidth: number, cellHeight: number, seed?: number | string | undefined): Phaser.GameObjects.RenderTexture
    {
        if(seed === undefined) { seed = 0; }

        var rt = this.add.renderTexture(0, 0, cellWidth, cellHeight);

        var rng = new Phaser.Math.RandomDataGenerator([seed.toString()]);

        for(var i = 0, _l = rng.between(20, 110); i < _l; i++)
        { 
            rt.draw(this.starImg1, rng.frac() * cellWidth, rng.frac() * cellHeight);
        }

        return rt;
    }

    public update()
    {  
        var mainCam = this.spaceCameraControllerScene.cameras.main;
        var w = mainCam.width / 2;
        var h = mainCam.height / 2;

        var scrollX = mainCam.scrollX * this.starScroll - this.subScrollX - (w - w * this.starScroll);
        var scrollY = mainCam.scrollY * this.starScroll - this.subScrollY - (h - h * this.starScroll);

        var cam = this.cameras.main;

        cam.setScroll(scrollX, scrollY);
        cam.setZoom(mainCam.zoom);
        cam.setRoundPixels(true);
        cam.setAngle(this.spaceCameraControllerScene.getCameraAngle());

        this.setCSPCameraWindow();

        var follow: { x: number, y: number } = this.spaceScene.getCameraTarget();

        this.csStars.setFollow(
            follow.x * this.starScroll - this.subScrollX, 
            follow.y * this.starScroll - this.subScrollY
        );
        this.csStars.updateWorld();

        this.sys.displayList.add(this.stars);
        this.renderStars();
    }

    templateBlueStar0: Phaser.GameObjects.Image;
    rt: Phaser.GameObjects.RenderTexture;

    private renderStars()
    {
        var stars: Phaser.GameObjects.Graphics = this.stars;

        stars.clear();
        stars.fillStyle(0xFFFFFF);

        let world: any = this.csStars.world;

        let cellWidth: number = world.cameraGrid.cellWidth;
        let cellHeight: number = world.cameraGrid.cellHeight;

        this.imgGroup.clear(true, true);

        world.loopThroughVisibleCells((cell: object, col: number, row: number) =>
        {
            var rng = new Phaser.Math.RandomDataGenerator([(col + row).toString()]);

            this.imgGroup.create(col * cellWidth, row * cellHeight, this.texKeys[Math.floor(rng.frac() * this.texKeys.length)]);
        });
    }

    public setCSPCameraWindow()
    {
        var world = this.spaceScene.csp.world;
        this.csStars.world.camera.setWindow(
            world.camera.x, world.camera.y, world.camera.width, world.camera.height
        );
    }
}