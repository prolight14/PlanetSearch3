import EnemyShip from "../../gameObjects/space/EnemyShip";
import Ship from "../../gameObjects/space/Ship";
import SpaceGameObject from "../../gameObjects/space/SpaceGameObject";
import SpaceCameraControllerScene from "./SpaceCameraControllerScene";
import SpaceScene from "./SpaceScene";

export default class SpaceUIScene extends Phaser.Scene
{
    constructor()
    {
        super("spaceUI");
    }

    private spaceScene: SpaceScene;
    private statsGraphics: Phaser.GameObjects.Graphics;
    private spaceCameraControllerScene: SpaceCameraControllerScene;
    private testText: Phaser.GameObjects.Text;

    private statsHpMask: Phaser.GameObjects.Image;

    public create()
    {
        this.spaceScene = this.scene.get("space") as SpaceScene;
        
        this.spaceCameraControllerScene = (this.scene.get("spaceCameraController") as SpaceCameraControllerScene)

        // var mainCam = spaceCameraControllerScene.cameras.main;
        // this.cameras.main.startFollow(mainCam);
        
        this.statsGraphics = this.add.graphics().setDepth(10);
        this.testText = this.add.text(69000, 61000, "This is a test!");

        var statsContainer = this.add.image(0, (this.game.config.height as number) - 116*1.25, "shipHealthBar", 1).setScrollFactor(0).setScale(2.5).setOrigin(0).setFlipX(true);
    
        var statsHpBar = this.add.image(0, (this.game.config.height as number) - 116*1.25, "shipHealthBar", 2).setScrollFactor(0).setScale(2.5).setOrigin(0).setFlipX(true);
        
        this.statsHpMask = this.add.image(0, (this.game.config.height as number) - 116*1.25, "shipHealthBar", 2).setScrollFactor(0).setScale(2.5).setOrigin(0).setFlipX(true);
        this.statsHpMask.setVisible(false);

        statsHpBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.statsHpMask);

        this.statsHpMask.y += 30;
    }

    public update(time: number, delta: number)
    {
        var mainCam = this.spaceCameraControllerScene.cameras.main;

        var cam = this.cameras.main;
        cam.setScroll(scrollX, scrollY);
        // cam.setZoom(mainCam.zoom);
        cam.setRoundPixels(true);
        cam.setAngle(this.spaceCameraControllerScene.getCameraAngle());

        /*
        this.updateShipStatsGraphics();

        this.sys.displayList.add(this.statsGraphics);
        this.sys.displayList.add(this.testText);
        */
    }

    public updateShipStatsGraphics()
    {
        /*
        var displayList = this.spaceScene.sys.displayList;

        this.statsGraphics.clear();

        displayList.list.forEach((object: any) =>
        {
            if(object.getTypeName !== undefined && object.getTypeName() === "enemyShip" && (object as EnemyShip).getHp() < (object as EnemyShip).getMaxHp())
            {
                var enemyShip = object as EnemyShip;
                // var cameraRotation = (this.scene.get("spaceCameraController") as SpaceCameraControllerScene).getCameraAngle() * Phaser.Math.DEG_TO_RAD;

                var barX = enemyShip.x - enemyShip.width * 0.5;
                var barY = enemyShip.y - enemyShip.width * 0.7;

                // debugger;

                this.statsGraphics.fillStyle(0x0A297E);
                this.statsGraphics.fillRect(barX, barY, enemyShip.width, 4);
                this.statsGraphics.fillStyle(0x54B70E);
                this.statsGraphics.fillRect(barX, barY, enemyShip.getHp() * enemyShip.width / enemyShip.getMaxHp(), 4);
            }
        });

        displayList.add(this.statsGraphics);
        */
    }
}