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

        var cam: Phaser.Cameras.Scene2D.Camera = this.spaceScene.cameras.main;
        this.shipPositionText.setText(`(${cam.worldView.centerX.toFixed(2)}, ${cam.worldView.centerY.toFixed(2)})`);

        this.peekCell();
    }

    private peekCell()
    {
        this.input.activePointer.updateWorldPoint(this.spaceScene.cameras.main);

        const { cellCoordinateText, cellText } = this.spaceScene.world.getCellInfoText(
            this.input.activePointer.worldX,
            this.input.activePointer.worldY
        );

        this.cellCoorText.setText(cellCoordinateText);
        this.cellText.setText(cellText);
    }
}