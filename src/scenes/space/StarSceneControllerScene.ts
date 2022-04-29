
export default class StarSceneControllerScene extends Phaser.Scene
{
    constructor()
    {
        super("starSceneController");
    }
    
    public preload()
    {
        this.load.image("starBackground1", "./assets/Space/Stars/starBackground1.png");
        this.load.image("starBackground2", "./assets/Space/Stars/starBackground2.png");
        this.load.image("starBackground3", "./assets/Space/Stars/starBackground3.png");
    }

    public create()
    {
        const cam = this.cameras.main;
      
        this.starLayers = new Array<Phaser.GameObjects.TileSprite>();
        this.scrollValues = [0.65, 0.9, 1];
        const layerAmt = this.scrollValues.length;

        for(var i = 1; i <= layerAmt; i++)
        {
            const tileSprite = this.add.tileSprite(cam.width / 2, cam.height / 2, cam.width * 2, cam.height * 2, "starBackground" + i).setDepth(i - layerAmt);
            tileSprite.setOrigin(0.5);
            this.starLayers.push(tileSprite);
        }
        
        this.scene.sendToBack("starSceneController");

        this.scene.run("spaceMap");
        this.scene.bringToTop("spaceMap");
    }

    public starLayers: Array<Phaser.GameObjects.TileSprite>;
    private scrollValues: Array<number>;

    public update(time: number, delta: number) 
    {
        const cam = this.scene.get("space").cameras.main;
        const { scrollX, scrollY, zoom } = cam;
        const rf = (1 - 1 / zoom);

        for(var i = 0; i < this.starLayers.length; i++)
        {
            const tileSprite = this.starLayers[i];

            tileSprite.setTileScale(zoom);
            tileSprite.setTilePosition(Math.floor(rf * cam.width + scrollX * this.scrollValues[i]), Math.floor(rf * cam.height + scrollY * this.scrollValues[i]));
        }
    }
}