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
        this.cameraLineGraphics = this.add.graphics().setScrollFactor(0);
    }
    private cameraLineGraphics: Phaser.GameObjects.Graphics;

    public update(time: number, delta: number)
    {
        this.showGrid();

        this.cameraLineGraphics.clear();
        this.cameraLineGraphics.lineStyle(2, 0x549431, 1.0);
        var world: any = (this.scene.get("space") as SpaceScene).csp.world;

        var s_x = world.camera.x;
        var s_y = world.camera.y;
        var s_width = world.camera.width;
        var s_height = world.camera.height;

        this.cameraLineGraphics.strokeRect(s_x, s_y, s_width, s_height); 
    }

    private showGrid()
    {
        var spaceScene: SpaceScene = this.scene.get("space") as SpaceScene;

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