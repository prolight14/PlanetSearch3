import SpaceGameObject from "../../gameObjects/space/SpaceGameObject";
import SpaceGrid from "../../scenes/space/SpaceGrid";
import SpaceScene from "../../scenes/space/SpaceScene";
import StarSceneControllerScene from "../../scenes/space/StarSceneControllerScene";
import ExplorationTracker from "./ExplorationTracker";

export default class MapExplorer
{
    constructor(scene: Phaser.Scene)
    {
        this.scene = scene;
        this.open = false;

        this.init();
    }

    private scene: Phaser.Scene;
    public open: boolean = false;
    
    private starsRT: Phaser.GameObjects.RenderTexture;
    private rt: Phaser.GameObjects.RenderTexture;
    private cam: Phaser.Cameras.Scene2D.Camera;

    private world: SpaceGrid;
    private starScene: StarSceneControllerScene;
    
    private spaceCam: Phaser.Cameras.Scene2D.Camera;
    private innerCam: Phaser.Cameras.Scene2D.Camera;
        
    private infoText: Phaser.GameObjects.Text;
    
    private background: Phaser.GameObjects.Graphics;

    public init()
    {
        const scene = this.scene;
        this.starScene = scene.scene.get("starSceneController") as StarSceneControllerScene;
        
        const spaceScene = (scene.scene.get("space") as SpaceScene);
        this.world = spaceScene.world;  
        const spaceCam = this.spaceCam = spaceScene.cameras.main;

        const mainCam = scene.cameras.main;

        const background = this.background = scene.add.graphics().setScrollFactor(0);
        background.fillStyle(0x000000);
        background.fillRect(0, 0, mainCam.width, mainCam.height);

        // The reference Camera
        this.innerCam = scene.cameras.add(0, 0, mainCam.x, mainCam.y).setVisible(false);
        this.innerCam.setScroll(spaceCam.scrollX, spaceCam.scrollY);

        this.starsRT = scene.add.renderTexture(0, 0, mainCam.width, mainCam.height).setScrollFactor(0);
        this.rt = scene.add.renderTexture(0, 0, mainCam.width, mainCam.height).setScrollFactor(0);

        this.infoText = scene.add.text(550, 20, "(?, ?)");


        this.initControls();
    }

    private updateStarsRT(cam: Phaser.Cameras.Scene2D.Camera, drawBackObjs: (
        rt: Phaser.GameObjects.RenderTexture, 
        cam: Phaser.Cameras.Scene2D.BaseCamera, 
        starZoom: number, 
        relativeWidth: number, 
        relativeHeight: number,
        layerAmt?: number,
        overrideScroll?: Array<number>
    ) => void)
    {
        const rt = this.starsRT;
        var rf = (1 - 1 / cam.zoom);

        rt.beginDraw();

            drawBackObjs(rt, cam, 4, rf * this.spaceCam.width, rf * this.spaceCam.height, 3);

        rt.endDraw();
    }

    private updateRT(zoom: number, scrollX: number, scrollY: number, cam: Phaser.Cameras.Scene2D.Camera)
    {
        const camHalfWidth = cam.width * 0.5;
        const camHalfHeight = cam.height * 0.5;

        const r_zoom = zoom * cam.zoom; 

        const visibleObjects: Array<Phaser.GameObjects.GameObject> = this.world.getObjectsInBox(
            scrollX - camHalfWidth / r_zoom, 
            scrollY - camHalfHeight / r_zoom, 
            scrollX + camHalfWidth / r_zoom, 
            scrollY + camHalfHeight / r_zoom
        );

        const rt = this.rt;

        this.rt.clear();

        const rf = (1 - 1 / zoom);
        const h_zoom = (zoom / 0.5);
    
        rt.camera.setZoom(zoom);
        rt.camera.scrollX = scrollX + (cam.width - rt.camera.width * rf) * 0.5 - rt.camera.width / h_zoom;
        rt.camera.scrollY = scrollY + (cam.height - rt.camera.height * rf) * 0.5 - rt.camera.height / h_zoom;

        rt.beginDraw();
    
            for(var i = 0; i < visibleObjects.length; i++)
            {
                const obj = visibleObjects[i] as SpaceGameObject;

                if(this.filterGameObject(obj))
                {
                    rt.batchDraw(obj, obj.x, obj.y);
                }
            }

        rt.endDraw();
    }

    private filterGameObject(obj: SpaceGameObject)
    {
        return (["planet", "sun", "nebula" , "shrapnel"].indexOf(obj._arrayName) !== -1);
    }

    public setMask(mask: Phaser.Display.Masks.GeometryMask)
    {
        this.rt.setMask(mask);
        this.starsRT.setMask(mask);
    }

    private setVisibility(visibility: boolean)
    {
        this.background.setVisible(visibility);
        this.rt.setVisible(visibility);
        this.starsRT.setVisible(visibility);
        this.infoText.setVisible(visibility);
    }

    public render()
    {
        if(!this.open)
        {
            this.setVisibility(false);
            return;
        }

        this.setVisibility(true);
        
        const starScene = this.starScene;

        this.updateStarsRT(this.innerCam, (...args: any[]) =>
        {
            starScene.updateToRenderTexture.apply(starScene, args);
        });

        const { zoom, scrollX, scrollY } = this.innerCam;
        this.updateRT(zoom, scrollX, scrollY, this.spaceCam);

        this.infoText.setText(`(${scrollX.toFixed(2)}, ${scrollY.toFixed(2)})`);
    }

    public getZoom(): number
    {
        return this.innerCam.zoom;
    }

    public getCamera(): Phaser.Cameras.Scene2D.BaseCamera
    {
        return this.innerCam;
    }

    public renderTracker(tracker: ExplorationTracker)
    {
        tracker.render(this.rt);
    }

    public update()
    {
        if(!this.open)
        {
            return;
        }

        this.updateControls();
    }
    
    private controlsSpeed: number;
    private keys: any;
    private resetZoomKey: Phaser.Input.Keyboard.Key;

    private initControls()
    {
        this.controlsSpeed = 10.0;

        this.keys = this.scene.input.keyboard.addKeys("W,A,S,D,LEFT,RIGHT,UP,DOWN,SPACE");

        this.innerCam.zoom = 1.0;

        this.scene.input.on('wheel', (pointer: Phaser.Input.Pointer, currentlyOver: any, dx: number, dy: number, dz: number) =>
        { 
            this.innerCam.zoom = Math.min(Math.max(this.innerCam.zoom * (1 - dy * 0.001), 0.005), 2.5);
        });

        this.resetZoomKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO);
    }

    private updateControls()
    {
        const innerCam = this.innerCam;
        const zoom = innerCam.zoom;

        if(this.keys.LEFT.isDown || this.keys.A.isDown)
        {
           innerCam.scrollX -= this.controlsSpeed / zoom;
        }
        if(this.keys.RIGHT.isDown || this.keys.D.isDown)
        {
           innerCam.scrollX += this.controlsSpeed / zoom;
        }
        if(this.keys.UP.isDown || this.keys.W.isDown)
        {
           innerCam.scrollY -= this.controlsSpeed / zoom;
        }
        if(this.keys.DOWN.isDown || this.keys.D.isDown)
        {
           innerCam.scrollY += this.controlsSpeed / zoom;
        }
        if(this.keys.SPACE.isDown)
        {
            innerCam.scrollX = this.spaceCam.scrollX;
            innerCam.scrollY = this.spaceCam.scrollY;
        }

        if(this.resetZoomKey.isDown)
        {
            this.innerCam.zoom = 1.0;
        }
    }
}