import EnemyShip from "../../gameObjects/space/EnemyShip";
import PlayerShip from "../../gameObjects/space/PlayerShip";
import SpaceLogicScene from "./SpaceLogicScene";
import SpaceScene from "./SpaceScene";

export default class SpaceUIScene extends Phaser.Scene
{
    constructor()
    {
        super("spaceUI");
    }

    private spaceScene: SpaceScene;
    private playerShip: PlayerShip;

    private setHpBar: (hp: number, maxHp: number) => void;
    private setXpBar: (xp: number, maxXp: number) => void;

    public create()
    {
        this.spaceScene = this.scene.get("space") as SpaceScene;
        
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
        var cam = this.cameras.main;
        cam.setScroll(scrollX, scrollY);
        cam.setRoundPixels(true);

        this.setHpBar(this.playerShip.getHp(), this.playerShip.getMaxHp());
        this.setXpBar(this.playerShip.getXp(), this.playerShip.getNextLevelXp());
    }
}