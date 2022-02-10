import EnemyShip from "../../gameObjects/space/EnemyShip";
import PlayerShip from "../../gameObjects/space/PlayerShip";
import Ship from "../../gameObjects/space/Ship";
import SpaceGameObject from "../../gameObjects/space/SpaceGameObject";
import SpaceCameraControllerScene from "./SpaceCameraControllerScene";
import SpaceLogicScene from "./SpaceLogicScene";
import SpaceScene from "./SpaceScene";

export default class SpaceUIScene extends Phaser.Scene
{
    constructor()
    {
        super("spaceUI");
    }

    private spaceScene: SpaceScene;
    private spaceCameraControllerScene: SpaceCameraControllerScene;
    private playerShip: PlayerShip;

    private setHpBar: (hp: number, maxHp: number) => void;
    private setXpBar: (xp: number, maxXp: number) => void;

    public create()
    {
        this.spaceScene = this.scene.get("space") as SpaceScene;
        
        this.spaceCameraControllerScene = (this.scene.get("spaceCameraController") as SpaceCameraControllerScene);
        const spaceLogicScene = (this.scene.get("spaceLogic") as SpaceLogicScene);
        this.playerShip = spaceLogicScene.playerShip;

        const statsY = (this.game.config.height as number) - 145;

        const statsContainer = this.add.image(0, statsY, "shipHealthBar", 0).setScrollFactor(0).setScale(2.5).setOrigin(0).setFlipX(true);
        const statsHpBar = this.add.image(0, statsY, "shipHealthBar", 2).setScrollFactor(0).setScale(2.5).setOrigin(0).setFlipX(true);
        const statsHpMask = this.add.image(0, statsY, "shipHealthBar", 2).setScrollFactor(0).setScale(2.5).setOrigin(0).setFlipX(true);
        statsHpMask.setVisible(false);
        statsHpBar.mask = new Phaser.Display.Masks.BitmapMask(this, statsHpMask);

        this.setHpBar = function(hp: number, maxHp: number)
        {
            statsHpBar.y = statsY + statsHpBar.displayHeight - (hp * statsHpBar.displayHeight / maxHp);
        };

        const statsXpBar = this.add.image(0, statsY, "shipHealthBar", 3).setScrollFactor(0).setScale(2.5).setOrigin(0).setFlipX(true);
        const statsXpMask = this.add.image(0, statsY, "shipHealthBar", 3).setScrollFactor(0).setScale(2.5).setOrigin(0).setFlipX(true);
        statsXpMask.setVisible(false);
        statsXpBar.mask = new Phaser.Display.Masks.BitmapMask(this, statsXpMask);

        this.setXpBar = function(xp: number, maxXp: number)
        {
            const xpBarLength = 93;
            statsXpBar.y = statsY + xpBarLength - (xp * xpBarLength / maxXp);
        };
    }

    public update(time: number, delta: number)
    {
        var mainCam = this.spaceCameraControllerScene.cameras.main;

        var cam = this.cameras.main;
        cam.setScroll(scrollX, scrollY);
        cam.setRoundPixels(true);

     
        this.setHpBar(this.playerShip.getHp(), this.playerShip.getMaxHp());
        this.setXpBar(this.playerShip.getXp(), this.playerShip.getNextLevelXp());
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