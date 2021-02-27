import SpaceScene from "./SpaceScene";
import PlayerShip from "../../gameObjects/space/PlayerShip";

export default class SpaceDebugScene extends Phaser.Scene
{
    constructor()
    {
        super("spaceDebug");
    }

    private cellGraphics: Phaser.GameObjects.Graphics; 
    private spaceCamera: Phaser.Cameras.Scene2D.Camera; 
    private spaceScene: SpaceScene;
    private cellCoorText: Phaser.GameObjects.Text;
    private cellText: Phaser.GameObjects.Text;
    private fpsText: Phaser.GameObjects.Text;
    private shipPositionText: Phaser.GameObjects.Text;

    public create()
    {
        this.cellGraphics = this.add.graphics();
        this.cellCoorText = this.add.text(40, 260, "").setScrollFactor(0);
        this.cellText = this.add.text(40, 274, "").setScrollFactor(0);
        this.fpsText = this.add.text(40, 20, "").setScrollFactor(0);
        this.shipPositionText = this.add.text(550, 20, "").setScrollFactor(0);

        this.spaceScene = this.scene.get("space") as SpaceScene;
        this.spaceCamera = this.scene.get("space").cameras.main;
    }

    public update(time: number, delta: number)
    {
        this.fpsText.setText("Fps: " + (1000 / delta).toFixed(0));
        var playerShip: PlayerShip = this.spaceScene.playerShip;
        this.shipPositionText.setText(`(${playerShip.x.toFixed(2)}, ${playerShip.y.toFixed(2)})`);

        this.cameras.main.setScroll(this.spaceCamera.scrollX, this.spaceCamera.scrollY);

        this.showGrid();
        this.peekCell();
    }

    private showGrid()
    {
        let spaceScene: SpaceScene = this.scene.get("space") as SpaceScene;

        this.cellGraphics.clear();

        this.cellGraphics.lineStyle(2, 0x549431, 1.0);
        let cellWidth: number = spaceScene.csp.world.cameraGrid.cellWidth;
        let cellHeight: number = spaceScene.csp.world.cameraGrid.cellHeight;

        spaceScene.csp.world.loopThroughVisibleCells((cell: object, col: number, row: number) =>
        {
            this.cellGraphics.strokeRect(col * cellWidth, row * cellHeight, cellWidth, cellHeight);
        });
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