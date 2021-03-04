import SpaceScene from "./SpaceScene";
import SpaceDebugScene from "./SpaceDebugScene";
import SpaceStarScene from "./SpaceStarScene";

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

            this.updateZoom(Math.min(Math.max(cam.zoom - dy * 0.001, 0.3), 1.5));
        });

        this.keys = {
            rotateLeft: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            rotateRight: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            rotateReset: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO)
        };

        this.camAngle = 0;
        this.angleSpeed = 2;
    }

    public updateZoom(zoom: number)
    {
        var cam = this.cameras.main;

        cam.setZoom(zoom);

        this.spaceScene.cameras.main.setZoom(cam.zoom);
        this.spaceDebugScene.cameras.main.setZoom(cam.zoom);

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
        cam.startFollow(this.spaceScene.playerShip);
        
        this.spaceScene.cameras.main.setScroll(cam.scrollX, cam.scrollY);
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
        var world: any = this.spaceScene.csp.world;
        var cspConfig = this.spaceScene.cspConfig;
        var cam = this.cameras.main;
        
        var prev_width: number = cspConfig.window.width;
        var prev_height: number = cspConfig.window.height;
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

        var x = minX;
        var y = minY;
        var width = maxX - minX;
        var height = maxY - minY;

        // hyp = ((opp + adj) / 2) * Math.sqrt(2)
        var derivedWidth: number = width * Math.SQRT2 / cam.zoom;
        var derivedHeight: number = height * Math.SQRT2 / cam.zoom;

        world.camera.setWindow(
            x - (derivedWidth - width) / 2, 
            y - (derivedHeight - height) / 2, 
            derivedWidth,
            derivedHeight
        );
    }
}