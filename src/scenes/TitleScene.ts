export default class TitleScene extends Phaser.Scene
{
    constructor()
    {
        super("title");
    }

    public preload()
    {
        this.load.image("planetSearch3", "./assets/Title/PlanetSearch3.png");

        // this.load.bitmapFont("PixelFont", "./assets/Fonts/PixelFont.png", "./assets/Fonts/PixelFont.xml");
    }

    public create()
    {
        const gameWidth = this.game.canvas.width;
        const gameHeight = this.game.canvas.height;

        this.add.image(0, 0, "planetSearch3").setOrigin(0, 0).setDisplaySize(gameWidth, gameHeight);

        this.add.text(gameWidth * 0.5, gameHeight * 0.7, "Press any key to play!").setOrigin(0.5).setAlign("center");

        this.input.keyboard.once("keydown", () =>
        {
            this.cameras.main.fadeOut(500, 0, 0, 0);

            this.cameras.main.once("camerafadeoutcomplete", () => 
            {
                this.scene.start("entry");
            });
        });

        // this.add.bitmapText(400, 260, "PixelFont", "ABC|D|E").setScale(4);
    }

    // private loadBitmapText()
    // {

    // }

    // private drawBitmapText()
    // {

    // }
}