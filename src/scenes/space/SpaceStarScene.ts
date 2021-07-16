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
    }

    rt: Phaser.GameObjects.RenderTexture;

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
    }

    private renderStars()
    {
        var stars: Phaser.GameObjects.Graphics = this.stars; 

        stars.clear();
        stars.fillStyle(0xFFFFFF); 

        let world: any = this.csStars.world;

        let cellWidth: number = world.cameraGrid.cellWidth;
        let cellHeight: number = world.cameraGrid.cellHeight;

        var mainCam: Phaser.Cameras.Scene2D.Camera = this.cameras.main;

        let mainWorld = this.spaceScene.csp.world;

        var cspConfig = this.spaceScene.cspConfig;
    }
}