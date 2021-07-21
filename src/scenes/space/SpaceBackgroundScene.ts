export default class SpaceBackgroundScene extends Phaser.Scene 
{
    constructor()
    {
        super("spaceBackground");
    }

    private background: Phaser.GameObjects.Graphics;

    public preload()
    {

    }

    public create()
    {
        this.background = this.add.graphics();

        const screenWidth: number = this.game.config.width as number;
        const screenHeight: number = this.game.config.height as number;

        this.background.fillStyle(0x000022);
        this.background.fillRect(0, 0, screenWidth, screenHeight);
    }
}