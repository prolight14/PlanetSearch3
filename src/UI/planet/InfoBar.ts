import PlanetLogicScene from "../../scenes/planet/PlanetLogicScene";

export default class InfoBar
{
    private scene: Phaser.Scene;
    private graphics: Phaser.GameObjects.Graphics;
    private hpBarGraphics: Phaser.GameObjects.Graphics;
    private playerHpText: Phaser.GameObjects.Text;
    private initialized: boolean;

    constructor(scene: Phaser.Scene)
    {
        this.scene = scene;

        this.graphics = scene.add.graphics();
        this.graphics.fillStyle(0x000000, 0.4);
        this.graphics.fillRect(0, 0, 800, 25);

        this.hpBarGraphics = scene.add.graphics();

        this.initialized = false;
    }

    public init()
    {
        this.initialized = true;

        this.playerHpText = this.scene.add.text(20, 5, "HP: ? / ?", {
            fontSize: "18px",
            align: "left"
        });
    }

    public update()
    {
        if(!this.initialized)
        {
            return;
        }

        const playerStats = (this.scene.scene.get("planetLogic") as PlanetLogicScene).getPlayerStats();
        const hp = playerStats.hp;
        const maxHp = playerStats.maxHp;
        this.playerHpText.setText(`HP: ${hp.toFixed(0)} / ${maxHp}`);

        const hpBarWidth = 200;
        this.hpBarGraphics.clear();
        this.hpBarGraphics.fillStyle(0x000000, 0.5);
        this.hpBarGraphics.fillRect(0, 0, hpBarWidth, 25);

        this.hpBarGraphics.fillStyle(0x58DA12);
        this.hpBarGraphics.fillRect(0, 0, (hp * hpBarWidth / maxHp), 25);
    }
}