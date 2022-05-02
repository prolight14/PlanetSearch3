import SpaceGameObject from "../../gameObjects/space/SpaceGameObject";
import timer from "../../gameObjects/Utils/timer";
import SpaceScene from "../../scenes/space/SpaceScene";
import MapExplorer from "./MapExplorer";

export default class ExplorationTracker 
{
    constructor(scene: Phaser.Scene)
    {
        this.scene = scene;
        this.spaceScene = scene.scene.get("space") as SpaceScene;

        this.reset();

        this.graphics = scene.add.graphics();
    }

    private graphics: Phaser.GameObjects.Graphics;

    private updateTrackTimer: {
        update: () => void;
        reset: (time?: number) => void;
    }

    private scene: Phaser.Scene;
    private spaceScene: SpaceScene;

    private track: Array<Phaser.Math.Vector2>;
    private path: Phaser.Curves.Path;

    public active: boolean = true;

    public reset()
    {
        this.track = [];

        this.updateTrackTimer = timer(true, 100, () =>
        {
            this.updateTrack();

            this.updateTrackTimer.reset();
        });

        this.path = new Phaser.Curves.Path();
        const world = this.spaceScene.world;
        const trackingObj = world.get.gameObject("playerShip", 0) as SpaceGameObject;
        this.path.moveTo(trackingObj.body.position.x, trackingObj.body.position.y);

        this.active = true;

        // this.setupMaskGenerator();
    }

    public update()
    {
        if(!this.active)
        {
            return;
        }

        this.updateTrackTimer.update();
    }

    public render(rt: Phaser.GameObjects.RenderTexture)
    {
        if(!this.active)
        {
            return;
        }

        this.renderTracks(rt);
    }

    private renderTracks(rt: Phaser.GameObjects.RenderTexture)
    {
        const graphics = this.graphics;
        const path = this.path;

        graphics.clear();
        graphics.lineStyle(6, 0x00FF00, 1.0);
        path.draw(graphics);

        rt.draw(graphics);
    }

    private cullViewport: {
        width: number,
        height: number,
        halfWidth: number,
        halfHeight: number
    };

    public setDiscoverViewport(width: number, height: number)
    {
        this.cullViewport = {
            width: width,
            height: height,
            halfWidth: width * 0.5,
            halfHeight: height * 0.5,
        };
    }

    public hasBeenUncovered(object: SpaceGameObject): boolean
    {
        const track = this.track;
        const view = this.cullViewport;
        const objBounds = object.getBounds();

        for(var i = 0; i < track.length; i++)
        {
            const point = track[i];
            const viewport = new Phaser.Geom.Rectangle(point.x - view.halfWidth, point.y - view.halfHeight, view.width, view.height);
            
            if(Phaser.Geom.Rectangle.Overlaps(viewport, objBounds))
            {
                return true;
            }
        }

        return false;
    }

    private updateTrack()
    {
        const world = this.spaceScene.world;
        const trackingObj = world.get.gameObject("playerShip", 0) as SpaceGameObject;

        this.addToTrack(trackingObj.x, trackingObj.y);
    }

