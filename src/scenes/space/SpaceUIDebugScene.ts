import SpaceScene from "./SpaceScene";
import PlayerShip from "../../gameObjects/space/PlayerShip";
import SpaceCameraControllerScene from "./SpaceCameraControllerScene";

export default class SpaceUIDebugScene extends Phaser.Scene
{
    constructor()
    {
        super("spaceUIDebug");
    }

    private cellCoorText: Phaser.GameObjects.Text;
    private cellText: Phaser.GameObjects.Text;
    private fpsText: Phaser.GameObjects.Text;
    private shipPositionText: Phaser.GameObjects.Text;
    private spaceScene: SpaceScene;
    private windowGraphics: Phaser.GameObjects.Graphics; 
    private spaceCameraControllerScene: SpaceCameraControllerScene;

    public create()
    {
        this.cellCoorText = this.add.text(40, 260, "");
        this.cellText = this.add.text(40, 274, "");
        this.fpsText = this.add.text(40, 20, "");
        this.shipPositionText = this.add.text(550, 20, ""));
        this.windowGraphics = this.add.graphics();

        this.spaceScene = this.scene.get("space") as SpaceScene;
        this.spaceCameraControllerScene = this.scene.get("spaceCameraController") as SpaceCameraControllerScene;
    }

    public update(time: number, delta: number)
    {
        this.fpsText.setText("Fps: " + (1000 / delta).toFixed(0));
        var playerShip: PlayerShip = this.spaceScene.playerShip;
        this.shipPositionText.setText(`(${playerShip.x.toFixed(2)}, ${playerShip.y.toFixed(2)})`);

        this.peekCell();
        this.drawWindow();
    }

    private drawWindow()
    {
        var cspSpaceCam = this.spaceScene.csp.world.camera;
        this.windowGraphics.clear();
        this.windowGraphics.lineStyle(2, 0xDE9431, 1.0);
        this.windowGraphics.strokeRect(cspSpaceCam.x, cspSpaceCam.y, cspSpaceCam.width, cspSpaceCam.height);
        var sccs = this.spaceCameraControllerScene;
        this.windowGraphics.setAngle(sccs.camAngle);
    }

    private peekCell()
    {
        var cspWorld: any = this.spaceScene.csp.world;

        var coordinates: { col: number, row: number } = cspWorld.cameraGrid.getCoordinates(
            cspWorld.camera.scrollX - cspWorld.camera.halfWidth + this.input.activePointer.x, 
            cspWorld.camera.scrollY - cspWorld.camera.halfHeight + this.input.activePointer.y
        );

        var cell: any = cspWorld.cameraGrid.grid[coordinates.col][coordinates.row];

        this.cellCoorText.setText(`(${coordinates.col}, ${coordinates.row})`);

        var txt: string = "";
        for(var i in cell)
        {
            txt += i;
        }

        this.cellText.setText(txt);
    }
}