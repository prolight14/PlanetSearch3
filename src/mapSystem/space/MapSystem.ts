import SpaceGameObject from "../../gameObjects/space/SpaceGameObject";
import SpaceGrid from "../../scenes/space/SpaceGrid";
import SpaceScene from "../../scenes/space/SpaceScene";

import StarSceneControllerScene from "../../scenes/space/StarSceneControllerScene";

export default class MapSystem
{
    private world: SpaceGrid;
    private rt: Phaser.GameObjects.RenderTexture;
    private backGraphics: Phaser.GameObjects.Graphics;

    public createMap(scene: Phaser.Scene, x: number, y: number, width: number, height: number)
    {
        this.world = (scene.scene.get("space") as SpaceScene).world;
            
        this.backGraphics = scene.add.graphics();
        // this.backGraphics.lineStyle(3, 0x1A6EB3);
        // this.backGraphics.strokeRoundedRect(x, y, width, height, { tl: 20, tr: 0, bl: 0, br: 0 });
        // this.backGraphics.lineStyle(1, 0x1A6EB3);
        // this.backGraphics.lineBetween(x + width / 2, y, x + width / 2, y + height);
        // this.backGraphics.lineBetween(x, y + height / 2, x + width, y + height / 2);
        this.backGraphics.fillStyle(0x000000);
        this.backGraphics.fillRoundedRect(x, y, width, height, { tl: 20, tr: 0, bl: 0, br: 0 });

        this.rt = scene.add.renderTexture(x, y, width, height);
    }

    public updateMap(cam: Phaser.Cameras.Scene2D.Camera, starsTileSprites: Array<Phaser.GameObjects.TileSprite>)
    {
        const rt = this.rt;
        const camHalfWidth = cam.width * 0.5;
        const camHalfHeight = cam.height * 0.5;

        const zoom = 0.175;

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

        for(var i = 0; i < starsTileSprites.length; i++)
        {
            const tileSprite = starsTileSprites[i];

            rt.batchDraw(tileSprite, tileSprite.x, tileSprite.y);
        }

        rt.endDraw();
    }
}