    // public mask: Phaser.Display.Masks.GeometryMask;

/*    public _generateMask(cam: Phaser.Cameras.Scene2D.Camera)
    {
        // const shape = this.scene.make.graphics({}, false);

        // shape.fillStyle(0xFFFFFF);
        // shape.beginPath();

        // // shape.fillRect(360, 175, 80, 50);

        // var { halfWidth: v_halfWidth, halfHeight: v_halfHeight, width: v_width, height: v_height } = this.cullViewport;

        // const rzoomn = cam.zoom;
        // v_halfWidth /= rzoomn;
        // v_halfHeight /= rzoomn;
        // v_width /= rzoomn;
        // v_height /= rzoomn;

        // const track = this.track;

        // for(var i = 0; i < track.length; i++)
        // {
        //     const point = track[i];

        //     shape.fillRect(
        //         point.x - v_halfWidth - cam.scrollX, 
        //         point.y - v_halfHeight - cam.scrollY, 
        //         v_width, 
        //         v_height
        //     );
        // }

        // const mask = shape.createGeometryMask();
        
        // this.mask = mask;
    }

    private rt: Phaser.GameObjects.RenderTexture;
    private shapeGraphics: Phaser.GameObjects.Graphics;

    private setupMaskGenerator()
    {
        const scene = this.scene;

        const camWidth = scene.cameras.main.width
        const camHeight = scene.cameras.main.height;

        this.rt = scene.scene.get("entry").add.renderTexture(camWidth, camHeight, camWidth, camHeight).setDepth(200).setScrollFactor(0).setOrigin(0);
        scene.scene.bringToTop("entry");
        this.shapeGraphics = scene.add.graphics().setDepth(200).setScrollFactor(0);

        this.generateViewTexture();
    }

    private generateViewTexture()
    {
        const graphics = this.scene.add.graphics();

        graphics.fillStyle(0xFFFFFF);

        const v_halfWidth = 250 * 0.4;
        const v_halfHeight = 250 * 0.4;
        const v_width = 500 * 0.4;
        const v_height = 500 * 0.4;

        graphics.fillRect(v_halfWidth, v_halfHeight, v_width, v_height);

        graphics.generateTexture("explore_mask_view", v_width, v_height);

        graphics.destroy();
    }

    /*public generateMask(cam: Phaser.Cameras.Scene2D.BaseCamera)
    {          
        const points = this.getPointsInView();

        // const v_halfWidth = 250 * 0.2;
        // const v_halfHeight = 250 * 0.2;
        // const v_width = 500 * 0.2;
        // const v_height = 500 * 0.2;
        
        // const shape = this.shapeGraphics;
        // shape.clear();
        // shape.fillStyle(0xFFFFFF);
        // // shape.beginPath();
      
        // for(var i = 0; i < points.length; i++)
        // {
        //     const px = points[i].x;
        //     const py = points[i].y;

        //     shape.fillRect(
        //         px - v_halfWidth, 
        //         py - v_halfHeight, 
        //         v_width, 
        //         v_height
        //     );
        // }

        this.rt.clear();

        const v_halfWidth = 250 * 0.4;
        const v_halfHeight = 250 * 0.4;

        this.rt.beginDraw(); 
            for(var i = 0; i < points.length; i++)
            {
                const px = points[i].x;// - cam.scrollX;
                const py = points[i].y;// - cam.scrollY;

                // const rect = new Phaser.GameObjects.Rectangle
                // ( 
                //     this.scene.scene.get("entry"),
                //     px - v_halfWidth,   
                //     py - v_halfHeight, 
                //     v_width, 
                //     v_height,
                //     0xFFFFFF
                // );

                // // cam.ignore(rect);

                // rect.setScrollFactor(0).setActive(false).setVisible(true);



                // this.rt.batchDraw(rect);

                this.rt.batchDraw("explore_mask_view", px - v_halfWidth, py - v_halfHeight);
            }
        this.rt.endDraw();
        
        if(cam !== undefined)
        {
            this.setRTCamera(cam);
        }

        const shape = this.shapeGraphics;
        shape.clear();
        shape.clearMask();
        shape.setVisible(true);

        this.mask = this.rt.createGeometryMask(shape);

        // this.mask = shape.createGeometryMask();

        // this.rt.setVisible(false);

        // this.mask = shape.mask as Phaser.Display.Masks.GeometryMask;



        // // shape.closePath();

        // if(cam !== undefined)
        // {
        //     this.setRTCamera(cam);
        // }

        // this.rt.clear();

        // this.rt.beginDraw();

        //     this.rt.batchDraw(shape, shape.x, shape.y);

        // this.rt.endDraw();
    }
    */
    // public setRTCamera(cam: Phaser.Cameras.Scene2D.BaseCamera)
    // {
    //     this.rt.camera.setZoom(cam.zoom);
    //     this.rt.camera.x = -cam.scrollX;
    //     this.rt.camera.y = -cam.scrollY;
    // }

    // private getPointsInView(view?: any | undefined)
    // {
    //     return this.track;
    // }

    // public applyMask(object: { setMask: (mask: Phaser.Display.Masks.GeometryMask ) => void; })
    // {
    //     object.setMask(this.mask);
    // }

    private addToTrack(x: number, y: number)
    {
        x |= 0;
        y |= 0;

        if(this.track.length !== 0)
        {
            const trackEnd = this.track[this.track.length - 1];

            if(trackEnd.x === x && trackEnd.y === y)
            {
                return;
            }
        }

        this.track.push(new Phaser.Math.Vector2(x, y));

        this.path.lineTo(x, y);

        // this.generateMask();
    }

    // private geomMask: Phaser.Display.Masks.GeometryMask;

    // public generateMask(): Phaser.Display.Masks.GeometryMask
    // {
    //     const shape = this.scene.make.graphics({}, false);

    //     shape.fillStyle(0xFFFFFF);
    //     shape.beginPath();

    //     const track = this.track;
    //     const view = this.cullViewport;

    //     for(var i = 0; i < track.length; i++)
    //     {
    //         shape.fillRect(track[i].x - view.halfWidth, track[i].y - view.halfHeight, view.width, view.height);
    //     }

    //     return (this.geomMask = shape.createGeometryMask());
    // }

    // public applyMask(object: { setMask: (mask: Phaser.Display.Masks.GeometryMask ) => void; })
    // {
    //     object.setMask(this.geomMask);
    // }
}