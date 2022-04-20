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
        var spaceScene: SpaceScene = this.scene.get("space") as SpaceScene;

        this.cellGraphics.clear();
        this.cellGraphics.lineStyle(6, 0x549431, 1.0);

        spaceScene.world.UIDebugGrid(this.cellGraphics);
    }
}