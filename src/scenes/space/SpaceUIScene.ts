import PlayerShip from "../../gameObjects/space/PlayerShip";
import SpaceLogicScene from "./SpaceLogicScene";

export default class SpaceUIScene extends Phaser.Scene
{
    constructor()
    {
        super("spaceUI");
    }

    private playerShip: PlayerShip;

    private setHpBar: (hp: number, maxHp: number) => void;
    private setXpBar: (xp: number, maxXp: number) => void;

    public create()
    {
        const spaceLogicScene = (this.scene.get("spaceLogic") as SpaceLogicScene);
        this.playerShip = spaceLogicScene.playerShip;

        const statsY = Math.floor(this.cameras.main.height - 114);

        const statsContainer = this.add.image(0, statsY, "shipHealthBar", 0).setScrollFactor(0).setScale(2).setOrigin(0).setFlipX(true);
        const statsHpBar = this.add.image(0, statsY, "shipHealthBar", 2).setScrollFactor(0).setScale(2).setOrigin(0).setFlipX(true);
        const statsHpMask = this.add.image(0, statsY, "shipHealthBar", 2).setScrollFactor(0).setScale(2).setOrigin(0).setFlipX(true);
        statsHpMask.setVisible(false);
        statsHpBar.mask = new Phaser.Display.Masks.BitmapMask(this, statsHpMask);

        this.setHpBar = function(hp: number, maxHp: number)
        {
            statsHpBar.y = statsY + statsHpBar.displayHeight - (hp * statsHpBar.displayHeight / maxHp);
        };

        const statsXpBar = this.add.image(0, statsY, "shipHealthBar", 3).setScrollFactor(0).setScale(2).setOrigin(0).setFlipX(true);
        const statsXpMask = this.add.image(0, statsY, "shipHealthBar", 3).setScrollFactor(0).setScale(2).setOrigin(0).setFlipX(true);
        statsXpMask.setVisible(false);
        statsXpBar.mask = new Phaser.Display.Masks.BitmapMask(this, statsXpMask);

        this.setXpBar = function(xp: number, maxXp: number)
        {
            const xpBarLength = 74.4;
            statsXpBar.y = statsY + xpBarLength - (xp * xpBarLength / maxXp);
        };
    }

    public update(time: number, delta: number)
    {
        this.setHpBar(this.playerShip.getHp(), this.playerShip.getMaxHp());
        this.setXpBar(this.playerShip.getXp(), this.playerShip.getNextLevelXp());
    }
}