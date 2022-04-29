import SpaceGameObject from "../../gameObjects/space/SpaceGameObject";
import SpaceGrid from "../../scenes/space/SpaceGrid";
import SpaceScene from "../../scenes/space/SpaceScene";

export default class MapSystem
{
    private world: SpaceGrid;

    private staticRT: Phaser.GameObjects.RenderTexture;
    private rt: Phaser.GameObjects.RenderTexture;

    private backGraphics: Phaser.GameObjects.Graphics;

    public createMap(scene: Phaser.Scene, x: number, y: number, width: number, height: number)
    {
        this.world = (scene.scene.get("space") as SpaceScene).world;  
        this.staticRT = scene.add.renderTexture(x, y, width, height);

        this.rt = scene.add.renderTexture(x, y, width, height);

        const roundAmt = 40;

        const shape = scene.add.graphics();
        shape.fillStyle(0xFFFFFF);
        shape.beginPath();
        shape.fillRoundedRect(x, y, width, height, { tl: roundAmt, tr: 0, bl: 0, br: 0 });
        shape.setVisible(false);
        const mask = shape.createGeometryMask();

        this.staticRT.setMask(mask);
        this.rt.setMask(mask);

        const tint = 0x9CFFC1;
        this.staticRT.setTint(tint);
        this.rt.setTint(tint);

        const backGraphics = this.backGraphics = scene.add.graphics();
        backGraphics.fillStyle(0x000000);
        backGraphics.fillRoundedRect(x, y, width, height, { tl: roundAmt, tr: 0, bl: 0, br: 0 });
        backGraphics.setVisible(false);
        backGraphics.setMask(mask);
        backGraphics.setDepth(-1);
    }

    public updateMap(zoom: number, cam: Phaser.Cameras.Scene2D.Camera, 
        drawBackObjs: (rt: Phaser.GameObjects.RenderTexture, cam: Phaser.Cameras.Scene2D.BaseCamera, starZoom: number, relativeWidth: number, relativeHeight: number) => void)
    {
        const rt = this.rt;
        const camHalfWidth = cam.width * 0.5;
        const camHalfHeight = cam.height * 0.5;

        const visibleObjects: Array<Phaser.GameObjects.GameObject> = this.world.getObjectsInBox(
            cam.scrollX - camHalfWidth / zoom, 
            cam.scrollY - camHalfWidth / zoom, 
            cam.scrollX + camHalfHeight / zoom, 
            cam.scrollY + camHalfHeight / zoom
        );

        this.rt.clear();

        const rf = (1 - 1 / zoom);
    
        rt.camera.setZoom(zoom);
        rt.camera.scrollX = cam.scrollX + (cam.width - rt.camera.width * rf) / 2 - rt.camera.width * 0.5 / zoom;
        rt.camera.scrollY = cam.scrollY + (cam.height - rt.camera.height * rf) / 2 - rt.camera.height * 0.5 / zoom;

        rt.beginDraw();
 
        for(var i = 0; i < visibleObjects.length; i++)
        {
            const obj = visibleObjects[i] as SpaceGameObject;

            rt.batchDraw(obj, obj.x, obj.y);
        }

        rt.endDraw();

        this.staticRT.clear();

        if(zoom < 0.125)
        {
            this.backGraphics.setVisible(true);
            return;
        }

        this.backGraphics.setVisible(false);

        this.staticRT.beginDraw();

        const starZoom = 4;

        drawBackObjs(this.staticRT, this.rt.camera, starZoom, rf * cam.width, rf * cam.height);

        // const starZoom = 4;

        // for(var i = 0; i < starsTileSprites.length; i++)
        // {
        //     const tileSprite = starsTileSprites[i];

        //     tileSprite.setTileScale(zoom * starZoom);
        //     tileSprite.setTilePosition((rf * cam.width + rt.camera.scrollX * scrollValues[i]) / starZoom | 0, (rf * cam.height + rt.camera.scrollY * scrollValues[i]) / starZoom | 0);

        //     this.staticRT.batchDraw(tileSprite, tileSprite.x, tileSprite.y);
        // }

        this.staticRT.endDraw();
    }
}