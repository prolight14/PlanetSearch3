export default class SpaceCameraControllerScene extends Phaser.Scene
{
    constructor()
    {
        super("spaceCameraController");
    }

    create()
    {
        var cam = this.cameras.main;

        var spaceScene: Phaser.Scene = this.scene.get("space");
        var spaceDebugScene: Phaser.Scene = this.scene.get("spaceDebug");
        var spaceStarScene: Phaser.Scene = this.scene.get("spaceStar");

        this.input.on('wheel', (pointer: any, currentlyOver: any, dx: number, dy: number, dz: number) =>
        { 
            cam.setZoom(Math.min(Math.max(cam.zoom - dy * 0.001, 0.34), 1.5));

            spaceScene.cameras.main.setZoom(cam.zoom);
            spaceDebugScene.cameras.main.setZoom(cam.zoom);
            spaceStarScene.cameras.main.setZoom(cam.zoom);
        });
    }

    update ()
    {
        var spaceCam = this.scene.get("space").cameras.main;

        this.scene.get("spaceStar").cameras.main.setScroll(spaceCam.scrollX, spaceCam.scrollY);
        this.scene.get("spaceDebug").cameras.main.setScroll(spaceCam.scrollX, spaceCam.scrollY);
    }
}