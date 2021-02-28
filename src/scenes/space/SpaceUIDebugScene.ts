import SpaceScene from "./SpaceScene";
import PlayerShip from "../../gameObjects/space/PlayerShip";

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
        this.cellCoorText = this.add.text(40, 260, "").setScrollFactor(0);
        this.cellText = this.add.text(40, 274, "").setScrollFactor(0);
        this.fpsText = this.add.text(40, 20, "").setScrollFactor(0);
        this.shipPositionText = this.add.text(550, 20, "").setScrollFactor(0);

        this.spaceScene = this.scene.get("space") as SpaceScene;
    }

    public update(time: number, delta: number)
    {
        this.fpsText.setText("Fps: " + (1000 / delta).toFixed(0));
        var playerShip: PlayerShip = this.spaceScene.playerShip;
        this.shipPositionText.setText(`(${playerShip.x.toFixed(2)}, ${playerShip.y.toFixed(2)})`);

        this.peekCell();
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