import SpaceScene from "./SpaceScene";
import SpaceDebugScene from "./SpaceDebugScene";

export default class SpaceCameraControllerScene extends Phaser.Scene
{
    constructor()
    {
        super("spaceCameraController");
    }

    private spaceScene: SpaceScene;
    private spaceDebugScene: SpaceDebugScene;
    private keys: {
        rotateLeft: Phaser.Input.Keyboard.Key,
        rotateRight: Phaser.Input.Keyboard.Key,
        rotateReset: Phaser.Input.Keyboard.Key
    };
    private camAngle: number;
    private angleSpeed: number;

    public create()
    {
        this.spaceScene = this.scene.get("space") as SpaceScene;
        this.spaceDebugScene = this.scene.get("spaceDebug") as SpaceDebugScene;

        this.input.on('wheel', (pointer: Phaser.Input.Pointer, currentlyOver: any, dx: number, dy: number, dz: number) =>
        { 
            var cam = this.cameras.main;

            this.updateZoom(Math.min(Math.max(cam.zoom - dy * 0.001, 0.2), 4));

        });

        this.keys = {
            rotateLeft: this.input.keyboard.addKey('a'),
            rotateRight: this.input.keyboard.addKey('d'),
            rotateReset: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO)
        };

        this.camAngle = 0;
        this.angleSpeed = 2;

        this.updateZoom(1);
    }
   
    public getCameraAngle(): number
    {
        return this.camAngle;
    }

    public updateZoom(zoom: number)
    {
        var cam = this.cameras.main;

        cam.setZoom(zoom);

        this.spaceScene.cameras.main.setZoom(cam.zoom);
        this.spaceDebugScene.cameras.main.setZoom(cam.zoom);

        cam.roundPixels = true;
        this.spaceDebugScene.cameras.main.setRoundPixels(true);

        this.resizeCSPCameraWindow();
    }

    private adjustCameraAngle(angle: number)
    {
        this.cameras.main.setAngle(angle);

        this.spaceScene.cameras.main.setAngle(angle);
        this.spaceDebugScene.cameras.main.setAngle(angle);

        this.resizeCSPCameraWindow();
    }

    public update ()
    {
        var cam = this.cameras.main;

        var cameraTarget: { x: number, y: number } = this.spaceScene.getCameraTarget();

        var spaceCam = this.spaceScene.cameras.main;
        cam.setScroll(spaceCam.scrollX, spaceCam.scrollY);
        this.spaceDebugScene.cameras.main.setScroll(cam.scrollX, cam.scrollY);

        if(this.keys.rotateLeft.isDown)
        {
            this.camAngle -= this.angleSpeed;
            this.adjustCameraAngle(this.camAngle);
        }
        if(this.keys.rotateRight.isDown)
        {
            this.camAngle += this.angleSpeed;
            this.adjustCameraAngle(this.camAngle);
        }
        if(this.keys.rotateReset.isDown)
        {
            this.camAngle = 0;
            this.adjustCameraAngle(this.camAngle);

            this.updateZoom(1);
        }
    }

    private resizeCSPCameraWindow ()
    {
        const world: any = this.spaceScene.csp.world;
        const cspConfig = this.spaceScene.cspConfig;
        const cam = this.cameras.main;

        var c_width = cspConfig.window.width;
        var c_height = cspConfig.window.height;

        // if(cam.zoom > 1)
        // {
        //     return world.camera.setWindow(
        //         0,
        //         0,
        //         c_width,
        //         c_height
        //     );
        // }

        var x = Math.abs(c_width - c_width / cam.zoom) / -2;
        var y = Math.abs(c_height - c_height / cam.zoom) / -2;
        var width = c_width / cam.zoom + x * -2;
        var height = c_height / cam.zoom + y * -2;

        var prev_width: number = Math.abs(x) + width;
        var prev_height: number = Math.abs(y) + height;
        var prev_halfWidth = prev_width / 2;
        var prev_halfHeight = prev_height / 2;

        let reuseHyp = Math.sqrt(Math.pow(prev_halfWidth, 2) + Math.pow(prev_halfHeight, 2));

        let startingAngle = Math.atan2(prev_halfHeight, prev_halfWidth) + this.camAngle * Phaser.Math.DEG_TO_RAD;

        let upperLeft: any = {};
        let lowerLeft: any = {};
        let upperRight: any = {};
        let lowerRight: any = {};

        upperLeft.angle = startingAngle + Math.PI * 1.5;
        upperLeft.x = Math.cos(upperLeft.angle) * reuseHyp;
        upperLeft.y = Math.sin(upperLeft.angle) * reuseHyp;

        lowerLeft.angle = startingAngle + Math.PI;
        lowerLeft.x = Math.cos(lowerLeft.angle) * reuseHyp;
        lowerLeft.y = Math.sin(lowerLeft.angle) * reuseHyp;

        upperRight.angle = startingAngle;
        upperRight.x = Math.cos(upperRight.angle) * reuseHyp;
        upperRight.y = Math.sin(upperRight.angle) * reuseHyp;

        lowerRight.angle = startingAngle + Math.PI / 2;
        lowerRight.x = Math.cos(lowerRight.angle) * reuseHyp;
        lowerRight.y = Math.sin(lowerRight.angle) * reuseHyp;

        var minX = Math.min(upperLeft.x, lowerLeft.x, upperRight.x, lowerRight.x);
        var maxX = Math.max(upperLeft.x, lowerLeft.x, upperRight.x, lowerRight.x);
        var minY = Math.min(upperLeft.y, lowerLeft.y, upperRight.y, lowerRight.y);
        var maxY = Math.max(upperLeft.y, lowerLeft.y, upperRight.y, lowerRight.y);

        minX -= Math.abs(x);
        maxX -= Math.abs(x);
        minY -= Math.abs(y);
        maxY -= Math.abs(y);

        x = minX / 2;
        y = minY / 2;
        width = maxX - minX;
        height = maxY - minY;

        // Set window
        world.camera.setWindow(
            x,
            y,
            width,
            height
        );
    }
}