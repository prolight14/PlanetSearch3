import SpaceCameraControllerScene from "./SpaceCameraControllerScene";
import SpaceScene from "./SpaceScene";

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

    public create()
    {
        this.cellCoorText = this.add.text(40, 136, "");
        this.cellText = this.add.text(40, 150, "").setFontSize(12);
        this.fpsText = this.add.text(40, 20, "");
        this.shipPositionText = this.add.text(550, 20, "");

        this.spaceScene = this.scene.get("space") as SpaceScene;
    }

    public update(time: number, delta: number)
    {
        this.fpsText.setText("Fps: " + (1000 / delta).toFixed(0));

        var cameraTarget: { x: number, y: number } = this.spaceScene.getCameraTarget();
        this.shipPositionText.setText(`(${cameraTarget.x.toFixed(2)}, ${cameraTarget.y.toFixed(2)})`);

        this.peekCell();
    }

    private peekCell()
    {
        var cspWorld: any = this.spaceScene.csp.world;
        this.input.activePointer.updateWorldPoint(this.scene.get("spaceCameraController").cameras.main);

        var coordinates: { col: number, row: number } = cspWorld.cameraGrid.getCoordinates(
            this.input.activePointer.worldX,
            this.input.activePointer.worldY
        );

        var cell: any = cspWorld.cameraGrid.grid[coordinates.col][coordinates.row];

        this.cellCoorText.setText(`(${coordinates.col}, ${coordinates.row})`);

        var txt: string = "";
        for(var i in cell)
        {
            txt += i + "\n";
        }

        this.cellText.setText(txt);
    }
}