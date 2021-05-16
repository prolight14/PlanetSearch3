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

        this.loadCellImages();

        this.rt = this.add.renderTexture(0, 0, this.spaceScene.cspConfig.window.width, this.spaceScene.cspConfig.window.height).setScrollFactor(0);

        this.rt.draw(this.texKeys[0], 0, 0);

        // var mainCam = this.spaceCameraControllerScene.cameras.main;

        // this.rt.camera.setScroll(mainCam.scrollX, mainCam.scrollY);
        // this.rt.camera.setZoom(mainCam.zoom);
        // this.rt.camera.setAngle(this.spaceCameraControllerScene.getCamAngle());
    }

    rt: Phaser.GameObjects.RenderTexture;

    private loadCellImages()
    {
        this.starImages.push(this.add.image(0, 0, "blueStar0"));
        
        let world: any = this.csStars.world;

        let cellWidth: number = world.cameraGrid.cellWidth;
        let cellHeight: number = world.cameraGrid.cellHeight;

        for(var i = (this.spaceScene.quickLoad ? 1 : 10); i >= 0; i--)
        {
            var texKey = "starCell" + this.scene.key + i.toString();

            var curRT = this.createCellImage(cellWidth, cellHeight, texKey);
            curRT.saveTexture(texKey);
            curRT.destroy();

            this.texKeys.push(texKey);
        }
    }  

    imgList: Array<Phaser.GameObjects.Image> = [];
    starImages: Array<Phaser.GameObjects.Image> = [];
    texKeys: Array<string> = [];
    starImg1: Phaser.GameObjects.Image;

    private createCellImage(cellWidth: number, cellHeight: number, seed?: number | string | undefined): Phaser.GameObjects.RenderTexture
    {
        if(seed === undefined) { seed = 0; }

        var rt = this.add.renderTexture(0, 0, cellWidth, cellHeight);

        var rng = new Phaser.Math.RandomDataGenerator([seed.toString()]);

        for(var i = 0, _l = rng.between(20, 110); i < _l; i++)
        { 
            rt.draw(this.starImages[0], rng.frac() * cellWidth, rng.frac() * cellHeight);
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

        var world = this.spaceScene.csp.world;
        this.csStars.world.camera.setWindow(
            world.camera.x, world.camera.y, world.camera.width + Math.floor(world.camera.width / mainCam.zoom), world.camera.height + Math.floor(world.camera.height / mainCam.zoom)
        );

        var follow: { x: number, y: number } = this.spaceScene.getCameraTarget();

        this.csStars.setFollow(
            follow.x * this.starScroll - this.subScrollX,  
            follow.y * this.starScroll - this.subScrollY
        );
        this.csStars.updateWorld();

        this.sys.displayList.add(this.stars);
        this.renderStars();

        this.sys.displayList.add(this.rt);
    }

    private renderStars()
    {
        var stars: Phaser.GameObjects.Graphics = this.stars;

        stars.clear();
        stars.fillStyle(0xFFFFFF);

        let world: any = this.csStars.world;

        let cellWidth: number = world.cameraGrid.cellWidth;
        let cellHeight: number = world.cameraGrid.cellHeight;

        // for(var i = this.imgList.length - 1; i >= 0; i--)
        // {
        //     this.imgList[i].destroy();
        //     this.imgList.pop();
        // }

        // this.rt.clear();

        // this.rt.beginDraw();

        world.loopThroughVisibleCells((cell: object, col: number, row: number) =>
        {
            var rng = new Phaser.Math.RandomDataGenerator([(col + row).toString()]);

            // var img = this.add.image(col * cellWidth, row * cellHeight, this.texKeys[Math.floor(rng.frac() * this.texKeys.length)]);

            // this.imgList.push(img);

            // this.rt.batchDraw(this.texKeys[Math.floor(rng.frac() * this.texKeys.length)], col * cellWidth, row * cellHeight);
        });

        // this.rt.endDraw();
    }
}