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
    
    public create(data: { 

        starsPerCell: number, 
        starSize: number, 
        starScroll: number, 
        imageKey: string, 

        cspConfig?: { 
            window: {
                width: number,
                height: number
            },
            grid: {
                cols: number,
                rows: number,
                cellWidth: number,
                cellHeight: number
            }
        } 
    })
    {
        this.starsPerCell = data.starsPerCell;
        this.starSize = data.starSize;
        this.starScroll = (!data.starScroll || data.starScroll <= 0) ? 1 : data.starScroll;

        this.spaceScene = this.scene.get("space") as SpaceScene;
        this.spaceCameraControllerScene = this.scene.get("spaceCameraController") as SpaceCameraControllerScene;
        this.csStars.initWorld(data.cspConfig || this.spaceScene.cspConfig);

        var bounds = this.csStars.world.bounds;
        var width = bounds.maxX - bounds.minX;
        var height = bounds.maxY - bounds.minY;

        this.subScrollX = (width - width / this.starScroll) * this.starScroll;
        this.subScrollY = (height - height / this.starScroll) * this.starScroll;
        
        this.stars = this.add.graphics();
         
        this.rt = this.add.renderTexture(0, 0, this.game.config.width as number, this.game.config.height as number);
        this.cameras.main.ignore(this.rt);
        this.starImage = this.add.image(0, 0, data.imageKey).setScale(2, 2);
        
        this.frontCamera = this.cameras.add();
        this.frontCamera.setOrigin(0, 0);
        this.frontCamera.ignore(this.rt);
        this.frontCamera.startFollow(this.cameras.main);

        this.cameras.add();

        this.tileStarImage();

        this.cellGraphics = this.add.graphics();
    }

    private tileStarImage()
    {
        var cellWidth = this.csStars.world.cameraGrid.cellWidth;
        var cellHeight = this.csStars.world.cameraGrid.cellHeight;

        var cellImageRT = this.add.renderTexture(0, 0, cellWidth, cellHeight);

        cellImageRT.beginDraw();

        for(var x = 0; x < cellWidth; x += this.starImage.displayWidth)
        {
            for(var y = 0; y < cellHeight; y += this.starImage.displayHeight)
            {
                cellImageRT.batchDraw(this.starImage, x, y);
            }
        }

        cellImageRT.endDraw();

        this.cellImageRT = cellImageRT;
    }

    private cellImageRT: Phaser.GameObjects.RenderTexture;
    private rt: Phaser.GameObjects.RenderTexture;
    private frontCamera: Phaser.Cameras.Scene2D.Camera;

    private starImage: Phaser.GameObjects.Image;

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
            world.camera.x, 
            world.camera.y, 
            world.camera.width + Math.floor(world.camera.width / mainCam.zoom),
            world.camera.height + Math.floor(world.camera.height / mainCam.zoom)
        );

        var follow: { x: number, y: number } = this.spaceScene.getCameraTarget();

        this.csStars.setFollow(
            follow.x * this.starScroll - this.subScrollX,  
            follow.y * this.starScroll - this.subScrollY
        );
        this.csStars.updateWorld();

        this.showGrid();
        // this.sys.displayList.add(this.stars);
        this.sys.displayList.add(this.rt);
        this.sys.displayList.add(this.cellGraphics);
        this.renderStars();


        this.frontCamera.zoom = cam.zoom;
    }


    private stars: Phaser.GameObjects.Graphics;

    private renderStars()
    {
        let world: any = this.csStars.world;
        let mainCam: Phaser.Cameras.Scene2D.Camera = this.cameras.main;

        let cellWidth: number = world.cameraGrid.cellWidth;
        let cellHeight: number = world.cameraGrid.cellHeight;

        this.rt.camera.x = -this.frontCamera.scrollX * this.frontCamera.zoom;
        this.rt.camera.y = -this.frontCamera.scrollY * this.frontCamera.zoom;
        this.rt.camera.zoom = this.frontCamera.zoom;
        this.rt.camera.setAngle((this.scene.get("spaceCameraController") as SpaceCameraControllerScene).getCameraAngle());

        this.rt.clear();
        this.rt.beginDraw();

        world.loopThroughVisibleCells((cell: object, col: number, row: number) =>
        {
            this.rt.batchDraw(this.cellImageRT, Math.floor(col * cellWidth - mainCam.scrollX), Math.floor(row * cellHeight - mainCam.scrollY));
        });

        this.rt.endDraw();
    }

    private cellGraphics: Phaser.GameObjects.Graphics;

    private showGrid()
    {
        this.cellGraphics.clear();

        this.cellGraphics.lineStyle(2, 0x549431, 1.0);
        
        let world: any = this.csStars.world;
        let cellWidth: number = world.cameraGrid.cellWidth;
        let cellHeight: number = world.cameraGrid.cellHeight;

        world.loopThroughVisibleCells((cell: object, col: number, row: number) =>
        {
            this.cellGraphics.strokeRect(col * cellWidth, row * cellHeight, cellWidth, cellHeight);
        });
    }
}