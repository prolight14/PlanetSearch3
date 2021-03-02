import SpaceScene from "./SpaceScene";
import SpaceStarScene from "./SpaceStarScene";
import SpaceDebugScene from "./SpaceDebugScene";

export default class SpaceCameraControllerScene extends Phaser.Scene
{
    constructor()
    {
        super("spaceCameraController");
    }

    private spaceScene: SpaceScene;
    private spaceDebugScene: SpaceDebugScene;
    private spaceStarScene: SpaceStarScene;
    private keys: {
        rotateLeft: any,
        rotateRight: any
    };
    public camAngle: number;
    private angleSpeed: number;

    public create()
    {
        var cam = this.cameras.main;

        this.spaceScene = this.scene.get("space") as SpaceScene;
        this.spaceDebugScene = this.scene.get("spaceDebug") as SpaceDebugScene;
        this.spaceStarScene = this.scene.get("spaceStar") as SpaceStarScene;

        this.input.on('wheel', (pointer: any, currentlyOver: any, dx: number, dy: number, dz: number) =>
        { 
            cam.setZoom(Math.min(Math.max(cam.zoom - dy * 0.001, 0.3), 1.5));

            this.spaceScene.cameras.main.setZoom(cam.zoom);
            this.spaceDebugScene.cameras.main.setZoom(cam.zoom);
            this.spaceStarScene.cameras.main.setZoom(cam.zoom);

            this.resizeCSPCameraWindow();
        });

        this.keys = {
            rotateLeft: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            rotateRight: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
        };

        this.camAngle = 0;
        this.angleSpeed = 2;
    }

    public update ()
    {
        var spaceCam = this.scene.get("space").cameras.main;

        this.scene.get("spaceStar").cameras.main.setScroll(spaceCam.scrollX, spaceCam.scrollY);
        this.scene.get("spaceDebug").cameras.main.setScroll(spaceCam.scrollX, spaceCam.scrollY);

        if(this.keys.rotateLeft.isDown)
        {
            this.camAngle -= this.angleSpeed;
            this.adjustCameraAngle(this.camAngle);
        }
        else if(this.keys.rotateRight.isDown)
        {
            this.camAngle += this.angleSpeed;
            this.adjustCameraAngle(this.camAngle);
        }
    }

    private adjustCameraAngle(angle: number)
    {
        this.cameras.main.setAngle(angle);

        this.spaceScene.cameras.main.setAngle(angle);
        this.spaceDebugScene.cameras.main.setAngle(angle);
        this.spaceStarScene.cameras.main.setAngle(angle);
    }

    private resizeCSPCameraWindow ()
    {
        var world: any = this.spaceScene.csp.world;
        var cspConfig = this.spaceScene.cspConfig;
        var cam = this.cameras.main;
        
        var prev_x: number = cspConfig.window.x;
        var prev_y: number = cspConfig.window.y;
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

        var x = minX / cam.zoom;
        var y = minY / cam.zoom;
        var width = maxX - minX;
        var height = maxY - minY;

        var derivedWidth: number = width * Math.SQRT2 / cam.zoom;
        var derivedHeight: number = height * Math.SQRT2 / cam.zoom;

        world.camera.setWindow(
            x - (derivedWidth - width) / 2, 
            y - (derivedHeight - height) / 2, 
            derivedWidth,
            derivedHeight
        );

        this.spaceStarScene.setCSPCameraWindow(
            world.camera.x, world.camera.y, world.camera.width, world.camera.height
        );
    }
}