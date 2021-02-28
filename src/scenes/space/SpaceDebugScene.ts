import SpaceScene from "./SpaceScene";

export default class SpaceDebugScene extends Phaser.Scene
{
    constructor()
    {
        super("spaceDebug");
    }

    private cellGraphics: Phaser.GameObjects.Graphics; 
 
    public create()
    {
        this.cellGraphics = this.add.graphics();
    }

    public update(time: number, delta: number)
    {
        this.showGrid();
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
}