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

        if(!this.textures.exists("backstars1"))
        {
            this.load.image("backstars1", "./assets/Space/Stars/backstars1.png");
        }
    }

    private spaceScene: SpaceScene;
    private spaceCameraControllerScene: SpaceCameraControllerScene;
    private subScrollX: number;
    private subScrollY: number;
    
    public create(data: { starsPerCell: number, starSize: number, starScroll: number })
    {
        this.starsPerCell = data.starsPerCell;
        this.starSize = data.starSize;
        this.starScroll = (!data.starScroll || data.starScroll <= 0) ? 1 : data.starScroll;

        this.spaceScene = this.scene.get("space") as SpaceScene;
        this.spaceCameraControllerScene = this.scene.get("spaceCameraController") as SpaceCameraControllerScene;
        this.csStars.initWorld(this.spaceScene.cspConfig);

        var bounds = this.csStars.world.bounds;
        var width = bounds.maxX - bounds.minX;
        var height = bounds.maxY - bounds.minY;

        this.subScrollX = (width - width / this.starScroll) * this.starScroll;
        this.subScrollY = (height - height / this.starScroll) * this.starScroll;
        
        this.stars = this.add.graphics();
        
        const screenWidth: number = this.game.config.width as number;
        const screenHeight: number = this.game.config.height as number;
        
        
        this.rt = this.add.renderTexture(0, 0, screenWidth, screenHeight);
        // this.rt.setScrollFactor(0, 0);
        this.cameras.main.ignore(this.rt);
        this.backstars1 = this.add.image(0, 0, "backstars1");
        
        // this.cameras.main.ignore(this.rt);
        this.frontCamera = this.cameras.add();
        this.frontCamera.setOrigin(0, 0);
        // this.frontCamera.x = -400;
        // this.frontCamera.y = -400;
        this.frontCamera.ignore(this.rt);
        this.frontCamera.startFollow(this.cameras.main);

        this.backCamera = this.cameras.add(0, 0, screenWidth, screenHeight);
    }

    private frontCamera: Phaser.Cameras.Scene2D.Camera;
    private backCamera: Phaser.Cameras.Scene2D.Camera;

    private rt: Phaser.GameObjects.RenderTexture
    private backstars1: Phaser.GameObjects.Image;

    public update()
    {  
        let mainCam = this.spaceCameraControllerScene.cameras.main;
        let w: number = mainCam.width / 2;
        let h: number = mainCam.height / 2;

        let scrollX = mainCam.scrollX * this.starScroll - this.subScrollX - (w - w * this.starScroll);
        let scrollY = mainCam.scrollY * this.starScroll - this.subScrollY - (h - h * this.starScroll);

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
        this.sys.displayList.add(this.rt);
        this.renderStars();

        this.frontCamera.zoom = cam.zoom;
        // this.frontCamera.setA = cam.zoom;

    }


    private stars: Phaser.GameObjects.Graphics;

    private renderStars()
    {
        // Performance ideas:
        // 1. Try rendering only 1 star layer
        // 2. Try rendering an image of stars instead of indiviual points
        // var stars: Phaser.GameObjects.Graphics = this.stars;

        // stars.clear();
        // stars.fillStyle(0xFFFFFF);

        let world: any = this.csStars.world;
        let mainCam: Phaser.Cameras.Scene2D.Camera = this.cameras.main;

        // let rng, i, x, y;

        let cellWidth: number = world.cameraGrid.cellWidth;
        let cellHeight: number = world.cameraGrid.cellHeight;

        // const screenWidth: number = this.game.config.width as number;
        // const screenHeight: number = this.game.config.height as number;

        // this.rt.displayWidth = this.rt.width = mainCam.displayWidth * 2;//setScale(mainCam.displayWidth / screenWidth, mainCam.displayHeight / screenHeight);
        // this.rt.displayHeight = this.rt.height = mainCam.displayHeight * 2;
        // this.rt.resize(mainCam.displayWidth, mainCam.displayHeight);
        // this.rt.setOrigin(0, 0);
        // this.rt.x = -1000;
        // this.rt.x = this.subScrollX * 0.25;
        // this.rt.y = this.subScrollY * 0.25;

        this.rt.camera.x = -this.frontCamera.scrollX * this.frontCamera.zoom;//-this.frontCamera.scrollX;
        this.rt.camera.y = -this.frontCamera.scrollY * this.frontCamera.zoom;//-this.frontCamera.scrollY;
        // this.rt.camera.width = mainCam.width * this.frontCamera.zoom;
        // this.rt.camera.height = mainCam.height * this.frontCamera.zoom;
        this.rt.camera.zoom = this.frontCamera.zoom;
        this.rt.camera.setAngle((this.scene.get("spaceCameraController") as SpaceCameraControllerScene).getCameraAngle());

        this.rt.clear();
        this.rt.beginDraw();

        world.loopThroughVisibleCells((cell: object, col: number, row: number) =>
        {
            // rng = new Phaser.Math.RandomDataGenerator([col.toString() + row.toString()]);

            // x = col * cellWidth;
            // y = row * cellHeight;

            // for(i = 0; i < this.starsPerCell; i++)
            // {
            //     stars.fillRect(x + rng.between(0, cellWidth), y + rng.between(0, cellHeight), this.starSize, this.starSize);
            // }

            this.rt.batchDraw(this.backstars1, Math.floor(col * cellWidth - mainCam.scrollX), Math.floor(row * cellHeight - mainCam.scrollY));
            this.rt.batchDraw(this.backstars1, Math.floor(col * cellWidth - mainCam.scrollX) + 300, Math.floor(row * cellHeight - mainCam.scrollY));
            this.rt.batchDraw(this.backstars1, Math.floor(col * cellWidth - mainCam.scrollX), Math.floor(row * cellHeight - mainCam.scrollY) + 300);
            this.rt.batchDraw(this.backstars1, Math.floor(col * cellWidth - mainCam.scrollX) + 300, Math.floor(row * cellHeight - mainCam.scrollY) + 300);
            // this.rt.draw("backstars1", Math.floor(col * cellWidth - mainCam.scrollX), Math.floor(row * cellHeight - mainCam.scrollY));

            // this.rt.batchDraw(this.backstars1, Math.floor(col * cellWidth), Math.floor(row * cellHeight));
            // this.rt.batchDraw(this.backstars1, Math.floor(col * cellWidth) + 300, Math.floor(row * cellHeight));
            // this.rt.batchDraw(this.backstars1, Math.floor(col * cellWidth), Math.floor(row * cellHeight) + 300);
            // this.rt.batchDraw(this.backstars1, Math.floor(col * cellWidth) + 300, Math.floor(row * cellHeight) + 300);

        });

        this.rt.endDraw();

    }
}