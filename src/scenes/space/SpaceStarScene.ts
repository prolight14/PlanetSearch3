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

        // for(var i = 1; i >= 0; i--)
        // {
            var texKey = "starCell" + this.scene.key;

            // this.textures.addGLTexture(texKey, this.createCellImage(cellWidth, cellHeight, texKey).texture.getSourceImage());
    
            var curRT = this.createCellImage(cellWidth, cellHeight, texKey);
            curRT.saveTexture(texKey);
            curRT.destroy();

            this.texKey = texKey;

            // if(i === 0)
            // {
                
                // this.blitter = this.add.blitter(0, 0, texKey);
            // }
        // }

        this.imgGroup = this.add.group();

        // this.testImg1 = this.add.image(200, 200, texKey).setScrollFactor(0);
    }  

    imgGroup: Phaser.GameObjects.Group;

    texKey: string;
    // testImg1: Phaser.GameObjects.Image;
    starImg1: Phaser.GameObjects.Image;
    // cellImg1: Phaser.GameObjects.RenderTexture;  

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

    // blitter: Phaser.GameObjects.Blitter;

    // grayNebula1: Phaser.GameObjects.Image;

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
        
        // this.sys.displayList.add(this.testImg1);
        // this.sys.displayList.add(this.blitter);

        // this.rt.setScale(1 / mainCam.zoom);
        // this.rt.x = (-this.subScrollX);
        // this.rt.y = (-this.subScrollY);
        // this.sys.displayList.add(this.rt); 
    }

    templateBlueStar0: Phaser.GameObjects.Image;
    rt: Phaser.GameObjects.RenderTexture;

    private renderStars()
    {
        var stars: Phaser.GameObjects.Graphics = this.stars;

        stars.clear();
        stars.fillStyle(0xFFFFFF);

        let world: any = this.csStars.world;

        // let rng, i, x, y;

        let cellWidth: number = world.cameraGrid.cellWidth;
        let cellHeight: number = world.cameraGrid.cellHeight;

        // this.rt.clear();
        // var cam = this.cameras.main;

        // this.blitter.clear();
        // this.blitter.setScale(1, 1);
        // this.blitter.rotation = 0;
        this.imgGroup.clear(true, true);

        world.loopThroughVisibleCells((cell: object, col: number, row: number) =>
        {
            this.imgGroup.create(col * cellWidth, row * cellHeight, this.texKey);

            // var bb = this.blitter.create(col * cellWidth, row * cellHeight);

            // bb.resetFlip();

            // this.blitter.
            // Will use later:
            // this.blitter.setTexture

            // rng = new Phaser.Math.RandomDataGenerator([(col + row).toString()]);



            // x = col * cellWidth;
            // y = row * cellHeight;



            // for(i = 0; i < this.starsPerCell; i++)
            // {
            //     // stars.fillRect(Math.floor(x + rng.between(0, cellWidth)), Math.floor(y + rng.between(0, cellHeight)), this.starSize, this.starSize);

            //     // this.blitter.create(Math.floor(x + rng.between(0, cellWidth)), Math.floor(y + rng.between(0, cellHeight)));
            // }

            // if(rng.frac() < 0.5) 
            // {
                // this.rt.draw(this.grayNebula1, x - cam.scrollX, y - cam.scrollY);
            // }
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